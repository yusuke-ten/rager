'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Pencil, FileText, RefreshCw } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/layout/dashboard-layout/sidebar/sidebar'
import { StickyBreadcrumb } from '@/components/layout/dashboard-layout/sticky-breadcrumb/sticky-breadcrumb' // 追加

export default function KnowledgeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const params = useParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const navItems = [
    {
      href: `/dashboard/knowledge/${params.knowledgeBaseId}/dataset`,
      label: 'データセット',
      icon: <FileText className='h-5 w-5' />,
    },
    {
      href: `/dashboard/knowledge/${params.knowledgeBaseId}/retrieval-testing`,
      label: '検索テスト',
      icon: <RefreshCw className='h-5 w-5' />,
    },
    {
      href: `/dashboard/knowledge/${params.knowledgeBaseId}/configuration`,
      label: '設定',
      icon: <Pencil className='h-5 w-5' />,
    },
  ]

  const breadcrumbItems = [
    { href: '/dashboard/knowledge', label: '知識ベース' },
    { href: `/dashboard/knowledge/${params.knowledgeBaseId}`, label: 'データセット' },
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
    </>
  )
}
