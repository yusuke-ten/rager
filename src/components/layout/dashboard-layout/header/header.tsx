import { MainNav } from './main-nav'
import { UserNav } from './user-nav'

const Header = () => {
  return (
    <div className='fixed left-0 top-0 z-10 w-full border-b bg-white'>
      <div className='flex h-16 items-center justify-between px-4'>
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
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
