'use client'

import { ReactNode } from 'react'

import { Separator } from '@/components/ui/separator'

import { Sidebar } from './sidebar/sidebar'

type Props = {
  children: ReactNode
}

export const Account = ({ children }: Props) => {
  return (
    <div className='hidden space-y-6 p-10 pb-16 md:block'>
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:w-1/5'>
          <Sidebar />
        </aside>
        <div className='hidden lg:block'>
          <Separator orientation='vertical' className='h-full' />
        </div>
        <div className='flex-1 lg:max-w-2xl'>{children}</div>
      </div>
    </div>
  )
}
