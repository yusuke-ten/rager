'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Header } from './header/header'

type Props = {
  children: ReactNode
  sidebarItems?: {
    href: string
    label: string
    icon: ReactNode
  }[]
  breadcrumbItems?: {
    href: string
    label: string
  }[]
}

export const DashboardLayout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <div className={cn('mt-[64px] flex h-[calc(100vh-64px)] flex-col')}>{children}</div>
    </div>
  )
}
