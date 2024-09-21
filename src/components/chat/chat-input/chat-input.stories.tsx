import type { Meta, StoryObj } from '@storybook/react'

import { ChatInput } from './chat-input'

const meta: Meta<typeof ChatInput> = {
  title: 'Chat/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  args: {
    handleSendMessage: () => console.log('Message sent'),
  },
}

export const WithCustomPlaceholder: Story = {
  args: {
    handleSendMessage: () => console.log('Message sent'),
    placeholder: 'カスタムプレースホルダー',
  },
}

export const WithInitialValue: Story = {
  args: {
    handleSendMessage: () => console.log('Message sent'),
    initialValue: '初期値のテキスト',
  },
}

export const WithMultilineInitialValue: Story = {
  args: {
    handleSendMessage: () => console.log('Message sent'),
    initialValue: `これは複数行の
初期値です。
ChatInputコンポーネントが
複数行のテキストを
どのように扱うかを
テストします。`,
  },
}

export const Disabled: Story = {
  args: {
    handleSendMessage: () => console.log('Message sent'),
    disabled: true,
  },
}
