import type { Document } from '@langchain/core/documents'

import path from 'path'
import { KnowledgeBase } from '@prisma/client'
import { WeaviateStore } from '@langchain/weaviate'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

import prisma from '../../src/lib/prisma'
import { openAIEmbeddings } from '../../src/lib/embeddings'
import { weaviateClient } from '../../src/lib/weaviateClient'

function sanitizeText(text: string): string {
  text = text.replace(/\0/g, '')
  return text
}

export const documentSeed = async (knowledgeBase: KnowledgeBase) => {
  const filePath = path.join(__dirname, 'sample.pdf')
  const fileName = path.basename(filePath)
  const loader = new PDFLoader(filePath)
  const docs = await loader.load()

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
            knowledgeBaseId: knowledgeBase.id,
            position: position,
          },
        })
        position += 1
      })
    }),
  )

  const vectorStoreId = `Vector_index_${knowledgeBase.id}`

  const vectorStore = new WeaviateStore(openAIEmbeddings, {
    client: weaviateClient,
    indexName: vectorStoreId,
    textKey: 'pageContent',
    metadataKeys: ['knowledgeBaseId'],
  })

  const vectorIds = await vectorStore.addDocuments(chunkedDocs)

  if (!vectorIds || vectorIds.length === 0) {
    throw new Error('Failed to add data to Weaviate')
  }

  const document = await prisma.document.create({
    data: {
      knowledgeBaseId: knowledgeBase.id,
      name: fileName,
      metadata: {
        knowledgeBaseId: knowledgeBase.id,
      },
      mimeType: 'application/pdf',
      chunkSize: chunkedDocs.length,
      enabled: true,
      status: 'COMPLETED',
    },
  })

  await prisma.documentSegment.createMany({
    data: chunkedDocs.map((chunk, index) => ({
      documentId: document.id,
      vectorId: vectorIds[index],
      chunkContent: chunk.pageContent,
      wordCount: chunk.pageContent.split(/\s+/).length,
      keywords: [],
      position: chunk.metadata.position,
    })),
  })
}
