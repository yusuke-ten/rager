import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Ui/Badge',
  tags: ['avatar', 'profile', 'autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'デフォルトバッジ',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'セカンダリバッジ',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '破壊的バッジ',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'アウトラインバッジ',
  },
}

export const CustomClass: Story = {
  args: {
    children: 'カスタムクラスバッジ',
    className: 'bg-purple-500 text-white',
  },
}
