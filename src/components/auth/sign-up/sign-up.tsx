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
  signUp: (data: { email: string; username: string; password: string }) => Promise<void>
}

const signUpSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  username: z.string().min(3, 'ユーザー名は3文字以上で入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export const SignUp = ({ signUp }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })

  async function onSubmit(data: SignUpFormValues) {
    setIsLoading(true)

    try {
      await signUp(data)
    } catch (error) {
      toast({
        title: 'エラー',
        description: 'アカウント作成に失敗しました',
        variant: 'destructive',
      })
    }
    setIsLoading(false)
  }

  return (
    <>
      <div className='flex h-full items-center justify-center lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-8 px-6 sm:w-[350px] sm:px-0'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>アカウントを作成</h1>
            <p className='text-sm text-muted-foreground'>
              メールアドレスとパスワードを入力してください
            </p>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-8'>
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
                    <Label htmlFor='username'>ユーザー名</Label>
                    <Input
                      id='username'
                      placeholder='ユーザー名を入力'
                      type='text'
                      autoCapitalize='none'
                      autoCorrect='off'
                      disabled={isLoading}
                      {...register('username')}
                    />
                    {errors.username && (
                      <p className='text-sm text-red-500'>{errors.username.message}</p>
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
                  </div>
                </div>
                <Button disabled={isLoading}>
                  {isLoading && <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />}
                  アカウントを作成
                </Button>
              </div>
            </form>
          </div>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            サインアップすることで、あなたは当社の
            <Link
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              利用規約
            </Link>
            と
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              プライバシーポリシー
            </Link>
            に同意したことになります。
          </p>
        </div>
      </div>
      <Link
        href='/login'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        ログイン
      </Link>
    </>
  )
}
