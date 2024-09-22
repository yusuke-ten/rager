import type { WeaviateClient } from 'weaviate-ts-client'
import type { Document } from '@langchain/core/documents'

import path from 'path'
import weaviate from 'weaviate-ts-client'
import { PrismaClient } from '@prisma/client'
import { WeaviateStore } from '@langchain/weaviate'
import { OpenAIEmbeddings } from '@langchain/openai'
import { createClient } from '@supabase/supabase-js'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const prisma = new PrismaClient()

// Supabaseクライアントの初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

async function main() {
  // ここにシードデータを定義し、データベースに挿入するコードを書きます
  const knowledgeBase = await prisma.knowledgeBase.create({
    data: {
      name: 'サンプルナレッジベース',
      description: 'これはサンプルのナレッジベースです。',
    },
  })

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
      knowledgeBaseId: knowledgeBase.id,
      name: fileName,
      metadata: {
        knowledgeBaseId: knowledgeBase.id,
      },
      fileType: 'application/pdf',
      chunkSize: chunkedDocs.length,
    },
  })
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

  const bot = await prisma.bot.create({
    data: {
      name: 'サンプルボット',
      description: 'これはサンプルのボットです。',
      type: 'CHATBOT',
      systemPrompt: 'あなたはサンプルボットです。', // この行を追加
      BotKnowledgeBase: {
        create: {
          knowledgeBaseId: knowledgeBase.id,
        },
      },
    },
  })

  const conversation = await prisma.conversation.create({
    data: {
      botId: bot.id,
      name: 'サンプル会話',
    },
  })

  await prisma.message.createMany({
    data: [
      {
        conversationId: conversation.id,
        role: 'human',
        content: 'これはサンプルのメッセージ1です。',
      },
      {
        conversationId: conversation.id,
        role: 'ai',
        content: 'はい、どのようなご質問でしょうか？',
      },
      {
        conversationId: conversation.id,
        role: 'human',
        content: 'このボットの機能について教えてください。',
      },
    ],
  })

  // Supabaseからユーザー一覧を取得
  const { data: supabaseUsers, error } = await supabase.auth.admin.listUsers()
  if (error) {
    console.error('Supabaseからユーザーを取得できませんでした:', error)
    return
  }

  // ユーザーをUserTableに追加
  for (const user of supabaseUsers.users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        supabaseId: user.id,
        email: user.email,
        name: user.user_metadata.name || null,
        // 必要に応じて他のフィールドを更新
      },
      create: {
        supabaseId: user.id,
        email: user.email || '',
        name: user.user_metadata.name || null,
      },
    })
  }

  console.log(`${supabaseUsers.users.length}人のユーザーをUserTableに追加しました。`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
