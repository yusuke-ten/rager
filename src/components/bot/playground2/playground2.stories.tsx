import type { Meta, StoryObj } from '@storybook/react'

import { Playground2 } from './playground2'

const meta: Meta<typeof Playground2> = {
  title: 'Bot/Playground2',
  component: Playground2,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Playground2>

export const Default: Story = {
  args: {
    children: 'Playground2のデフォルト表示',
  },
}
