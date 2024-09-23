import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type Props = {
  navItems: { href: string; icon: ReactNode; label: string }[]
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
}

export const NavItem = ({
  href,
  icon,
  label,
  isExpanded,
}: {
  href: string
  icon: ReactNode
  label: string
  isExpanded: boolean
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const activeClass = 'bg-accent text-accent-foreground font-bold'
  const baseClass = 'text-muted-foreground hover:text-foreground'

  if (isExpanded) {
    return (
      <Link
        href={href}
        className={cn(
          'flex h-9 items-center gap-2 pl-6 transition-colors md:h-9',
          isActive ? activeClass : baseClass,
        )}
      >
        {icon}
        <span
          className={cn(
            'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
            { 'w-auto': isExpanded, 'w-0': !isExpanded },
          )}
        >
          {label}
        </span>
      </Link>
    )
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
            isActive ? activeClass : baseClass
          }`}
        >
          {icon}
          <span className='sr-only'>{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right' className='z-50'>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export const Sidebar = ({ navItems, isExpanded, setIsExpanded }: Props) => {
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 top-[66px] z-10 hidden w-14 flex-col border-r bg-background transition-all duration-300 ease-in-out sm:flex',
        isExpanded ? 'w-64' : 'w-16',
      )}
    >
      <nav
        className={cn(
          'flex flex-col gap-4 px-2 sm:py-5',
          isExpanded ? 'item-start' : 'items-center',
        )}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            isExpanded={isExpanded}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>
      <Button
        variant='ghost'
        size='icon'
        className='absolute -right-4 bottom-5 h-8 w-8 rounded-full border bg-white'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronLeft className='h-4 w-4' />
        ) : (
          <ChevronRight className='h-4 w-4' />
        )}
      </Button>
    </aside>
  )
}
