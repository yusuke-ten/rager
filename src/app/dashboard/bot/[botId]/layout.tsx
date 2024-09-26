'use client'

import { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/layout/dashboard-layout/sidebar/sidebar'
import { StickyBreadcrumb } from '@/components/layout/dashboard-layout/sticky-breadcrumb/sticky-breadcrumb' // 追加
import { Play, Settings, ScrollText } from 'lucide-react'

export default function KnowledgeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  const params = useParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const { botId } = params

  const navItems = [
    {
      href: `/dashboard/bot/${params.botId}/playground`,
      label: 'プレイグラウンド',
      icon: <Play className='h-5 w-5' />,
    },
    {
      href: `/dashboard/bot/${params.botId}/configuration`,
      label: '設定',
      icon: <Settings className='h-5 w-5' />,
    },
    {
      href: `/dashboard/bot/${params.botId}/log`,
      label: 'ログ',
      icon: <ScrollText className='h-5 w-5' />,
    },
  ]

  const breadcrumbItems = [
    { href: '/dashboard/bot', label: 'ボット' },
    { href: `/dashboard/bot/${params.botId}/playground`, label: 'プレイグラウンド' },
  ]

  const generateBreadcrumbItems = () => {
    if (path.includes('configuration')) {
      return [
        { href: '/dashboard/bot', label: 'ボット' },
        { href: `/dashboard/bot/${botId}/configuration`, label: '設定' },
      ]
    }
    if (path.includes('log')) {
      return [
        { href: '/dashboard/bot', label: 'ログ' },
        { href: `/dashboard/bot/${botId}/log`, label: 'ログ' },
      ]
    }
    return [
      { href: '/dashboard/bot', label: 'ボット' },
      { href: `/dashboard/bot/${botId}/playground`, label: 'プレイグラウンド' },
    ]
  }

  return (
    <>
      <Sidebar
        navItems={navItems}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <div
        className={cn(
          'flex flex-1 flex-col overflow-hidden border transition-all duration-300 ease-in-out sm:gap-4 sm:pt-4',
          isExpanded ? 'sm:pl-64' : 'sm:pl-16',
        )}
      >
        {breadcrumbItems.length > 0 && (
          <StickyBreadcrumb breadcrumbItems={generateBreadcrumbItems()} />
        )}
        <main className='flex-1 items-start gap-4 overflow-y-auto p-4 sm:px-6 sm:py-0 md:gap-8'>
          {children}
        </main>
      </div>
    </>
  )
}
