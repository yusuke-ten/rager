import type { Meta, StoryObj } from '@storybook/react'

import { ChatList } from './chat-list'
import sample from '../../markdown/sample.md'
const meta: Meta<typeof ChatList> = {
  title: 'Chat/ChatList',
  component: ChatList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ChatList>

export const Default: Story = {
  args: {
    messages: [
      { type: 'question', content: 'こんにちは、履歴書について質問があります。' },
      {
        type: 'answer',
        content: 'はい、どのような質問でしょうか？お手伝いさせていただきます。',
      },
      { type: 'question', content: '職歴の書き方について教えてください。' },
      {
        type: 'answer',
        content:
          '職歴は、最新の職場から順に記載するのが一般的です。各職歴には、勤務期間、会社名、役職、主な責任や成果を簡潔に記載してください。',
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    messages: [],
  },
}

export const LongMarkdown: Story = {
  args: {
    messages: [
      {
        type: 'question',
        content: sample.toString(),
      },
      {
        type: 'answer',
        content: sample.toString(),
      },
    ],
  },
}

export const LongConversation: Story = {
  args: {
    messages: Array(20)
      .fill(null)
      .map((_, index) => ({
        type: index % 2 === 0 ? 'question' : 'answer',
        content: `メッセージ ${index + 1}`,
      })),
  },
}
