'use client'

import * as z from 'zod'
import Link from 'next/link'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { LoaderCircle } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'

type Props = {
  login: (data: { email: string; password: string }) => Promise<void>
}

const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const Login = ({ login }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      await login(data)
    } catch (error) {
      toast({
        title: 'エラー',
        description: 'ログインに失敗しました',
        variant: 'destructive',
      })
    }
    setIsLoading(false)
  }

  return (
    <div className='container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/signup'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        サインアップ
      </Link>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          RAGER
        </div>
      </div>
      <div className='flex h-full items-center justify-center lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>ログイン</h1>
            <p className='text-sm text-muted-foreground'>
              メールアドレスとパスワードを入力してください
            </p>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>メールアドレス</Label>
                  <Input
                    id='email'
                    placeholder='name@example.com'
                    type='email'
                    autoCapitalize='none'
                    autoComplete='email'
                    autoCorrect='off'
                    disabled={isLoading}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className='text-sm text-red-500'>{errors.email.message}</p>
                  )}
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>パスワード</Label>
                  <Input
                    id='password'
                    placeholder='パスワードを入力'
                    type='password'
                    autoCapitalize='none'
                    autoComplete='password'
                    autoCorrect='off'
                    disabled={isLoading}
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className='text-sm text-red-500'>{errors.password.message}</p>
                  )}
                  <div className='text-right'>
                    <Link
                      href='/forgot-password'
                      className='text-sm text-muted-foreground hover:text-primary'
                    >
                      パスワードをお忘れですか？
                    </Link>
                  </div>
                </div>
                <Button disabled={isLoading}>
                  {isLoading && <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />}
                  ログイン
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
