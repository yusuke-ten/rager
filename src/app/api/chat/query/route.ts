import { PassThrough } from 'stream'
import { ChatOpenAI } from '@langchain/openai'
import { WeaviateStore } from '@langchain/weaviate'
import { NextRequest, NextResponse } from 'next/server'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { AIMessage, HumanMessage } from '@langchain/core/messages'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'

import prisma from '@/lib/prisma'
import { openAIEmbeddings } from '@/lib/embeddings'
import { weaviateClient } from '@/lib/weaviateClient'
import { PrismaMessageHistory } from '@/langchain/prismaMessageHistory'

type QueryResponse = {
  // レスポンスの型をここに定義
}

export async function POST(
  req: NextRequest,
  { params }: { params: { conversationId: string } },
): Promise<NextResponse<QueryResponse>> {
  try {
    const body = await req.json()
    let { conversationId } = body
    const query = body.query || 'このPDFは何？'
    const botId = body.botId
    const language = body.language || 'en'

    if (!botId) {
      throw new Error('Bot ID is required')
    }

    if (!conversationId) {
      const conversation = await prisma.conversation.findFirst({
        where: {
          botId: botId,
        },
      })
      if (!conversation) {
        throw new Error('Conversation not found')
      }
      conversationId = conversation.id
    }

    const bot = await prisma.bot.findFirst({
      where: {
        id: botId,
      },
      include: {
        botKnowledgeBase: {
          include: {
            knowledgeBase: true,
          },
        },
      },
    })

    if (
      !bot ||
      !bot.botKnowledgeBase ||
      !bot.botKnowledgeBase[0] ||
      !bot.botKnowledgeBase[0].knowledgeBase
    ) {
      throw new Error('Bot not found')
    }

    const knowledgeBase = bot.botKnowledgeBase[0]?.knowledgeBase

    const vectorStoreId = `Vector_index_${knowledgeBase.id}`

    const vectorStore = await WeaviateStore.fromExistingIndex(openAIEmbeddings, {
      client: weaviateClient,
      indexName: vectorStoreId,
      textKey: 'pageContent',
      metadataKeys: ['knowledgeBaseId'],
    })

    const prompt = ChatPromptTemplate.fromTemplate(`
Answer the user's question based on the following context:
{context}

User's question: {input}

Please provide a detailed and accurate answer.
Reply in the following languages: {language}
`)

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4o-mini',
      temperature: bot.temperature,
      streaming: true,
      maxTokens: bot.maxTokens,
      topP: bot.topP,
      presencePenalty: bot.presencePenalty,
      frequencyPenalty: bot.frequencyPenalty,
    })

    const combineDocsChain = await createStuffDocumentsChain({
      llm: model,
      prompt,
      outputParser: new StringOutputParser(),
    })

    const results = await vectorStore.similaritySearch(query, bot.topK) // 上位5つの結果を取得

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
    let fullResponse = ''
    const pass = new PassThrough()
    const messageHistory = new PrismaMessageHistory(conversationId)

    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          // eslint-disable-next-line no-restricted-syntax
          for await (const chunk of stream) {
            const encodedChunk = encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
            controller.enqueue(encodedChunk)
            if (chunk.answer) {
              fullResponse += chunk.answer
            }

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
          await messageHistory.addMessage(new HumanMessage(body.query))
          await messageHistory.addMessage(new AIMessage(fullResponse))
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
