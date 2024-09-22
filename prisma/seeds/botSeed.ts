import { Tenant, KnowledgeBase } from '@prisma/client'

import prisma from '../../src/lib/prisma'

export const botSeed = async (tenant: Tenant, knowledgeBase: KnowledgeBase) => {
  const bot = await prisma.bot.create({
    data: {
      name: 'サンプルボット',
      description: 'これはサンプルのボットです。',
      type: 'CHATBOT',
      BotKnowledgeBase: {
        create: {
          knowledgeBaseId: knowledgeBase.id,
        },
      },
      systemPrompt: 'あなたはサンプルボットです。',
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
