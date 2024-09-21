import type { Meta, StoryObj } from '@storybook/react'

import * as React from 'react'

import { Table, TableRow, TableBody, TableHead, TableCell, TableHeader } from './table'

const meta: Meta<typeof Table> = {
  title: 'Ui/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Doe</TableCell>
            <TableCell>jane.doe@example.com</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
}
