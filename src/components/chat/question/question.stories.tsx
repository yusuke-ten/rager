import type { Meta, StoryObj } from '@storybook/react'

import { Question } from './question'

const meta: Meta<typeof Question> = {
  title: 'Chat/Question',
  component: Question,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Question>

export const Default: Story = {
  args: {
    message: 'これは質問のメッセージです。',
  },
}

export const LongMessage: Story = {
  args: {
    message:
      'これは非常に長い質問のメッセージです。複数行にわたる場合もあります。コンポーネントがどのように表示されるか確認するためのものです。',
  },
}

export const CustomClassName: Story = {
  args: {
    message: 'カスタムクラス名を持つ質問です。',
    className: 'bg-blue-100 text-blue-800',
  },
}
