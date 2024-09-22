import type { Meta, StoryObj } from '@storybook/react'

import { Account } from './account'

const meta: Meta<typeof Account> = {
  title: 'Account',
  component: Account,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/profile',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Account>

export const Default: Story = {
  args: {
    children: 'Accountのデフォルト表示',
  },
}
