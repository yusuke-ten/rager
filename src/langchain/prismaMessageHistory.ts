import { AIMessage, HumanMessage } from '@langchain/core/messages'
import { BaseListChatMessageHistory } from '@langchain/core/chat_history'

import prisma from '@/lib/prisma'

export class PrismaMessageHistory extends BaseListChatMessageHistory {
  lc_namespace = ['langchain', 'chat_history', 'prisma']

  private conversationId: string

  constructor(conversationId: string) {
    super()
    this.conversationId = conversationId
  }

  async getMessages() {
    const messages = await prisma.message.findMany({
      where: { conversationId: this.conversationId },
      orderBy: { createdAt: 'asc' },
    })

    return messages.map((msg) =>
      msg.role === 'human' ? new HumanMessage(msg.content) : new AIMessage(msg.content),
    )
  }

  async addMessage(message: HumanMessage | AIMessage) {
    await prisma.message.create({
      data: {
        content:
          typeof message.content === 'string'
            ? message.content
            : JSON.stringify(message.content),
        role: message._getType() === 'human' ? 'human' : 'ai',
        conversation: { connect: { id: this.conversationId } },
      },
    })
  }

  async clear() {
    await prisma.message.deleteMany({
      where: { conversationId: this.conversationId },
    })
  }
}
