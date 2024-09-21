import type { Meta, StoryObj } from '@storybook/react'

import { DateRangePicker } from './date-range-picker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {
  args: {
    children: 'DateRangePickerのデフォルト表示',
  },
}
