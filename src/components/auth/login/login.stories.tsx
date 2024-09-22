import type { Meta, StoryObj } from '@storybook/react'

import { Login } from './login'

const meta: Meta<typeof Login> = {
  title: 'Auth/Login',
  component: Login,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Login>

export const Default: Story = {
  args: {
    login: async () => {
      console.log('login')
    },
  },
}
