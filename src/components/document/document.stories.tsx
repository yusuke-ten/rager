import type { Meta, StoryObj } from '@storybook/react'

import { DocumentStatus, DocumentSegment, Document as DocumentType } from '@prisma/client'

import { Document } from './document'

const meta: Meta<typeof Document> = {
  title: 'Document',
  component: Document,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Document>

const mockDocument: DocumentType = {
  id: '1',
  name: 'サンプルドキュメント',
  knowledgeBaseId: 'kb1',
  metadata: {},
  mimeType: 'text/plain',
  chunkSize: 3,
  enabled: true,
  status: DocumentStatus.COMPLETED,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockDocumentSegments: DocumentSegment[] = [
  {
    id: '1',
    documentId: '1',
    vectorId: 'vec1',
    chunkContent: 'これはサンプルのチャンク1です。',
    position: 0,
    enabled: true,
    wordCount: 10,
    keywords: ['サンプル', 'チャンク'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    documentId: '1',
    vectorId: 'vec2',
    chunkContent: 'これはサンプルのチャンク2です。',
    position: 1,
    enabled: false,
    wordCount: 10,
    keywords: ['サンプル', 'チャンク'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    documentId: '1',
    vectorId: 'vec3',
    chunkContent: 'これはサンプルのチャンク3です。',
    position: 2,
    enabled: true,
    wordCount: 10,
    keywords: ['サンプル', 'チャンク'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const Default: Story = {
  args: {
    document: mockDocument,
    documentSegments: mockDocumentSegments,
    handleChangeDocumentSegmentEnabled: async () => {},
  },
}
