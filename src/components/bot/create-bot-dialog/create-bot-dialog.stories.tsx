import type { Meta, StoryObj } from '@storybook/react'

import { CreateBotDialog } from './create-bot-dialog'

const meta: Meta<typeof CreateBotDialog> = {
  title: 'Bot/CreateBotDialog',
  component: CreateBotDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CreateBotDialog>

export const Default: Story = {
  args: {
    knowledgeBases: [
      { id: '1', name: 'サンプル1' },
      { id: '2', name: 'サンプル2' },
      { id: '3', name: 'サンプル3' },
      { id: '4', name: 'サンプル4' },
    ],
    handleCreateBot: (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
  },
}
