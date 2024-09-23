import Link from 'next/link'
import Image from 'next/image'
import { useState, ReactNode, useEffect } from 'react'
import {
  Home,
  Search,
  Users2,
  Package,
  Package2,
  LineChart,
  PanelLeft,
  ChevronLeft,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

export const description =
  'An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.'

type Props = {
  children: ReactNode
}

const NavItem = ({
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
  if (isExpanded) {
    return (
      <Link
        href={href}
        className='flex h-9 items-center gap-2 pl-6 text-muted-foreground transition-colors hover:text-foreground md:h-9'
      >
        {icon}
        <span>{label}</span>
      </Link>
    )
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
        >
          {icon}
          <span className='sr-only'>{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right'>{label}</TooltipContent>
    </Tooltip>
  )
}

const expandedWidth = 'w-64'
const collapsedWidth = 'w-20'

const Hoge = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
}) => {
  const [width, setWidth] = useState(isExpanded ? expandedWidth : collapsedWidth)

  useEffect(() => {
    setWidth(isExpanded ? expandedWidth : collapsedWidth)
  }, [isExpanded])

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background transition-all duration-300 ease-in-out sm:flex',
        width,
      )}
    >
      <nav
        className={cn(
          'flex flex-col gap-4 px-2 sm:py-5',
          isExpanded ? 'item-start' : 'items-center',
        )}
      >
        <NavItem
          isExpanded={isExpanded}
          href='#'
          icon={<Home className='h-5 w-5' />}
          label='Dashboard'
        />
        <NavItem
          isExpanded={isExpanded}
          href='#'
          icon={<ShoppingCart className='h-5 w-5' />}
          label='Orders'
        />
        <NavItem
          isExpanded={isExpanded}
          href='#'
          icon={<Package className='h-5 w-5' />}
          label='Products'
        />
        <NavItem
          isExpanded={isExpanded}
          href='#'
          icon={<Users2 className='h-5 w-5' />}
          label='Customers'
        />
        <NavItem
          isExpanded={isExpanded}
          href='#'
          icon={<LineChart className='h-5 w-5' />}
          label='Analytics'
        />
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

export const Sidebar = ({ children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Hoge isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className={cn(
          'flex flex-col transition-all duration-300 ease-in-out sm:gap-4 sm:py-4',
          isExpanded ? 'sm:pl-64' : 'sm:pl-20',
        )}
      >
        <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <PanelLeft className='h-5 w-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
              <nav className='grid gap-6 text-lg font-medium'>
                <Link
                  href='#'
                  className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                >
                  <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                  <span className='sr-only'>Acme Inc</span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Home className='h-5 w-5' />
                  Dashboard
                </Link>
                <Link href='#' className='flex items-center gap-4 px-2.5 text-foreground'>
                  <ShoppingCart className='h-5 w-5' />
                  Orders
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Package className='h-5 w-5' />
                  Products
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Users2 className='h-5 w-5' />
                  Customers
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <LineChart className='h-5 w-5' />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='relative ml-auto flex-1 md:grow-0'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='overflow-hidden rounded-full'
              >
                <Image
                  src='/placeholder-user.jpg'
                  width={36}
                  height={36}
                  alt='Avatar'
                  className='overflow-hidden rounded-full'
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          {children}
        </main>
      </div>
    </div>
  )
}
