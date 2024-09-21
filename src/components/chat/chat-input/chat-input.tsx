import { Send, Paperclip } from 'lucide-react'
import { useRef, useState, useEffect, KeyboardEvent } from 'react'

import { Button } from '@/components/ui/button'

interface Props {
  initialValue?: string
  placeholder?: string
  disabled?: boolean
  handleSendMessage: (query: string) => void
}

export const ChatInput: React.FC<Props> = ({
  handleSendMessage,
  placeholder,
  initialValue,
  disabled = false,
}) => {
  const [query, setQuery] = useState(initialValue || '')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [query])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      handleSendMessage(query)
      setQuery('')
    }
  }

  return (
    <div className='flex items-center'>
      <Button size='icon' variant='ghost'>
        <Paperclip className='h-4 w-4' />
      </Button>
      <textarea
        ref={textareaRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Type your message...'}
        className='mx-2 flex-grow resize-none overflow-hidden rounded border border-gray-300 p-2 text-gray-700 focus:outline-none'
        rows={1}
        disabled={disabled}
      />
      <Button
        onClick={() => {
          handleSendMessage(query)
          setQuery('')
        }}
        disabled={disabled}
      >
        <Send className='h-4 w-4' />
      </Button>
    </div>
  )
}
