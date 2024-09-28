import type { Meta, StoryObj } from '@storybook/react'

import { Playground } from './playground'

const meta: Meta<typeof Playground> = {
  title: 'Bot/Playground',
  component: Playground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj<typeof Playground>

export const Default: Story = {
  args: {
    bot: {
      id: '1',
      name: 'Bot 1',
      description: 'Bot 1の説明',
      emptyResponse: 'Bot 1の空の応答',
      openStatement: 'Bot 1の開始文',
      showQuote: true,
      systemPrompt: 'Bot 1のシステムプロンプト',
      similarityThreshold: 0.5,
      keywordSimilarityWeight: 0.5,
      temperature: 0.7,
      topP: 0.85,
      presencePenalty: 0.5,
      frequencyPenalty: 0.5,
      maxTokens: 512,
    },
  },
}
