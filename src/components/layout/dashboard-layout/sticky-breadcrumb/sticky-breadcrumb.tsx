import React from 'react'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Props = {
  breadcrumbItems: {
    href: string
    label: string
  }[]
}

export const StickyBreadcrumb = ({ breadcrumbItems }: Props) => {
  return (
    <div className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
      <Breadcrumb className='hidden md:flex'>
        <BreadcrumbList>
          {breadcrumbItems.map((breadcrumbItem, index) => (
            <React.Fragment key={breadcrumbItem.href}>
              <BreadcrumbItem key={breadcrumbItem.href}>
                {breadcrumbItems.length !== index + 1 ? (
                  <BreadcrumbLink asChild>
                    <Link href={breadcrumbItem.href}>{breadcrumbItem.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <span className='font-semibold text-gray-900'>
                    {breadcrumbItem.label}
                  </span>
                )}
              </BreadcrumbItem>
              {breadcrumbItems.length !== index + 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
