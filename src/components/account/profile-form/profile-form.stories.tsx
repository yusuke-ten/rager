import type { Meta, StoryObj } from '@storybook/react'

import { ProfileForm } from './profile-form'

const meta: Meta<typeof ProfileForm> = {
  title: 'ProfileForm',
  component: ProfileForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProfileForm>

export const Default: Story = {
  args: {
    handleSubmit: () => {
      console.log('submit')
    },
  },
}
