import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { Pencil, FileText, RefreshCw } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AuthContext } from '@/hooks/use-auth'
import { Sidebar } from '@/components/layout/dashboard-layout/sidebar/sidebar'
import { StickyBreadcrumb } from '@/components/layout/dashboard-layout/sticky-breadcrumb/sticky-breadcrumb'

import { DashboardLayout } from './dashboard-layout'

const meta: Meta<typeof DashboardLayout> = {
  title: 'Layout/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
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
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/dashboard/knowledge/1/dataset',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DashboardLayout>

const longContent = (
  <>
    <h1>長いコンテンツ</h1>
    <p>これは非常に長いコンテンツの例です。スクロールが必要になります。</p>
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i}>
        <h2>セクション {i + 1}</h2>
        <p>
          ここにはたくさんのテキストが入ります。ユーザーはこの部分をスクロールする必要があります。
        </p>
        <ul>
          {Array.from({ length: 5 }, (_, j) => (
            <li key={j}>リストアイテム {j + 1}</li>
          ))}
        </ul>
      </div>
    ))}
  </>
)

const NormalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <main className='flex-1 overflow-y-auto overflow-x-hidden'>
        <div className='container mx-auto p-6'>{children}</div>
      </main>
    </DashboardLayout>
  )
}

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const navItems = [
    {
      href: '/dashboard/knowledge/1/dataset',
      label: 'データセット',
      icon: <FileText className='h-5 w-5' />,
    },
    {
      href: '/dashboard/knowledge/1/retrieval-testing',
      label: '検索テスト',
      icon: <RefreshCw className='h-5 w-5' />,
    },
    {
      href: '/dashboard/knowledge/1/configuration',
      label: '設定',
      icon: <Pencil className='h-5 w-5' />,
    },
  ]

  const breadcrumbItems = [
    {
      href: '/dashboard/knowledge/1/dataset',
      label: 'データセット',
    },
    {
      href: '/dashboard/knowledge/1/retrieval-testing',
      label: '検索テスト',
    },
    {
      href: '/dashboard/knowledge/1/configuration',
      label: '設定',
    },
  ]
  return (
    <DashboardLayout>
      <Sidebar
        navItems={navItems}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <div
        className={cn(
          'flex flex-1 flex-col border bg-muted/40 transition-all duration-300 ease-in-out sm:gap-4 sm:py-4',
          isExpanded ? 'sm:pl-64' : 'sm:pl-16',
        )}
      >
        {breadcrumbItems.length > 0 && (
          <StickyBreadcrumb breadcrumbItems={breadcrumbItems} />
        )}
        <main className='flex-1 items-start gap-4 overflow-y-auto p-4 sm:px-6 sm:py-0 md:gap-8'>
          {children}
        </main>
      </div>
    </DashboardLayout>
  )
}

export const Default: Story = {
  render: (args) => <NormalLayout>{args.children}</NormalLayout>,
  args: {
    children: `DashboardLayoutのデフォルト表示`,
  },
}

export const WithLongContent: Story = {
  render: (args) => <NormalLayout>{args.children}</NormalLayout>,
  args: {
    children: longContent,
  },
}

export const WithSidebar: Story = {
  render: (args) => <SidebarLayout>{args.children}</SidebarLayout>,
  args: {
    children: longContent,
  },
}

const complexLayout = (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
    {Array.from({ length: 30 }, (_, i) => (
      <div key={i} style={{ border: '1px solid #ccc', padding: '1rem' }}>
        <h3>カード {i + 1}</h3>
        <p>これは複雑なレイアウトの例です。グリッドレイアウトを使用しています。</p>
        <button>詳細を見る</button>
      </div>
    ))}
  </div>
)

export const WithComplexLayout: Story = {
  render: (args) => <NormalLayout>{args.children}</NormalLayout>,
  args: {
    children: complexLayout,
  },
}

export const WithSidebarAndComplexLayout: Story = {
  render: (args) => <SidebarLayout>{args.children}</SidebarLayout>,
  args: {
    children: complexLayout,
  },
}

const dynamicContent = (
  <div>
    <h1>動的コンテンツ</h1>
    <p>この例では、動的に生成されたコンテンツを表示します。</p>
    {Array.from({ length: 30 }, (_, i) => (
      <div key={i}>
        <h2>動的セクション {i + 1}</h2>
        <p>現在の時刻: {new Date().toLocaleTimeString()}</p>
        <p>ランダムな数値: {Math.random()}</p>
      </div>
    ))}
  </div>
)

export const WithDynamicContent: Story = {
  render: (args) => <NormalLayout>{args.children}</NormalLayout>,
  args: {
    children: dynamicContent,
  },
}
export const WithSidebarAndDynamicContent: Story = {
  render: (args) => <SidebarLayout>{args.children}</SidebarLayout>,
  args: {
    children: dynamicContent,
  },
}
