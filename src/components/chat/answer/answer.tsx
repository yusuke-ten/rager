import { ReactNode } from 'react'

import { Markdown } from '@/components/markdown/markdown'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  children: ReactNode
}

export const Answer = ({ children }: Props) => {
  return (
    <div className='flex items-start space-x-4'>
      <Avatar className='hidden h-10 w-10 sm:block'>
        <AvatarImage src='/placeholder-avatar.jpg' alt='AI Assistant' />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div className='flex-1 space-y-4'>
        <Markdown>{String(children)}</Markdown>
      </div>
    </div>
  )
}
