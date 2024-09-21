import { Suspense } from 'react'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { Knowledge } from '@/components/knowledge/knowledge'

const getKnowledge = async () => {
  return await prisma.knowledgeBase.findMany({
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
    <Suspense fallback={<div>読み込み中...</div>}>
      <Knowledge
        knowledgeBases={knowledgeBases}
        handleCreateKnowledge={handleCreateKnowledge}
        handleDeleteKnowledge={handleDeleteKnowledge}
      />
    </Suspense>
  )
}
