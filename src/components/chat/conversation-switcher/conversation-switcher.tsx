import { PlusIcon, BotMessageSquareIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'

type Props = {
  selectedConversation: string
  setSelectedConversation: (id: string) => void
  conversations: {
    id: string
    label: string
  }[]
}

export const ConversationSwitcher = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
}: Props) => {
  return (
    <Select defaultValue={selectedConversation} onValueChange={setSelectedConversation}>
      <SelectTrigger
        className={cn(
          'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
        )}
        aria-label='Select account'
      >
        <SelectValue placeholder='選択してください'>
          {selectedConversation === 'new' ? (
            <PlusIcon className='h-4 w-4' />
          ) : (
            <BotMessageSquareIcon className='h-4 w-4' />
          )}
          <span className={cn('ml-2')}>
            {selectedConversation === 'new'
              ? '新しい会話'
              : conversations.find(
                  (conversation) => conversation.id === selectedConversation,
                )?.label}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'new'}>
          <div className='flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>
            <PlusIcon className='h-4 w-4' />
            <span>新しい会話</span>
          </div>
        </SelectItem>
        {conversations.map((conversation) => (
          <SelectItem key={conversation.id} value={conversation.id}>
            <div className='flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>
              <BotMessageSquareIcon className='h-4 w-4' />
              <span>{conversation.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
