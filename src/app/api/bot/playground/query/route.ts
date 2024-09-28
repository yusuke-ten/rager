import { PassThrough } from 'stream'
import { ChatOpenAI } from '@langchain/openai'
import { WeaviateStore } from '@langchain/weaviate'
import { NextRequest, NextResponse } from 'next/server'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'

import prisma from '@/lib/prisma'
import { openAIEmbeddings } from '@/lib/embeddings'
import { weaviateClient } from '@/lib/weaviateClient'

export async function POST(
  req: NextRequest,
  { params }: { params: { botId: string } },
): Promise<NextResponse> {
  try {
    const body = await req.json()
    const {
      botId,
      query = '',
      systemPrompt = '',
      temperature = 0.7,
      maxTokens = 512,
      topP = 0.85,
      topK = 5,
      language = 'ja',
    } = body

    if (!botId || !query) {
      throw new Error('Bot ID and query are required')
    }
    const botKnowledgeBase = await prisma.botKnowledgeBase.findFirst({
      where: {
        botId: botId,
      },
      include: {
        knowledgeBase: true,
      },
    })

    if (!botKnowledgeBase || !botKnowledgeBase.knowledgeBase) {
      throw new Error('Knowledge base not found for this bot')
    }

    const knowledgeBase = botKnowledgeBase.knowledgeBase

    const vectorStoreId = `Vector_index_${knowledgeBase.id}`

    const vectorStore = await WeaviateStore.fromExistingIndex(openAIEmbeddings, {
      client: weaviateClient,
      indexName: vectorStoreId,
      textKey: 'pageContent',
      metadataKeys: ['knowledgeBaseId'],
    })
    const prompt = ChatPromptTemplate.fromTemplate(systemPrompt)

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4o-mini',
      temperature,
      streaming: true,
      maxTokens: maxTokens,
      topP,
    })

    const combineDocsChain = await createStuffDocumentsChain({
      llm: model,
      prompt,
      outputParser: new StringOutputParser(),
    })

    const results = await vectorStore.similaritySearch(query, topK) // 上位5つの結果を取得

    if (results.length === 0) {
      return NextResponse.json({ message: 'No results found' }, { status: 404 })
    }

    const context = results.map((result) => result.pageContent).join('\n')

    // 検索チェーンを作成
    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: vectorStore.asRetriever(),
    })

    // 質問に対する回答を生成
    const stream = await retrievalChain.stream({
      input: query,
      context,
      language,
    })

    const encoder = new TextEncoder()
    const pass = new PassThrough()

    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          // eslint-disable-next-line no-restricted-syntax
          for await (const chunk of stream) {
            const encodedChunk = encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
            controller.enqueue(encodedChunk)

            // バックプレッシャーの考慮
            if (pass.writableNeedDrain) {
              await new Promise((resolve) => pass.once('drain', resolve))
            }
          }
        } catch (error) {
          console.error('Streaming error:', error)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'An error occurred' })}\n\n`),
          )
        } finally {
          controller.close()
        }
      },
      cancel() {
        console.log('Client disconnected')
        stream.cancel()
        pass.destroy()
      },
    })

    return new NextResponse(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
