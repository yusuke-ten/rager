import type { Meta, StoryObj } from '@storybook/react'

import { Configuration } from './configuration'

const meta: Meta<typeof Configuration> = {
  title: 'Bot/Configuration',
  component: Configuration,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Configuration>

export const Default: Story = {
  args: {
    knowledgeBases: [
      { id: '1', name: 'Knowledge Base 1' },
      { id: '2', name: 'Knowledge Base 2' },
    ],
  },
}
