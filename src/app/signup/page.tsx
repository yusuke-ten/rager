import { redirect } from 'next/navigation'

import { SignUp } from '@/components/auth/sign-up'
import { createClient } from '@/lib/supabase/server'
export default async function SignUpPage() {
  const signUp = async (data: { email: string; password: string }) => {
    'use server'
    const supabase = createClient()

    const { error } = await supabase.auth.signUp(data)
    if (error) {
      throw new Error(error.message)
    }
    redirect('/login')
  }

  return <SignUp signUp={signUp} />
}
