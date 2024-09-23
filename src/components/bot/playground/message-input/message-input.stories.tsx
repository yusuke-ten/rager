import type { Meta, StoryObj } from '@storybook/react'

import { MessageInput } from './message-input'

const meta: Meta<typeof MessageInput> = {
  title: 'Bot/Playground/MessageInput',
  component: MessageInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MessageInput>

export const Default: Story = {
  args: {
    onSubmit: (query: string) => {
      console.log(query)
    },
    isDisabled: false,
  },
}
