import type { Meta, StoryObj } from '@storybook/react'

import { Setting } from './setting'

const meta: Meta<typeof Setting> = {
  title: 'Bot/Playground/Setting',
  component: Setting,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Setting>

export const Default: Story = {
  args: {
    systemPrompt: `
    Answer the user's question based on the following context:
    {context}

    User's question: {input}

    Please provide a detailed and accurate answer.
    `,
    setSystemPrompt: () => {},
  },
}
