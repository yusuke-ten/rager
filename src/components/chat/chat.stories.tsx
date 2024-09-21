import type { Meta, StoryObj } from '@storybook/react'

import { Bot, Message, Conversation } from '@prisma/client'

import { Chat } from './chat'

const meta: Meta<typeof Chat> = {
  title: 'Chat',
  component: Chat,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Chat>

const mockBot: Bot = {
  id: '1',
  name: 'テストボット',
  type: 'default',
  description: null,
  emptyResponse: null,
  openeStatement: null,
  showQuote: false,
  systemPrompt: '',
  similarityThreshold: 0,
  keywordSimilarityWeight: 0,
  topN: 0,
  temperature: 0,
  topP: 0,
  maxTokens: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  presencePenalty: 0,
  frequencyPenalty: 0,
}

const mockConversationList: (Conversation & {
  messages: Message[]
})[] = [
  {
    id: '1',
    name: '会話1',
    botId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    messages: [
      {
        id: '1',
        role: 'human',
        content: 'こんにちは',
        createdAt: new Date(),
        updatedAt: new Date(),
        conversationId: '1',
      },
      {
        id: '2',
        role: 'ai',
        content: 'はい、こんにちは。どのようなご用件でしょうか？',
        createdAt: new Date(),
        updatedAt: new Date(),
        conversationId: '1',
      },
    ],
  },
]

export const Default: Story = {
  args: {
    bot: {
      ...mockBot,
    },
    conversationList: mockConversationList.map((conv) => ({
      ...conv,
      messages: conv.messages.map((msg) => ({
        ...msg,
        conversationId: conv.id,
      })),
    })),
    conversationId: '1',
    handleCreateConversation: () => console.log('新しい会話を作成'),
    handleDeleteConversation: (id) => console.log(`会話 ${id} を削除`),
    handleRenameConversation: (id, newName) =>
      console.log(`会話 ${id} の名前を ${newName} に変更`),
  },
}

export const EmptyConversation: Story = {
  args: {
    ...Default.args,
    conversationList: [],
  },
}
