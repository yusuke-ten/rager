import type { Meta, StoryObj } from '@storybook/react'

import { AuthLayout } from './auth-layout'

const meta: Meta<typeof AuthLayout> = {
  title: 'Layout/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AuthLayout>

export const Default: Story = {
  args: {
    children: 'AuthLayoutのデフォルト表示',
  },
}
