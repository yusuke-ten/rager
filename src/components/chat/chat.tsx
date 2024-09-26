'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect, useCallback } from 'react'

import { Bot } from '@/types/bot'
import { Message } from '@/types/message'
import { Button } from '@/components/ui/button'
import { Conversation } from '@/types/conversation'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { ChatList } from './chat-list'
import { MessageInput } from './message-input'
import { LanguageSwitcher } from './language-switcher'
import { ConversationSwitcher } from './conversation-switcher'
type Props = {
  bot: Bot
  conversations: Conversation[]
  messages: Message[]
  conversationId?: string
  handleCreateConversation: () => void
  handleDeleteConversation: (id: string) => void
  handleRenameConversation: (id: string, newName: string) => void
  availableLanguages: {
    id: string
    label: string
  }[]
}

export const Chat = ({
  bot,
  conversations,
  messages,
  conversationId,
  handleCreateConversation,
  handleDeleteConversation,
  handleRenameConversation,
  availableLanguages,
}: Props) => {
  const router = useRouter()

  const messageInputRef = useRef<HTMLDivElement>(null)
  const [messageInputRefHeight, setMessageInputRefHeight] = useState<number>(0)
  const [isMessageInputDisabled, setIsMessageInputDisabled] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const chatListRef = useRef<HTMLDivElement>(null)
  const userScrolledRef = useRef(false)
  const [isVoiceInput, setIsVoiceInput] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (messageInputRef.current) {
        setMessageInputRefHeight(messageInputRef.current.clientHeight)
      }
    }

    const resizeObserver = new ResizeObserver(handleResize)
    if (messageInputRef.current) {
      resizeObserver.observe(messageInputRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [messageInputRef])

  const [localMessages, setLocalMessages] = useState<
    {
      type: 'question' | 'answer'
      content: string
    }[]
  >(() => {
    const initialMessages: { type: 'question' | 'answer'; content: string }[] = []
    if (bot.openStatement) {
      initialMessages.push({
        type: 'answer',
        content: bot.openStatement,
      })
    }
    initialMessages.push(
      ...messages.map((message) => ({
        type: message.role === 'human' ? ('question' as const) : ('answer' as const),
        content: message.content,
      })),
    )
    return initialMessages
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
    setIsMessageInputDisabled(true)
    setLocalMessages((prevMessages) => [
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
            setLocalMessages((prevMessages) => {
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
    setIsMessageInputDisabled(false)
  }

  const handleChangeConversation = async (id: string) => {
    const newConversationId = id
    router.push(`/chat/${bot.id}?conversationId=${newConversationId}`)
  }

  const handleChangeLanguage = async (id: string) => {
    setSelectedLanguage(id)
  }

  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='fixed left-0 top-0 z-10 w-full border-b bg-white'>
        <div className='flex h-16 items-center justify-between px-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-64 max-w-96'>
              <ConversationSwitcher
                conversations={[
                  ...conversations.map((conversation) => ({
                    id: conversation.id,
                    label: conversation.name,
                  })),
                ]}
                selectedConversation={conversationId ?? ''}
                setSelectedConversation={handleChangeConversation}
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Trash2 className='h-4 w-4' />
                  <span className='sr-only'>この会話履歴を削除</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>この会話履歴を削除</TooltipContent>
            </Tooltip>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='w-40'>
              <LanguageSwitcher
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={handleChangeLanguage}
                languageList={availableLanguages}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='relative mt-[64px] flex flex-1 flex-col overflow-y-hidden p-2 sm:p-8'>
        {messages.length === 0 ? (
          <div className='flex h-full items-center justify-center'>
            <p className='text-muted-foreground'>メッセージを入力してください</p>
          </div>
        ) : (
          <div
            className='overflow-y-scroll bg-white p-4'
            style={{
              marginBottom: messageInputRefHeight
                ? `${messageInputRefHeight + 20}px`
                : undefined,
            }}
          >
            <ChatList messages={localMessages} />
          </div>
        )}
        <div ref={messageInputRef} className='absolute bottom-0 left-0 right-0 m-8'>
          <MessageInput
            onSubmit={handleSendMessage}
            isDisabled={isMessageInputDisabled}
          />
        </div>
      </div>
    </div>
  )
}
