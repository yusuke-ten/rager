import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from './sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Sidebar',
  component: Sidebar,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    children: 'children',
  },
}
