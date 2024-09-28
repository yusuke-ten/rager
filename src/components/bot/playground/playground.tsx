'use client'
import { useRef, useState, useEffect } from 'react'

import { ChatList } from '@/components/chat/chat-list'
import { Card, CardContent } from '@/components/ui/card'
import { Setting } from '@/components/bot/playground/setting'
import { MessageInput } from '@/components/chat/message-input'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'

type Bot = {
  id: string
  name: string
  description: string | null
  emptyResponse: string | null
  openStatement: string | null
  showQuote: boolean
  systemPrompt: string
  similarityThreshold: number
  keywordSimilarityWeight: number
  temperature: number
  topP: number
  presencePenalty: number
  frequencyPenalty: number
  maxTokens: number
}

type Props = {
  bot: Bot
}

type Context = {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any>
  pageContent: string
}

export function Playground({ bot }: Props) {
  const [messages, setMessages] = useState<
    { type: 'question' | 'answer'; content: string }[]
  >([])
  const [context, setContext] = useState<Context[]>([])
  const [isMessageInputDisabled, setIsMessageInputDisabled] = useState(false)

  const messageInputRef = useRef<HTMLDivElement>(null)
  const [messageInputRefHeight, setMessageInputRefHeight] = useState<number | undefined>(
    undefined,
  )

  const [systemPrompt, setSystemPrompt] = useState<string>(bot.systemPrompt)
  const [temperature, setTemperature] = useState<number>(0.7)
  const [maxTokens, setMaxTokens] = useState<number>(512)
  const [topP, setTopP] = useState<number>(0.85)
  const [topK, setTopK] = useState<number>(5)
  const [presencePenalty, setPresencePenalty] = useState<number>(0.5)
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0.5)
  const [emptyResponse, setEmptyResponse] = useState<string>(bot.emptyResponse || '')
  const [keywordSimilarityWeight, setKeywordSimilarityWeight] = useState<number>(0.5)
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(
    bot.similarityThreshold,
  )
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ja')
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
        botId: bot.id,
        systemPrompt,
        temperature,
        maxTokens,
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
        if (line.startsWith('data: ')) {
          const jsonData = line.slice(6)
          const data = JSON.parse(jsonData)

          if (data.context) {
            setContext(data.context)
          }

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
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        topP={topP}
        setTopP={setTopP}
        topK={topK}
        setTopK={setTopK}
        presencePenalty={presencePenalty}
        setPresencePenalty={setPresencePenalty}
        frequencyPenalty={frequencyPenalty}
        setFrequencyPenalty={setFrequencyPenalty}
        emptyResponse={emptyResponse}
        setEmptyResponse={setEmptyResponse}
        keywordSimilarityWeight={keywordSimilarityWeight}
        setKeywordSimilarityWeight={setKeywordSimilarityWeight}
        similarityThreshold={similarityThreshold}
        setSimilarityThreshold={setSimilarityThreshold}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <div className='relative flex h-full min-h-[50vh] flex-col overflow-y-hidden rounded-xl p-4 pt-0 lg:col-span-2'>
        <Tabs defaultValue='chat' className='w-full flex-1'>
          <div className='flex justify-center border-b pb-3'>
            <TabsList>
              <TabsTrigger value='chat'>Chat</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='chat'>
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
          </TabsContent>
          <TabsContent value='analytics'>
            <div>
              {context.map((ctx, index) => (
                <Card key={ctx.id} className='group relative'>
                  {/* <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <Badge
                      variant='outline'
                      className='rounded-full px-2 py-0.5 text-xs font-normal'
                    >
                      {segment.position}
                    </Badge>
                    {segment.enabled ? (
                      <div className='h-2 w-2 rounded-full bg-green-500' />
                    ) : (
                      <div className='h-2 w-2 rounded-full bg-red-500' />
                    )}
                  </CardHeader> */}
                  <CardContent>
                    <p className='line-clamp-5 text-sm text-gray-600'>
                      {ctx.pageContent}
                    </p>
                  </CardContent>
                  {/* <div className='absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <div className='flex items-center space-x-1'>
                          <Type className='h-4 w-4 text-gray-500' />
                          <span className='text-sm text-gray-600'>
                            {segment.wordCount}
                          </span>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <AtSign className='h-4 w-4 text-gray-500' />
                          <span className='text-sm text-gray-600'>{0}</span>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch
                          checked={segment.enabled}
                          onCheckedChange={() => {
                            handleChangeDocumentSegmentEnabled(
                              segment.id,
                              !segment.enabled,
                            )
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        />
                        <Copy className='h-4 w-4 cursor-pointer text-gray-500' />
                      </div>
                    </div>
                  </div> */}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
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
