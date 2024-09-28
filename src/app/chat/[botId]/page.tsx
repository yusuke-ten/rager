import prisma from '@/lib/prisma'
import { Bot } from '@/types/bot'
import { Chat } from '@/components/chat'
import { Message } from '@/types/message'
import { Conversation } from '@/types/conversation'

const getBot = async (botId?: string): Promise<Bot | null> => {
  const bot = await prisma.bot.findUnique({
    where: {
      id: botId,
    },
  })
  if (!bot) {
    return null
  }
  return {
    id: bot.id,
    name: bot.name,
    description: bot.description,
    emptyResponse: bot.emptyResponse,
    openStatement: bot.openStatement,
    showQuote: bot.showQuote,
    systemPrompt: bot.systemPrompt,
    similarityThreshold: bot.similarityThreshold,
    keywordSimilarityWeight: bot.keywordSimilarityWeight,
    temperature: bot.temperature,
    topP: bot.topP,
    presencePenalty: bot.presencePenalty,
    frequencyPenalty: bot.frequencyPenalty,
    maxTokens: bot.maxTokens,
  }
}

const getConversationList = async (botId?: string): Promise<Conversation[]> => {
  const conversations = await prisma.conversation.findMany({
    where: {
      botId: botId,
    },
    include: {
      messages: true,
    },
  })
  if (!conversations) {
    return []
  }
  return conversations.map((conversation) => ({
    id: conversation.id,
    name: conversation.name,
  }))
}

const getMessages = async (
  botId?: string,
  conversationId?: string,
): Promise<Message[]> => {
  let messages: Message[] = []
  if (!conversationId) {
    const firstConversationWithMessages = await prisma.conversation.findFirst({
      where: {
        botId: botId,
      },
      include: {
        messages: true,
      },
    })

    if (firstConversationWithMessages) {
      messages = firstConversationWithMessages.messages
    }
  } else {
    messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
    })
  }

  return messages.map((message) => ({
    id: message.id,
    content: message.content,
    role: message.role,
  }))
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
  const messages = await getMessages(botId, conversationId)

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
      bot={bot}
      conversationId={conversationId}
      availableLanguages={[
        {
          id: 'en-US',
          label: 'English',
        },
        {
          id: 'ja-JP',
          label: '日本語',
        },
        {
          id: 'ko-KR',
          label: '한국어',
        },
        {
          id: 'zh-CN',
          label: '中国語',
        },
      ]}
      conversations={conversationList}
      messages={messages}
      handleCreateConversation={handleCreateConversation}
      handleDeleteConversation={handleDeleteConversation}
      handleRenameConversation={handleRenameConversation}
    />
  )
}
