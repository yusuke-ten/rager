'use client'

import { useRouter } from 'next/navigation'
import { Bot, Message, Conversation } from '@prisma/client'
import { useRef, useState, useEffect, useCallback } from 'react'

import { ChatList } from './chat-list'
import { ChatInput } from './chat-input'
import { ConversationList } from './conversation-list'

type ConversationWithMessages = Conversation & {
  messages: Message[]
}

type Props = {
  bot: Bot
  conversationList: ConversationWithMessages[]
  conversationId?: string
  handleCreateConversation: () => void
  handleDeleteConversation: (id: string) => void
  handleRenameConversation: (id: string, newName: string) => void
}

export const Chat = ({
  bot,
  conversationList,
  conversationId,
  handleCreateConversation,
  handleDeleteConversation,
  handleRenameConversation,
}: Props) => {
  const router = useRouter()

  const inputContainerRef = useRef<HTMLDivElement>(null)
  const chatListRef = useRef<HTMLDivElement>(null)
  const userScrolledRef = useRef(false)

  useEffect(() => {
    const updateScrollAreaHeight = () => {
      if (chatListRef.current && inputContainerRef.current) {
        const windowHeight = window.innerHeight
        const inputHeight = inputContainerRef.current.offsetHeight
        chatListRef.current.style.paddingBottom = `${inputHeight}px`
        chatListRef.current.style.height = `${windowHeight - inputHeight}px`
      }
    }

    const resizeObserver = new ResizeObserver(updateScrollAreaHeight)
    if (inputContainerRef.current) {
      resizeObserver.observe(inputContainerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const [messages, setMessages] = useState<
    {
      type: 'question' | 'answer'
      content: string
    }[]
  >(() => {
    if (conversationList.length > 0) {
      return conversationList[0].messages.map((message) => ({
        type: message.role === 'human' ? 'question' : 'answer',
        content: message.content,
      }))
    }
    return []
  })

  const handleScrollToBottom = useCallback(() => {
    if (chatListRef.current && !userScrolledRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    handleScrollToBottom()
  }, [handleScrollToBottom])

  useEffect(() => {
    const chatContainer = chatListRef.current
    if (chatContainer) {
      const setUserScrolled = () => {
        userScrolledRef.current =
          chatContainer.scrollHeight - chatContainer.scrollTop >=
          chatContainer.clientHeight + 300
      }
      chatContainer.addEventListener('scroll', setUserScrolled)
      return () => chatContainer.removeEventListener('scroll', setUserScrolled)
    }
  }, [])

  const handleSendMessage = async (query: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'question', content: query },
      { type: 'answer', content: '' },
    ])
    const response = await fetch(`/api/chat/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, conversationId, botId: bot.id }),
    })

    if (!response.ok || !response.body) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let accumulatedAnswer = ''

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value, { stream: true })

      const lines = chunk.split('\n\n')
      for (const line of lines) {
        console.log(line)
        if (line.startsWith('data: ')) {
          const jsonData = line.slice(6)
          const data = JSON.parse(jsonData)
          if (data.answer) {
            accumulatedAnswer += data.answer
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages]
              newMessages[newMessages.length - 1] = {
                type: 'answer',
                content: accumulatedAnswer,
              }
              return newMessages
            })
          }
        }
      }
    }
  }

  const handleChangeConversation = async (id: string) => {
    const newConversationId = id
    router.push(`/dashboard/bot/${bot.id}?conversationId=${newConversationId}`)
  }

  return (
    <div className='flex w-screen'>
      <ConversationList
        botName={bot.name}
        conversationList={conversationList}
        handleCreateConversation={handleCreateConversation}
        handleDeleteConversation={handleDeleteConversation}
        handleChangeConversation={handleChangeConversation}
        handleRenameConversation={handleRenameConversation}
      />
      <div className='border-l border-gray-300'></div>
      <div className='relative flex h-full w-full flex-col bg-white'>
        <ChatList ref={chatListRef} messages={messages} />
        <div
          ref={inputContainerRef}
          className='absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4'
        >
          <ChatInput handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}
