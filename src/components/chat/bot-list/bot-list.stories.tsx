import type { Meta, StoryObj } from '@storybook/react'

import { BotList } from './bot-list'

const meta: Meta<typeof BotList> = {
  title: 'Chat/BotList',
  component: BotList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BotList>

const mockBots = [
  {
    id: '1',
    name: 'アシスタント1',
    type: 'assistant',
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    emptyResponse: null,
    openStatement: null,
    showQuote: false,
    systemPrompt: '',
    similarityThreshold: 0,
    topN: 0,
    temperature: 0,
    topP: 0,
    keywordSimilarityWeight: 0,
    presencePenalty: 0,
    frequencyPenalty: 0,
    maxTokens: 0,
  },
  // 他のボットも同様に更新
]

export const Default: Story = {
  args: {
    botList: mockBots,
  },
}

export const Empty: Story = {
  args: {
    botList: [],
  },
}

export const LongList: Story = {
  args: {
    botList: Array(20)
      .fill(null)
      .map((_, index) => ({
        id: `${index + 1}`,
        name: `アシスタント${index + 1}`,
        type: 'assistant',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
  },
}
