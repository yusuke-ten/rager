import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Ui/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
}

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: 'destructive',
    children: 'Delete',
  },
}

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    children: 'Outline',
  },
}

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Link: Story = {
  args: {
    ...Default.args,
    variant: 'link',
    children: 'Link',
  },
}

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    children: 'Large',
  },
}

export const Icon: Story = {
  args: {
    ...Default.args,
    size: 'icon',
    children: '🔔',
  },
}
