import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { Bot } from '@/components/bot'

const getBotList = async () => {
  const bot = await prisma.bot.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return bot
}

export default async function BotPage() {
  const botList = await getBotList()
  const handleCreateBot = async (botName: string) => {
    'use server'
    await prisma.bot.create({
      data: {
        name: botName,
        type: 'CHAT',
        systemPrompt: 'test',
      },
    })
    revalidatePath('/dashboard/bot')
  }

  const handleDeleteBot = async (botId: string) => {
    'use server'
    await prisma.bot.delete({
      where: { id: botId },
    })
    revalidatePath('/dashboard/bot')
  }

  return (
    <Bot
      bots={botList}
      handleCreateBot={handleCreateBot}
      handleDeleteBot={handleDeleteBot}
    />
  )
}
