import { UserRole } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export type UserGetResponse =
  | {
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
  | {
      error: string
    }

export async function GET(req: NextRequest): Promise<NextResponse<UserGetResponse>> {
  try {
    const supabase = createClient()
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser()

    if (!supabaseUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: {
        supabaseId: supabaseUser.id,
      },
      include: {
        tenant: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: user.id,
      supabaseId: user.supabaseId,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
      tenant: user.tenant
        ? {
            id: user.tenant.id ?? '',
            name: user.tenant.name ?? '',
            createdAt: user.tenant.createdAt ?? new Date(),
            updatedAt: user.tenant.updatedAt ?? new Date(),
          }
        : null,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
