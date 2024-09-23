import { redirect } from 'next/navigation'

import { Login } from '@/components/auth/login'
import { createClient } from '@/lib/supabase/server'

export default async function LoginPage() {
  const login = async (data: { email: string; password: string }) => {
    'use server'
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
      throw new Error(error.message)
    }
    redirect('/dashboard/knowledge')
  }

  return <Login login={login} />
}
