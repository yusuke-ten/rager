import type { Meta, StoryObj } from '@storybook/react'

import { Bot } from './bot'

const meta: Meta<typeof Bot> = {
  title: 'Bot',
  component: Bot,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Bot>
const mockBots = [
  {
    id: '1',
    name: 'テストボット1',
    description: null,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'テストボット2',
    description: null,
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01'),
  },
]

export const Default: Story = {
  args: {
    bots: mockBots,
    handleCreateBot: async (botName: string) => {
      console.log(`新しいボットを作成: ${botName}`)
    },
    handleDeleteBot: async (botId: string) => {
      console.log(`ボットを削除: ${botId}`)
    },
  },
}

export const Empty: Story = {
  args: {
    bots: [],
    handleCreateBot: async (botName: string) => {
      console.log(`新しいボットを作成: ${botName}`)
    },
    handleDeleteBot: async (botId: string) => {
      console.log(`ボットを削除: ${botId}`)
    },
  },
}
