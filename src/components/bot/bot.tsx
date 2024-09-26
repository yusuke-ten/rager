'use client'
import * as z from 'zod'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Trash2, BotIcon, MoreHorizontal } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { formSchema, CreateBotDialog } from './create-bot-dialog/create-bot-dialog'

type Props = {
  bots: {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
  }[]
  handleCreateBot: (botName: string) => Promise<void>
  handleDeleteBot: (botId: string) => Promise<void>
}

export const Bot = ({ bots, handleCreateBot, handleDeleteBot }: Props) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleCreateBot(values.botName)
      toast({
        title: 'ボットが作成されました',
        description: `作成されたボット: ${values.botName}`,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
      })
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <header className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='text-2xl font-bold'>ボット一覧</h1>
        <div className='flex w-full flex-col gap-4 sm:w-auto sm:flex-row'>
          <Input className='w-full sm:w-64' type='search' placeholder='ボットを検索' />
          <Button className='w-full sm:w-auto' onClick={() => setOpen(true)}>
            <span className='mr-2'>+</span> ボットを作成
          </Button>
        </div>
      </header>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        {bots.map((bot) => (
          <Link
            href={`/dashboard/bot/${bot.id}/playground`}
            key={bot.id}
            className='w-full'
          >
            <Card className='w-full transition-shadow hover:shadow-md'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='flex items-center text-sm font-medium'>
                  <BotIcon className='mr-2 h-6 w-6' />
                  {bot.name}
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-12'>
                <div className='mt-4 flex items-center justify-between space-x-2 text-sm text-muted-foreground'>
                  <Button
                    className=''
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(`/chat/${bot.id}`, '_blank')
                    }}
                  >
                    <Play className='mr-2 h-4 w-4' />
                    ボットを実行
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDeleteBot(bot.id)
                        }}
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        <span>削除</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>ボットを作成</DialogTitle>
          </DialogHeader>
          <CreateBotDialog
            knowledgeBases={[{ id: '1', name: 'テスト' }]}
            handleCreateBot={(data) => onSubmit(data)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
