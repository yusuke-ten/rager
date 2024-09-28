'use client'

import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import { Answer } from '../answer'
import { Question } from '../question'

type Props = {
  messages: {
    type: 'question' | 'answer'
    content: string
  }[]
}

export const ChatList: React.FC<Props> = ({ messages }) => {
  return (
    <ScrollArea>
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
}

ChatList.displayName = 'ChatList'
