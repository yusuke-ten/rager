import type { Meta, StoryObj } from '@storybook/react'

import { TenantForm } from './tenant-form'

const meta: Meta<typeof TenantForm> = {
  title: 'TenantForm',
  component: TenantForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TenantForm>

export const Default: Story = {
  args: {
    children: 'TenantFormのデフォルト表示',
  },
}
