'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/layout/dashboard-layout/sidebar/sidebar'
import { StickyBreadcrumb } from '@/components/layout/dashboard-layout/sticky-breadcrumb/sticky-breadcrumb' // 追加
import { Play } from 'lucide-react'

export default function KnowledgeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const params = useParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const navItems = [
    {
      href: `/dashboard/bot/${params.botId}/playground`,
      label: 'プレイグラウンド',
      icon: <Play className='h-5 w-5' />,
    },
  ]

  const breadcrumbItems = [
    { href: '/dashboard/bot', label: 'ボット' },
    { href: `/dashboard/bot/${params.botId}/playground`, label: 'プレイグラウンド' },
  ]

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
          <StickyBreadcrumb breadcrumbItems={breadcrumbItems} />
        )}
        <main className='flex-1 items-start gap-4 overflow-y-auto p-4 sm:px-6 sm:py-0 md:gap-8'>
          {children}
        </main>
      </div>
    </>
  )
}
