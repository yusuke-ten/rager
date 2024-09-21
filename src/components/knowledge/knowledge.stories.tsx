import type { Meta, StoryObj } from '@storybook/react'

import { Knowledge } from './knowledge'

const meta: Meta<typeof Knowledge> = {
  title: 'Knowledge',
  component: Knowledge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Knowledge>

const mockKnowledgeBases = [
  {
    id: '1',
    name: 'テストナレッジ1',
    description: 'これはテストナレッジ1の説明です',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: '2',
    name: 'テストナレッジ2',
    description: 'これはテストナレッジ2の説明です',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-02'),
  },
]

export const Default: Story = {
  args: {
    knowledgeBases: mockKnowledgeBases,
    handleCreateKnowledge: async (knowledgeName: string) => {
      console.log(`新しいナレッジを作成: ${knowledgeName}`)
    },
    handleDeleteKnowledge: async (knowledgeBaseId: string) => {
      console.log(`ナレッジを削除: ${knowledgeBaseId}`)
    },
  },
}

export const Empty: Story = {
  args: {
    knowledgeBases: [],
    handleCreateKnowledge: async (knowledgeName: string) => {
      console.log(`新しいナレッジを作成: ${knowledgeName}`)
    },
    handleDeleteKnowledge: async (knowledgeBaseId: string) => {
      console.log(`ナレッジを削除: ${knowledgeBaseId}`)
    },
  },
}
