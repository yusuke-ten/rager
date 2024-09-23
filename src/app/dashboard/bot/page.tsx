import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { Bot } from '@/components/bot'
import { getCurrentTenant } from '@/lib/auth/getCurrentTenant'

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
    const tenant = await getCurrentTenant()
    if (!tenant) {
      throw new Error('Tenant not found')
    }
    await prisma.bot.create({
      data: {
        name: botName,
        type: 'CHAT',
        systemPrompt: 'test',
        tenantId: tenant.id,
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
    <main className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
      <div className='container mx-auto p-6'>
        <Bot
          bots={botList}
          handleCreateBot={handleCreateBot}
          handleDeleteBot={handleDeleteBot}
        />
      </div>
    </main>
  )
}
