'use client'

import { useState } from 'react'
import { Conversation } from '@prisma/client'
import { Plus, MoreVertical } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  botName: string
  conversationList: Conversation[]
  handleCreateConversation: () => void
  handleDeleteConversation: (id: string) => void
  handleChangeConversation: (id: string) => void
  handleRenameConversation: (id: string, newName: string) => void
}

export const ConversationList = ({
  botName,
  conversationList,
  handleCreateConversation,
  handleDeleteConversation,
  handleChangeConversation,
  handleRenameConversation,
}: Props) => {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    null,
  )
  const [newName, setNewName] = useState('')

  return (
    <>
      <div className='flex w-96 flex-col bg-white p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <h1 className='mr-2 text-xl font-semibold'>{botName}</h1>
            <span className='rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700'>
              {conversationList.length}
            </span>
          </div>
          <Button variant='ghost' size='icon' onClick={() => handleCreateConversation()}>
            <Plus className='h-4 w-4' />
          </Button>
        </div>
        <Separator className='my-4' />
        <ScrollArea className='h-[400px]'>
          {conversationList.map((conversation) => (
            <Card
              key={conversation.id}
              className='mb-2 cursor-pointer'
              onClick={() => handleChangeConversation(conversation.id)}
            >
              <CardContent className={`flex items-center justify-between p-2`}>
                <p
                  className={`cursor-pointer text-sm`}
                  onClick={() => handleChangeConversation(conversation.id)}
                >
                  {conversation.name}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedConversationId(conversation.id)
                        setNewName(conversation.name)
                        setIsRenameDialogOpen(true)
                      }}
                    >
                      名前を変更
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteConversation(conversation.id)}
                    >
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>会話の名前を変更</DialogTitle>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder='新しい名前を入力してください'
            autoComplete='off'
          />
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                setIsRenameDialogOpen(false)
                setNewName('')
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => {
                if (selectedConversationId) {
                  handleRenameConversation(selectedConversationId, newName)
                  setNewName('')
                  setIsRenameDialogOpen(false)
                }
              }}
            >
              変更
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
