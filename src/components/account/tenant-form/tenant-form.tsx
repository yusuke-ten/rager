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
  handleSubmit: (data: TenantFormValues) => Promise<void>
}

const tenantFormSchema = z.object({
  tenantName: z
    .string()
    .min(2, {
      message: 'ユーザー名は2文字以上である必要があります。',
    })
    .max(30, {
      message: 'ユーザー名は30文字以下である必要があります。',
    }),
  tenantId: z.string(),
})

export type TenantFormValues = z.infer<typeof tenantFormSchema>

export const TenantForm = ({ handleSubmit }: Props) => {
  const { user } = useAuth()

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      tenantName: '',
      tenantId: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        tenantName: user.tenant?.name || '',
        tenantId: user.tenant?.id || '',
      })
    }
  }, [user, form])

  async function onSubmit(data: TenantFormValues) {
    try {
      await handleSubmit(data)
      toast({
        title: 'テナントの更新が完了しました',
      })
    } catch (error) {
      toast({
        title: 'エラーが発生しました。',
        description:
          error instanceof Error ? error.message : '不明なエラーが発生しました。',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>テナント</h3>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='tenantName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>テナント名</FormLabel>
                <FormControl>
                  <Input placeholder='テナント名' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>テナントを更新</Button>
        </form>
      </Form>
    </div>
  )
}
