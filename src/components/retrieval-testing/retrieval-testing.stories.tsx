import type { Meta, StoryObj } from '@storybook/react'

import { RetrievalTesting } from './retrieval-testing'

const meta: Meta<typeof RetrievalTesting> = {
  title: 'RetrievalTesting',
  component: RetrievalTesting,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RetrievalTesting>

export const Default: Story = {
  args: {
    knowledgeBaseId: 'test-knowledge-base-id',
    handleRetrievalTesting: async (query: string) => {
      // モックの結果を返す
      return [
        {
          id: '1',
          documentId: 'doc1',
          vectorId: 'vec1',
          chunkContent: 'これはテスト結果の内容です。クエリ: ' + query,
          position: 0,
          enabled: true,
          wordCount: 10,
          keywords: ['テスト', 'クエリ'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          documentId: 'doc2',
          vectorId: 'vec2',
          chunkContent: 'これは2つ目のテスト結果です。',
          position: 1,
          enabled: true,
          wordCount: 8,
          keywords: ['テスト'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    },
  },
}

export const NoResults: Story = {
  args: {
    ...Default.args,
    handleRetrievalTesting: async () => [],
  },
}
