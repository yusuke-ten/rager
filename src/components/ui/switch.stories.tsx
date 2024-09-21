import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Ui/Switch',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    checked: true,
  },
}
