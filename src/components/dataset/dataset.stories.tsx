import type { Meta, StoryObj } from '@storybook/react'

import { Dataset } from './dataset'

const meta: Meta<typeof Dataset> = {
  title: 'Dataset',
  component: Dataset,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dataset>

const mockDocuments = [
  {
    id: '1',
    knowledgeBaseId: 'kb123',
    name: 'テストドキュメント1',
    metadata: {},
    fileType: null,
    chunkSize: 1000,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    enabled: true,
  },
  {
    id: '2',
    knowledgeBaseId: 'kb123',
    name: 'テストドキュメント2',
    metadata: {},
    fileType: null,
    chunkSize: 500,
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01'),
    enabled: false,
  },
]

export const Default: Story = {
  args: {
    documents: mockDocuments,
    knowledgeBaseId: 'kb123',
    refreshDocuments: () => console.log('ドキュメントを更新'),
    deleteDocument: async () => console.log('ドキュメントを削除'),
    handleChangeDocumentEnabled: () => console.log('ドキュメントの有効/無効を切り替え'),
  },
}

export const Empty: Story = {
  args: {
    ...Default.args,
    documents: [],
  },
}
