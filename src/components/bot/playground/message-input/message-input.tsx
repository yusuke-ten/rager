import { useState } from 'react'
import { Mic, Paperclip, CornerDownLeft } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type Props = {
  onSubmit: (query: string) => void
  isDisabled: boolean
}

export const MessageInput = ({ onSubmit, isDisabled }: Props) => {
  const [query, setQuery] = useState('このPDFは何？')

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto'
    e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 200)}px`
    setQuery(e.currentTarget.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      onSubmit(query)
      setQuery('')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(query)
    setQuery('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'
    >
      <Label htmlFor='message' className='sr-only'>
        メッセージ
      </Label>
      <Textarea
        disabled={isDisabled}
        id='message'
        value={query}
        placeholder='ここにメッセージを入力...'
        className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
        style={{ maxHeight: '200px' }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <div className='flex items-center p-3 pt-0'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' disabled={isDisabled}>
              <Paperclip className='size-4' />
              <span className='sr-only'>Attach file</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top'>ファイルを添付</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' disabled={isDisabled}>
              <Mic className='size-4' />
              <span className='sr-only'>Use Microphone</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top'>マイクを使用</TooltipContent>
        </Tooltip>
        <Button
          type='submit'
          disabled={!query || isDisabled}
          size='sm'
          className='ml-auto gap-1.5'
        >
          メッセージを送信
          <CornerDownLeft className='size-3.5' />
        </Button>
      </div>
    </form>
  )
}
