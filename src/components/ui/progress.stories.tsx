import type { Meta, StoryObj } from '@storybook/react'

import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  component: Progress,
  title: 'Ui/Progress',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    value: 50,
  },
}

export const WithLabel: Story = {
  args: {
    value: 75,
    children: '75%',
  },
}
