import type { Meta, StoryObj } from '@storybook/react'

import { ConversationList } from './conversation-list'

const meta: Meta<typeof ConversationList> = {
  title: 'Chat/ConversationList',
  component: ConversationList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConversationList>

export const Default: Story = {
  args: {
    conversationList: [
      {
        id: '1',
        name: '会話1',
        botId: 'bot1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: '会話2',
        botId: 'bot2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: '会話3',
        botId: 'bot3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    conversationList: [],
  },
}

export const ManyConversations: Story = {
  args: {
    conversationList: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `会話${i + 1}`,
      botId: `bot${i + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  },
}
