import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from './calendar'

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Ui/Calendar',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  args: {
    className: 'w-full max-w-md',
  },
}
