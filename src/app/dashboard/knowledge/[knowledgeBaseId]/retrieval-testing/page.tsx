import type { WeaviateClient } from 'weaviate-ts-client'

import weaviate from 'weaviate-ts-client'
import { DocumentSegment } from '@prisma/client'
import { WeaviateStore } from '@langchain/weaviate'
import { OpenAIEmbeddings } from '@langchain/openai'

import prisma from '@/lib/prisma'
import { checkKnowledgeBaseAccess } from '@/lib/auth/checkKnowledgeBaseAccess'
import { RetrievalTesting } from '@/components/retrieval-testing/retrieval-testing'
export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

export const weaviateClient: WeaviateClient = weaviate.client({
  scheme: process.env.WEAVIATE_SCHEME || 'http',
  host: process.env.WEAVIATE_HOST || 'localhost:8080',
})

export default async function DatasetPage({
  params,
}: {
  params: { knowledgeBaseId: string }
}) {
  if (!(await checkKnowledgeBaseAccess(params.knowledgeBaseId))) {
    return <div>Knowledge base not found</div>
  }
  const handleRetrievalTesting = async (query: string): Promise<DocumentSegment[]> => {
    'use server'
    const knowledgeBase = await prisma.knowledgeBase.findUnique({
      where: {
        id: params.knowledgeBaseId,
      },
    })
    if (!knowledgeBase) {
      throw new Error('Knowledge base not found')
    }
    const vectorStoreId = `Vector_index_${knowledgeBase.id}`

    const vectorStore = await WeaviateStore.fromExistingIndex(embeddings, {
      client: weaviateClient,
      indexName: vectorStoreId,
      textKey: 'pageContent',
      metadataKeys: ['knowledgeBaseId'],
    })
    const result = await vectorStore.similaritySearch(query)
    const result2 = await vectorStore.similaritySearchVectorWithScore(
      await embeddings.embedQuery(query),
      5,
    ) // 5は返す結果の数
    const result3 = await vectorStore.similaritySearchVectorWithScoreAndEmbedding(
      await embeddings.embedQuery(query),
      5,
    )

    const documentSegments = await prisma.documentSegment.findMany({
      where: {
        vectorId: {
          in: result.map((r) => r.id).filter((id): id is string => id !== undefined),
        },
      },
    })
    return documentSegments
  }

  return (
    <RetrievalTesting
      knowledgeBaseId={params.knowledgeBaseId}
      handleRetrievalTesting={handleRetrievalTesting}
    />
  )
}
