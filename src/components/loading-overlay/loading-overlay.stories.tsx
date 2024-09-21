import type { Meta, StoryObj } from '@storybook/react'

import { LoadingOverlay } from './loading-overlay'

const meta: Meta<typeof LoadingOverlay> = {
  title: 'LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoadingOverlay>

export const Default: Story = {
  args: {
    isLoading: true,
  },
}

export const NotLoading: Story = {
  args: {
    isLoading: false,
  },
}
