'use client'
import * as z from 'zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2, FileIcon, MoreHorizontal } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog'
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  knowledgeBases: {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
  }[]
  handleCreateKnowledge: (knowledgeName: string) => Promise<void>
  handleDeleteKnowledge: (knowledgeBaseId: string) => Promise<void>
}

const formSchema = z.object({
  knowledgeName: z
    .string()
    .min(1, {
      message: '名前は必須です',
    })
    .max(255, {
      message: '名前は255文字以内です',
    }),
})

const Knowledge = ({
  knowledgeBases,
  handleCreateKnowledge,
  handleDeleteKnowledge,
}: Props) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knowledgeName: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleCreateKnowledge(values.knowledgeName)
      toast({
        title: 'ナレッジが作成されました',
        description: `作成されたナレッジ: ${values.knowledgeName}`,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
      })
    } finally {
      setOpen(false)
      form.reset()
    }
  }

  return (
    <>
      <div className='container mx-auto p-6'>
        <header className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex w-full flex-col gap-4 sm:w-auto sm:flex-row'>
            <Input className='w-full sm:w-64' type='search' placeholder='Search' />
            <Button className='w-full sm:w-auto' onClick={() => setOpen(true)}>
              <span className='mr-2'>+</span> ナレッジを作成
            </Button>
          </div>
        </header>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
          {knowledgeBases.map((kb) => (
            <Link
              href={`/dashboard/knowledge/${kb.id}/dataset`}
              key={kb.id}
              className='w-full'
            >
              <Card className='w-full transition-shadow hover:shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>{kb.name}</CardTitle>
                </CardHeader>
                <CardContent className='pt-12'>
                  <div className='mt-4 flex items-center justify-between space-x-2 text-sm text-muted-foreground'>
                    <div>
                      <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                        <FileIcon className='h-4 w-4' />
                      </div>
                      <div className='mt-2 text-xs text-muted-foreground'>
                        {kb.createdAt.toDateString()}
                      </div>
                    </div>
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
                            handleDeleteKnowledge(kb.id)
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
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>ナレッジを作成</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='knowledgeName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name<span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Please input name!' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    setOpen(false)
                    form.reset()
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit'>OK</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

Knowledge.displayName = 'Knowledge'

export { Knowledge }
