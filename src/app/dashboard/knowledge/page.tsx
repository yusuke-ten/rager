import { Suspense } from 'react'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { Knowledge } from '@/components/knowledge/knowledge'
import { getCurrentTenant } from '@/lib/auth/getCurrentTenant'

const getKnowledge = async () => {
  const tenant = await getCurrentTenant()
  if (!tenant) {
    throw new Error('tenant not found')
  }
  return await prisma.knowledgeBase.findMany({
    where: {
      tenantId: tenant.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function KnowledgePage() {
  const knowledgeBases = await getKnowledge()

  const handleCreateKnowledge = async (knowledgeName: string) => {
    'use server'
    await prisma.knowledgeBase.create({
      data: {
        name: knowledgeName,
        description: '',
      },
    })
    revalidatePath('/dashboard/knowledge')
  }

  const handleDeleteKnowledge = async (knowledgeBaseId: string) => {
    'use server'
    await prisma.knowledgeBase.delete({
      where: {
        id: knowledgeBaseId,
      },
    })
    revalidatePath('/dashboard/knowledge')
  }
  return (
    <main className='flex-1 overflow-y-auto overflow-x-hidden'>
      <Suspense fallback={<div>読み込み中...</div>}>
        <Knowledge
          knowledgeBases={knowledgeBases}
          handleCreateKnowledge={handleCreateKnowledge}
          handleDeleteKnowledge={handleDeleteKnowledge}
        />
      </Suspense>
    </main>
  )
}
