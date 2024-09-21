import type { Meta, StoryObj } from '@storybook/react'

import { UserNav } from './user-nav'

const meta: Meta<typeof UserNav> = {
  component: UserNav,
  title: 'Header/UserNav',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof UserNav>

export const Default: Story = {}
