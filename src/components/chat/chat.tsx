'use client'

import { Trash2 } from 'lucide-react'

import { Bot } from '@/types/bot'
import { Message } from '@/types/message'
import { useChat } from '@/hooks/use-chat'
import { Button } from '@/components/ui/button'
import { Conversation } from '@/types/conversation'
import { RFC5646LanguageTag } from '@/lib/rfc5646-language-tags'
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
    id: RFC5646LanguageTag
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
  const {
    messageInputRef,
    messageInputRefHeight,
    isMessageInputDisabled,
    selectedLanguage,
    localMessages,
    handleSendMessage,
    handleChangeConversation,
    handleChangeLanguage,
    chatListContainerRef,
    chatListBottomRef,
    userScrolledRef,
  } = useChat({
    bot,
    conversations,
    messages,
    conversationId,
    handleCreateConversation,
    handleDeleteConversation,
    handleRenameConversation,
  })

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
              {userScrolledRef.current && <div>scrolled</div>}
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
          <>
            <div className='overflow-y-scroll bg-white' ref={chatListContainerRef}>
              <div
                className='p-4'
                style={{
                  marginBottom: messageInputRefHeight
                    ? `${messageInputRefHeight + 20}px`
                    : undefined,
                }}
              >
                <ChatList messages={localMessages} />
              </div>
              <div ref={chatListBottomRef} />
            </div>
          </>
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
