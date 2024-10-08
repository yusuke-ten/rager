import type { Meta, StoryObj } from '@storybook/react'

import { Bot } from '@/types/bot'
import { Message } from '@/types/message'
import { Conversation } from '@/types/conversation'

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
  name: 'ボット1',
  description: '説明文',
  emptyResponse: '応答がありません',
  openStatement: '初期メッセージ',
  showQuote: false,
  systemPrompt: 'システムプロンプト',
  similarityThreshold: 0.5,
  keywordSimilarityWeight: 0.5,
  temperature: 0.5,
  topP: 0.5,
  presencePenalty: 0.5,
  frequencyPenalty: 0.5,
  maxTokens: 1000,
}

const mockMessage: Message[] = Array.from({ length: 100 }, (_, i) => ({
  id: i.toString(),
  content: `これはテストメッセージです。${i}`,
  role: i % 2 === 0 ? 'human' : 'ai',
}))

const mockConversationList: Conversation[] = [
  {
    id: '1',
    name: '会話1',
  },
  {
    id: '2',
    name: '会話2',
  },
]

export const Default: Story = {
  args: {
    bot: mockBot,
    conversations: mockConversationList,
    messages: mockMessage,
    conversationId: '1',
    handleCreateConversation: () => console.log('新しい会話を作成'),
    handleDeleteConversation: (id) => console.log(`会話 ${id} を削除`),
    handleRenameConversation: (id, newName) =>
      console.log(`会話 ${id} の名前を ${newName} に変更`),
    availableLanguages: [
      {
        id: 'ja-JP',
        label: '日本語',
      },
    ],
  },
}

export const EmptyConversation: Story = {
  args: {
    ...Default.args,
    conversations: [],
    conversationId: undefined,
    messages: [],
    availableLanguages: [
      {
        id: 'ja',
        label: '日本語',
      },
    ],
  },
}
