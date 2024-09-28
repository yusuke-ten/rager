import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'

import { Bot } from '@/types/bot'
import { Message } from '@/types/message'
import { useToast } from '@/hooks/use-toast'
import { Conversation } from '@/types/conversation'
import { RFC5646LanguageTag } from '@/lib/rfc5646-language-tags'
type UseChatProps = {
  bot: Bot
  conversations: Conversation[]
  messages: Message[]
  conversationId?: string
  handleCreateConversation: () => void
  handleDeleteConversation: (id: string) => void
  handleRenameConversation: (id: string, newName: string) => void
}

export const useChat = ({
  bot,
  conversations,
  messages,
  conversationId,
  handleCreateConversation,
  handleDeleteConversation,
  handleRenameConversation,
}: UseChatProps) => {
  const router = useRouter()
  const messageInputRef = useRef<HTMLDivElement>(null)
  const [messageInputRefHeight, setMessageInputRefHeight] = useState<number>(0)
  const [isMessageInputDisabled, setIsMessageInputDisabled] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState<RFC5646LanguageTag>('ja-JP')
  const chatListContainerRef = useRef<HTMLDivElement>(null)
  const chatListBottomRef = useRef<HTMLDivElement>(null)
  const userScrolledRef = useRef(false)
  const { toast } = useToast()

  const chatListScrollToBottom = () => {
    if (chatListBottomRef.current) {
      chatListBottomRef.current.scrollIntoView(false)
    }
  }

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

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (messageInputRef.current) {
        setMessageInputRefHeight(messageInputRef.current.clientHeight)
      }
    })
    if (messageInputRef.current) {
      resizeObserver.observe(messageInputRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    chatListScrollToBottom()
  }, [messageInputRefHeight])

  useEffect(() => {
    const chatContainer = chatListContainerRef.current
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
    try {
      setIsMessageInputDisabled(true)
      setLocalMessages((prevMessages) => [
        ...prevMessages,
        { type: 'question', content: query },
        { type: 'answer', content: '' },
      ])
      if (!userScrolledRef.current) {
        chatListScrollToBottom()
      }
      const response = await fetch(`/api/chat/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          conversationId,
          botId: bot.id,
          language: selectedLanguage,
        }),
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
              if (!userScrolledRef.current) {
                chatListScrollToBottom()
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('メッセージ送信中にエラーが発生しました:', error)
      toast({
        title: 'エラーが発生しました',
        description: 'メッセージの送信に失敗しました',
        variant: 'destructive',
      })
    } finally {
      setIsMessageInputDisabled(false)
    }
  }

  const handleChangeConversation = async (id: string) => {
    const newConversationId = id
    router.push(`/chat/${bot.id}?conversationId=${newConversationId}`)
  }

  const handleChangeLanguage = async (id: RFC5646LanguageTag) => {
    setSelectedLanguage(id)
  }

  return {
    messageInputRef,
    messageInputRefHeight,
    isMessageInputDisabled,
    selectedLanguage,
    chatListContainerRef,
    chatListBottomRef,
    localMessages,
    handleSendMessage,
    handleChangeConversation,
    handleChangeLanguage,
    userScrolledRef,
  }
}
