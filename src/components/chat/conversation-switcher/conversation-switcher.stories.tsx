import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { ConversationSwitcher } from './conversation-switcher'

const meta: Meta<typeof ConversationSwitcher> = {
  title: 'Chat/ConversationSwitcher',
  component: ConversationSwitcher,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConversationSwitcher>

export const Default: Story = {
  render: (args) => {
    const [selectedConversation, setSelectedConversation] = useState<string>('')
    return (
      <ConversationSwitcher
        {...args}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />
    )
  },
  args: {
    conversations: [
      {
        id: '2',
        label: 'Talk about AI',
      },
      {
        id: '3',
        label: 'Talk about Docker',
      },
      {
        id: '4',
        label: 'Talk about React',
      },
      {
        id: '5',
        label: 'Talk about Next.js',
      },
    ],
  },
}
