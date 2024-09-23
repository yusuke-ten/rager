import type { Meta, StoryObj } from '@storybook/react'

import { MainNav } from './main-nav'

const meta: Meta<typeof MainNav> = {
  component: MainNav,
  title: 'Layout/DashboardLayout/Header/MainNav',
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
type Story = StoryObj<typeof MainNav>

export const Default: Story = {
  args: {
    className: '',
  },
}
