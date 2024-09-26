import type { Meta, StoryObj } from '@storybook/react'

import { Playground } from './playground'

const meta: Meta<typeof Playground> = {
  title: 'Bot/Playground',
  component: Playground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj<typeof Playground>

export const Default: Story = {
  args: {
    botId: '1',
  },
}
