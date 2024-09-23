import type { Meta, StoryObj } from '@storybook/react'

import { AuthContext } from '@/hooks/use-auth'

import { Header } from './header'

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Layout/DashboardLayout/Header',
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard/knowledge',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          user: {
            id: '1',
            supabaseId: 'abc123',
            email: 'test@example.com',
            name: 'テストユーザー',
            avatarUrl: 'https://example.com/avatar.jpg',
            role: 'ADMIN',
            tenant: {
              id: '1',
              name: 'テストテナント',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
          initialized: true,
          signOut: () => Promise.resolve(),
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {},
}
