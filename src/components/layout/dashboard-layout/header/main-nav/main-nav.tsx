'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, Database, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard/knowledge', label: 'ナレッジベース', Icon: Database },
  { href: '/dashboard/bot', label: 'ボット', Icon: Bot },
  { href: '/examples/dashboard', label: '設定', Icon: Settings },
]

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <nav className={cn('flex items-center space-x-1', className)} {...props}>
      {navItems.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center rounded-md px-3 py-2 text-sm font-medium',
            isActive(href) ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-100',
          )}
        >
          <Icon className='mr-2 h-5 w-5' />
          {label}
        </Link>
      ))}
    </nav>
  )
}
