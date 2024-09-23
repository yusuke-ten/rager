'use client'
import { useRef, useState, useEffect } from 'react'

import { ChatList } from '@/components/chat/chat-list'
import { Setting } from '@/components/bot/playground/setting'
import { MessageInput } from '@/components/bot/playground/message-input'

export const description =
  'サイドバーのナビゲーションとメインコンテンツエリアを持つAIプレイグラウンド。プレイグラウンドには、設定ドロワーと共有ボタンを持つヘッダーがあります。サイドバーにはナビゲーションリンクとユーザーメニューがあります。メインコンテンツエリアには、モデルとメッセージを設定するためのフォームが表示されます。'

type Props = {
  botId: string
}

export function Playground({ botId }: Props) {
  const [messages, setMessages] = useState<
    { type: 'question' | 'answer'; content: string }[]
  >([])
  const [isMessageInputDisabled, setIsMessageInputDisabled] = useState(false)
  const messageInputRef = useRef<HTMLDivElement>(null)
  const [messageInputRefHeight, setMessageInputRefHeight] = useState<number | undefined>(
    undefined,
  )
  const [systemPrompt, setSystemPrompt] = useState<string>(`
Answer the user's question based on the following context:
{context}

User's question: {input}

Please provide a detailed and accurate answer.
    `)
  const [temperature, setTemperature] = useState<number>(0.7)
  const [maxLength, setMaxLength] = useState<number>(512)
  const [topP, setTopP] = useState<number>(0.85)
  const [topK, setTopK] = useState<number>(5)

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

  const handleSendMessage = async (query: string) => {
    setIsMessageInputDisabled(true)
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'question', content: query },
      { type: 'answer', content: '' },
    ])
    const response = await fetch(`/api/bot/playground/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        botId,
        systemPrompt,
        temperature,
        maxLength,
        topP,
        topK,
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

          console.log(data)
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
    setIsMessageInputDisabled(false)
  }

  return (
    <div className='grid h-full flex-1 gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-3'>
      <Setting
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
        temperature={temperature}
        setTemperature={setTemperature}
        maxLength={maxLength}
        setMaxLength={setMaxLength}
        topP={topP}
        setTopP={setTopP}
        topK={topK}
        setTopK={setTopK}
      />
      <div className='relative flex h-full min-h-[50vh] flex-col overflow-y-hidden rounded-xl p-4 lg:col-span-2'>
        {messages.length === 0 ? (
          <div className='flex h-full items-center justify-center'>
            <p className='text-muted-foreground'>メッセージを入力してください</p>
          </div>
        ) : (
          <div
            className='overflow-y-auto bg-white p-4'
            style={{
              marginBottom: messageInputRefHeight
                ? `${messageInputRefHeight + 20}px`
                : undefined,
            }}
          >
            <ChatList messages={messages} />
          </div>
        )}
        <div ref={messageInputRef} className='absolute bottom-0 left-0 right-0 m-4'>
          <MessageInput
            onSubmit={handleSendMessage}
            isDisabled={isMessageInputDisabled}
          />
        </div>
      </div>
    </div>
  )
}
