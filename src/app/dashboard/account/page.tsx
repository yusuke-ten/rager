import prisma from '@/lib/prisma'
import { Account } from '@/components/account'
import { createClient } from '@/lib/supabase/server'
import { ProfileForm, ProfileFormValues } from '@/components/account/profile-form'

export default async function AccountPage() {
  const handleSubmit = async (formData: ProfileFormValues) => {
    'use server'
    const supabase = createClient()
    const { data, error } = await supabase.auth.updateUser({
      email: formData.email,
      data: {
        display_name: formData.username,
      },
    })

    if (!error && data.user) {
      await prisma.user.update({
        where: {
          supabaseId: data.user.id,
        },
        data: {
          email: data.user.email,
          name: data.user.user_metadata.display_name,
        },
      })
    }
  }

  return (
    <Account>
      <ProfileForm handleSubmit={handleSubmit} />
    </Account>
  )
}
