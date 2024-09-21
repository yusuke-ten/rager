import { Bot, Message, Conversation } from '@prisma/client'

import prisma from '@/lib/prisma'
import { Chat } from '@/components/chat'

type ConversationWithMessages = Conversation & {
  messages: Message[]
}

const getBot = async (botId?: string): Promise<Bot | null> => {
  const bot = await prisma.bot.findUnique({
    where: {
      id: botId,
    },
  })
  return bot
}

const getConversationList = async (
  botId?: string,
): Promise<ConversationWithMessages[]> => {
  const conversation = await prisma.conversation.findMany({
    where: {
      botId: botId,
    },
    include: {
      messages: true,
    },
  })
  return conversation
}

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: { botId: string }
  searchParams: { conversationId?: string }
}) {
  const botId = params.botId
  const bot = await getBot(botId)
  const conversationList = await getConversationList(botId)
  const conversationId = searchParams.conversationId

  if (!bot) {
    return <div>Bot not found</div>
  }

  const handleCreateConversation = async () => {
    'use server'

    const newConversation = await prisma.conversation.create({
      data: {
        botId: botId,
        name: 'New Conversation',
      },
    })
    return newConversation
  }

  const handleDeleteConversation = async (id: string) => {
    'use server'
    await prisma.conversation.delete({
      where: {
        id,
      },
    })
  }

  // const handleChangeConversation = async (id: string) => {
  //   searchParams.conversationId = id
  // }

  const handleRenameConversation = async (id: string, newName: string) => {
    'use server'
    await prisma.conversation.update({
      where: {
        id,
      },
      data: {
        name: newName,
      },
    })
  }

  return (
    <Chat
      conversationId={conversationId}
      bot={bot}
      conversationList={conversationList}
      handleCreateConversation={handleCreateConversation}
      handleDeleteConversation={handleDeleteConversation}
      handleRenameConversation={handleRenameConversation}
    />
  )
}
