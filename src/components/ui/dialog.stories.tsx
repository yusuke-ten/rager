import type { Meta, StoryObj } from '@storybook/react'

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from './dialog'

const meta: Meta<typeof Dialog> = {
  title: 'Ui/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open the dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a dialog description.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}
