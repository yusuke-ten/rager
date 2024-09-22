import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'
import { SignUp } from '@/components/auth/sign-up'
import { createClient } from '@/lib/supabase/server'

export default async function SignUpPage() {
  const signUp = async (data: { email: string; username: string; password: string }) => {
    'use server'
    const supabase = createClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          display_name: data.username,
        },
      },
    })
    if (error) {
      throw new Error(error.message)
    }
    if (!user) {
      throw new Error('User not found')
    }
    const tenant = await prisma.tenant.create({
      data: {
        name: data.username,
      },
    })
    await prisma.user.create({
      data: {
        supabaseId: user.id,
        email: data.email,
        role: UserRole.ADMIN,
        tenantId: tenant.id,
      },
    })
    redirect('/login')
  }

  return <SignUp signUp={signUp} />
}
