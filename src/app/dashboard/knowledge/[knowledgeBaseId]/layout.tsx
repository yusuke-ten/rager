'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Pencil, FileText, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { knowledgeBaseId } = useParams()
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  const navItems = [
    { href: 'dataset', label: 'データセット', Icon: FileText },
    { href: 'retrieval-testing', label: '検索テスト', Icon: RefreshCw },
    { href: 'configuration', label: '設定', Icon: Pencil },
  ]

  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='w-64 bg-white p-4 shadow-md'>
        <nav>
          {navItems.map(({ href, label, Icon }) => {
            const fullPath = `/dashboard/knowledge/${knowledgeBaseId}/${href}`
            return (
              <Link key={href} href={fullPath} passHref>
                <Button
                  variant={isActive(fullPath) ? 'default' : 'ghost'}
                  className='mb-2 w-full justify-start'
                >
                  <Icon className='mr-2 h-4 w-4' />
                  {label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className='flex-1 p-8'>{children}</div>
    </div>
  )
}
