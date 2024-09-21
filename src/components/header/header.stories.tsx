import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './header'

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Header/Header',
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard/knowledge',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {},
}
