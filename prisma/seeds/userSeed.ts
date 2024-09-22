import { Tenant, UserRole } from '@prisma/client'

import prisma from '../../src/lib/prisma'
import { supabaseAdmin } from '../../src/lib/supabase/admin'

export const userSeed = async (tenant: Tenant) => {
  const { data: supabaseUsers, error } = await supabaseAdmin.auth.admin.listUsers()
  if (error) {
    console.error('Supabaseからユーザーを取得できませんでした:', error)
    return
  }

  for (const user of supabaseUsers.users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        supabaseId: user.id,
        email: user.email,
        name: user.user_metadata.display_name || null,
        role: UserRole.ADMIN,
        tenantId: tenant.id,
      },
      create: {
        supabaseId: user.id,
        email: user.email || '',
        name: user.user_metadata.display_name || null,
        role: UserRole.ADMIN,
        tenantId: tenant.id,
      },
    })
  }
}
