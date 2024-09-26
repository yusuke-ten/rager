import type { Document } from '@langchain/core/documents'

import dotenv from 'dotenv'
import { Worker } from 'bullmq'
import { WeaviateStore } from '@langchain/weaviate'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

import prisma from '../lib/prisma'
import { openAIEmbeddings } from '../lib/embeddings'
import { weaviateClient } from '../lib/weaviateClient'

dotenv.config()

function sanitizeText(text: string): string {
  text = text.replace(/\0/g, '')
  return text
}

const pdfProcessingWorker = new Worker(
  'pdfProcessing',
  async (job) => {
    const { filePath, documentId } = job.data

    if (!job.id) {
      throw new Error('Job ID is required')
    }

    try {
      await prisma.document.update({
        where: { id: documentId },
        data: { status: 'PROCESSING' },
      })

      const document = await prisma.document.findUnique({
        where: {
          id: documentId,
        },
        include: {
          knowledgeBase: true,
        },
      })
      if (!document) {
        throw new Error('Document not found')
      }
      const pdfLoader = new PDFLoader(filePath)
      const docs = await pdfLoader.load()
      const totalSteps = docs.length + 2
      let currentStep = 0
      await prisma.processStatus.update({
        where: {
          id: job.id,
        },
        data: { status: 'PROCESSING', currentStep, totalSteps },
      })

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      })

      const chunkedDocs: Document[] = []
      let position = 1
      await Promise.all(
        docs.map(async (doc) => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          const chunks = await textSplitter.splitText(doc.pageContent)
          chunks.forEach((chunk, index) => {
            chunkedDocs.push({
              pageContent: sanitizeText(chunk),
              metadata: {
                knowledgeBaseId: document.knowledgeBaseId,
                position: position,
              },
            })
            position += 1
          })
          await prisma.processStatus.update({
            where: { id: job.id },
            data: { currentStep: (currentStep += 1) },
          })
        }),
      )

      const vectorStoreId = `Vector_index_${document.knowledgeBaseId}`

      const vectorStore = new WeaviateStore(openAIEmbeddings, {
        client: weaviateClient,
        indexName: vectorStoreId,
        textKey: 'pageContent',
        metadataKeys: ['knowledgeBaseId'],
      })
      const vectorIds = await vectorStore.addDocuments(chunkedDocs)

      await prisma.processStatus.update({
        where: { id: job.id },
        data: { currentStep: (currentStep += 1) },
      })

      await prisma.documentSegment.createMany({
        data: chunkedDocs.map((chunk, index) => ({
          documentId: documentId,
          vectorId: vectorIds[index],
          chunkContent: chunk.pageContent,
          wordCount: chunk.pageContent.split(/\s+/).length,
          keywords: [],
          position: chunk.metadata.position,
        })),
      })

      await prisma.document.update({
        where: { id: documentId },
        data: { chunkSize: chunkedDocs.length, enabled: true, status: 'COMPLETED' },
      })

      await prisma.processStatus.update({
        where: { id: job.id },
        data: { currentStep: (currentStep += 1) },
      })

      await prisma.processStatus.update({
        where: { id: job.id },
        data: { status: 'COMPLETED', currentStep: totalSteps },
      })
    } catch (error) {
      console.error('Error processing PDF:', error)
      await prisma.processStatus.update({
        where: { id: job.id },
        data: { status: 'FAILED' },
      })
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || 'password',
    },
  },
)

pdfProcessingWorker.on('completed', (job) => {
  console.log(`Job ${job.id} has completed!`)
})

pdfProcessingWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} has failed with ${err.message}`)
})
