import type { WeaviateClient } from 'weaviate-ts-client'
import type { Document } from '@langchain/core/documents'

import weaviate from 'weaviate-ts-client'
import { NextResponse } from 'next/server'
import { WeaviateStore } from '@langchain/weaviate'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

import prisma from '@/lib/prisma'

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

export const weaviateClient: WeaviateClient = weaviate.client({
  scheme: process.env.WEAVIATE_SCHEME || 'http',
  host: process.env.WEAVIATE_HOST || 'localhost:8080',
})

function sanitizeText(text: string): string {
  // ヌルバイトを除去
  text = text.replace(/\0/g, '')
  return text
}

export async function POST(
  request: Request,
  { params }: { params: { knowledgeBaseId: string } },
) {
  try {
    const { knowledgeBaseId } = params
    // PDFファイルを受け取る
    const formData = await request.formData()
    const file = formData.get('files') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const pdfLoader = new PDFLoader(file)
    const docs = await pdfLoader.load()

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const chunkedDocs: Document[] = []
    let position = 1
    await Promise.all(
      docs.map(async (doc) => {
        const chunks = await textSplitter.splitText(doc.pageContent)
        chunks.forEach((chunk, index) => {
          chunkedDocs.push({
            pageContent: sanitizeText(chunk),
            metadata: {
              knowledgeBaseId,
              position: position,
            },
          })
          position += 1
        })
      }),
    )

    const knowledgeBase = await prisma.knowledgeBase.findUnique({
      where: {
        id: knowledgeBaseId,
      },
    })

    if (!knowledgeBase) {
      throw new Error('Knowledge base not found')
    }

    const vectorStoreId = `Vector_index_${knowledgeBase.id.replace(/-/g, '_')}`

    const vectorStore = new WeaviateStore(embeddings, {
      client: weaviateClient,
      indexName: vectorStoreId,
      textKey: 'pageContent',
      metadataKeys: ['knowledgeBaseId'],
    })

    const vectorIds = await vectorStore.addDocuments(chunkedDocs)

    if (!vectorIds || vectorIds.length === 0) {
      throw new Error('Failed to add data to Weaviate')
    }

    // Prismaにドキュメントを保存
    const newDocument = await prisma.document.create({
      data: {
        knowledgeBaseId: knowledgeBaseId,
        name: file.name,
        metadata: {
          knowledgeBaseId,
        },
        fileType: 'application/pdf',
        chunkSize: chunkedDocs.length,
      },
    })

    // チャンクをDocumentSegmentに保存

    await prisma.documentSegment.createMany({
      data: chunkedDocs.map((chunk, index) => ({
        documentId: newDocument.id,
        vectorId: vectorIds[index],
        chunkContent: chunk.pageContent,
        wordCount: chunk.pageContent.split(/\s+/).length,
        keywords: [],
        position: chunk.metadata.position,
      })),
    })
    return NextResponse.json({ message: 'PDF processed and added successfully' })
  } catch (error: unknown) {
    console.error('Error processing PDF:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Internal Server Error', details: error.message },
        { status: 500 },
      )
    } else {
      return NextResponse.json(
        { error: 'Internal Server Error', details: 'Unknown error occurred' },
        { status: 500 },
      )
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
