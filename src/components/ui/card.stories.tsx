import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from './card'

const meta: Meta = {
  title: 'Ui/Card',
  component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className='max-w-sm'>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a card description to explain more details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        This is the content of the card. You can put any elements here.
      </CardContent>
      <CardFooter>This is the footer of the card.</CardFooter>
    </Card>
  ),
}
