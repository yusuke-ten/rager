import type { Meta, StoryObj } from '@storybook/react'

import { Avatar, AvatarImage, AvatarFallback } from './avatar'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Ui/Avatar',
  tags: ['avatar', 'profile', 'autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {},
  render: (args) => (
    <Avatar>
      <AvatarImage src='https://picsum.photos/200' alt={'Avatar'} />
      <AvatarFallback>Avatar</AvatarFallback>
    </Avatar>
  ),
}
