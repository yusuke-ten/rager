import { Logo } from '@/components/logo'

import { MainNav } from './main-nav'
import { UserNav } from './user-nav'

const Header = () => {
  return (
    <div className='fixed left-0 top-0 z-10 w-full border-b bg-white'>
      <div className='flex h-16 items-center justify-between px-4'>
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <div className='mr-2'>
            <Logo className='h-6 w-6' />
          </div>
          RAGER
        </div>
        <MainNav className='mx-6' />
        <div className='lex items-center space-x-4'>
          <UserNav />
        </div>
      </div>
    </div>
  )
}

Header.displayName = 'Header'

export { Header }
