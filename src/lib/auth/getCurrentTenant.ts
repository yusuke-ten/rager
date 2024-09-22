import prisma from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export const getCurrentTenant = async () => {
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    throw new Error('ユーザーが見つかりません')
  }
  const tenant = await prisma.tenant.findFirst({
    where: {
      users: {
        some: {
          supabaseId: user.id,
        },
      },
    },
  })

  if (!tenant) {
    throw new Error('テナントが見つかりません')
  }
  return tenant
}
