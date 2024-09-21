import type { Meta, StoryObj } from '@storybook/react'

import {
  Toast,
  ToastTitle,
  ToastAction,
  ToastProvider,
  ToastViewport,
  ToastDescription,
} from './toast'

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Ui/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <ToastViewport>
          <Story />
        </ToastViewport>
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <ToastTitle>Success!</ToastTitle>
        <ToastDescription>Your changes have been saved.</ToastDescription>
      </>
    ),
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <ToastTitle>Error!</ToastTitle>
        <ToastDescription>Something went wrong.</ToastDescription>
      </>
    ),
  },
}

export const WithAction: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <ToastTitle>Success!</ToastTitle>
        <ToastDescription>Your changes have been saved.</ToastDescription>
        <ToastAction asChild altText='変更を元に戻す'>
          <button>Undo</button>
        </ToastAction>
      </>
    ),
  },
}

export const WithCustomAction: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <ToastTitle>Success!</ToastTitle>
        <ToastDescription>Your changes have been saved.</ToastDescription>
        <ToastAction asChild altText='変更を元に戻す'>
          <button>Undo</button>
        </ToastAction>
      </>
    ),
  },
}
