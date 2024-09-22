'use client'

import { z } from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

type Props = {
  handleSubmit: (data: ProfileFormValues) => void
}

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'ユーザー名は2文字以上である必要があります。',
    })
    .max(30, {
      message: 'ユーザー名は30文字以下である必要があります。',
    }),
  email: z
    .string({
      required_error: '表示するメールアドレスを選択してください。',
    })
    .email(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export const ProfileForm = ({ handleSubmit }: Props) => {
  const { user } = useAuth()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.name || '',
        email: user.email || '',
      })
    }
  }, [user, form])

  function onSubmit(data: ProfileFormValues) {
    try {
      handleSubmit(data)
      toast({
        title: '以下の値を送信しました：',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } catch (error) {
      toast({
        title: 'エラーが発生しました。',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>プロフィール</h3>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ユーザー名</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder={user?.email} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>プロフィールを更新</Button>
        </form>
      </Form>
    </div>
  )
}
