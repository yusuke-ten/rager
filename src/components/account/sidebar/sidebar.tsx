import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const sidebarItems = [
  {
    title: 'プロフィール',
    href: '/dashboard/account',
  },
  {
    title: 'テナント',
    href: '/dashboard/account/tenant',
  },
  {
    title: 'パスワード',
    href: '/dashboard/account/password',
  },
  {
    title: 'モデル設定',
    href: '/dashboard/account/model',
  },
  {
    title: 'チーム',
    href: '/dashboard/account/team',
  },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1')}>
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
