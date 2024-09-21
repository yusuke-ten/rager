import type { Meta, StoryObj } from '@storybook/react'

import { Alert, AlertTitle, AlertDescription } from './alert'

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Ui/Alert',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </>
    ),
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>This is a destructive alert message.</AlertDescription>
      </>
    ),
  },
}
