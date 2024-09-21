import type { Meta, StoryObj } from '@storybook/react'

import { FileUpload } from './file-upload'

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: 'FileUpload',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  args: {
    files: [],
    handleAddFiles: (files: File[]) => console.log(files),
    progress: {},
    error: undefined,
    isUploading: false,
  },
}

export const WithFiles: Story = {
  args: {
    files: [
      new File([''], 'test.png', { type: 'image/png', lastModified: Date.now() }),
      new File([''], 'test.pdf', { type: 'application/pdf', lastModified: Date.now() }),
    ],
    handleAddFiles: (files: File[]) => console.log(files),
    progress: {},
    error: undefined,
    isUploading: false,
  },
}

export const WithProgress: Story = {
  args: {
    files: [new File([''], 'test.png', { type: 'image/png', lastModified: Date.now() })],
    handleAddFiles: (files: File[]) => console.log(files),
    progress: {
      'test.png': 50,
    },
    error: undefined,
    isUploading: false,
  },
}

export const WithError: Story = {
  args: {
    files: [],
    handleAddFiles: (files: File[]) => console.log(files),
    progress: {},
    error: 'ファイルサイズが大きすぎます。',
    isUploading: false,
  },
}

export const IsUploading: Story = {
  args: {
    files: [
      new File([''], 'test.png', { type: 'image/png', lastModified: Date.now() }),
      new File([''], 'test.pdf', { type: 'application/pdf', lastModified: Date.now() }),
    ],
    handleAddFiles: (files: File[]) => console.log(files),
    progress: {},
    error: undefined,
    isUploading: true,
  },
}
