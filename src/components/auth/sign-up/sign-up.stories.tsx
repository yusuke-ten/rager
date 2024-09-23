import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './sign-up'

const meta: Meta<typeof SignUp> = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof SignUp>

export const Default: Story = {
  args: {
    signUp: async () => {
      console.log('signUp')
    },
  },
}
