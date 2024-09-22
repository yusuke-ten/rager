import { UserRole } from '@prisma/client'

export type User = {
  id: string
  supabaseId: string
  name: string | null
  email: string
  avatarUrl: string | null
  role: UserRole
  tenant: {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
  } | null
}
