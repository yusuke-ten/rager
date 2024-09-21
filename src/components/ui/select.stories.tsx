import type { Meta, StoryObj } from '@storybook/react'

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './select'

const meta: Meta<typeof Select> = {
  title: 'Ui/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>Select an option</SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton />
        <SelectItem value='option-1'>Option 1</SelectItem>
        <SelectItem value='option-2'>Option 2</SelectItem>
        <SelectItem value='option-3'>Option 3</SelectItem>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  ),
}

export const Grouped: Story = {
  render: () => (
    <Select>
      <SelectTrigger>Select an option</SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton />
        <SelectGroup>
          <SelectItem value='option-4'>Option 4</SelectItem>
          <SelectItem value='option-5'>Option 5</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectItem value='option-6'>Option 6</SelectItem>
          <SelectItem value='option-7'>Option 7</SelectItem>
        </SelectGroup>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <Select>
      <SelectGroup>
        <SelectLabel>My Label</SelectLabel>
      </SelectGroup>
      <SelectTrigger>Select an option</SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton />
        <SelectItem value='option-8'>Option 8</SelectItem>
        <SelectItem value='option-9'>Option 9</SelectItem>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  ),
}
