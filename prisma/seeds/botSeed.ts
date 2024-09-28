import { Tenant, KnowledgeBase } from '@prisma/client'

import prisma from '../../src/lib/prisma'

export const botSeed = async (tenant: Tenant, knowledgeBase: KnowledgeBase) => {
  const bot = await prisma.bot.create({
    data: {
      name: 'サンプルボット',
      description: 'これはサンプルのボットです。',
      type: 'CHATBOT',
      emptyResponse: 'ヒットしませんでした',
      openStatement: 'これはサンプルのボットです。',
      showQuote: false,
      systemPrompt: `
Answer the user's question based on the following context:
{context}

User's question: {input}

Please provide a detailed and accurate answer.
Reply in the following languages: {language}
`,
      similarityThreshold: 0.5,
      keywordSimilarityWeight: 0.5,
      temperature: 0.5,
      topP: 0.5,
      topK: 5,
      presencePenalty: 0.5,
      frequencyPenalty: 0.5,
      maxTokens: 512,
      botKnowledgeBase: {
        create: {
          knowledgeBaseId: knowledgeBase.id,
        },
      },
      tenantId: tenant.id,
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
}
