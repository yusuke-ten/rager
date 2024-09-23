import type { Meta, StoryObj } from '@storybook/react'

import { AuthContext } from '@/hooks/use-auth'

import { UserNav } from './user-nav'

const meta: Meta<typeof UserNav> = {
  component: UserNav,
  title: 'Layout/DashboardLayout/Header/UserNav',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
type Story = StoryObj<typeof UserNav>

export const Default: Story = {}
