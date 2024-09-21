'use client'

import React, { forwardRef } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import { Answer } from '../answer'
import { Question } from '../question'

type Props = {
  messages: {
    type: 'question' | 'answer'
    content: string
  }[]
}

export const ChatList = forwardRef<HTMLDivElement, Props>(({ messages }, ref) => {
  return (
    <ScrollArea className='flex-grow p-4' ref={ref}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex ${message.type === 'answer' ? 'justify-start' : 'justify-end'}`}
        >
          {message.type === 'answer' && <Answer>{message.content}</Answer>}
          {message.type === 'question' && <Question message={message.content} />}
        </div>
      ))}
    </ScrollArea>
  )
})

ChatList.displayName = 'ChatList'
