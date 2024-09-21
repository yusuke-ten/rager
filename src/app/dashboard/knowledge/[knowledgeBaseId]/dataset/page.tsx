import { Document } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { Dataset } from '@/components/dataset/dataset'

export async function getDocuments(knowledgeBaseId: string) {
  try {
    const documents = await prisma.document.findMany({
      where: {
        knowledgeBaseId: knowledgeBaseId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return documents
  } catch (error) {
    console.error('ドキュメントの取得に失敗しました:', error)
    throw error
  }
}

export default async function DatasetPage({
  params,
}: {
  params: { knowledgeBaseId: string }
}) {
  const documents: Document[] = await getDocuments(params.knowledgeBaseId)

  async function refreshDocuments() {
    'use server'
    revalidatePath(`/dashboard/knowledge/${params.knowledgeBaseId}/dataset`)
  }

  async function deleteDocument(documentId: string) {
    'use server'
    await prisma.$transaction(async (tx) => {
      // まず関連するセグメントを削除
      await tx.documentSegment.deleteMany({
        where: {
          documentId: documentId,
        },
      })
      // その後、ドキュメントを削除
      await tx.document.delete({
        where: {
          id: documentId,
        },
      })
    })
    revalidatePath(`/dashboard/knowledge/${params.knowledgeBaseId}/dataset`)
  }

  async function handleChangeDocumentEnabled(documentId: string, enabled: boolean) {
    'use server'
    await prisma.document.update({
      where: { id: documentId },
      data: { enabled: enabled },
    })
    revalidatePath(`/dashboard/knowledge/${params.knowledgeBaseId}/dataset`)
  }

  return (
    <Dataset
      documents={documents}
      knowledgeBaseId={params.knowledgeBaseId}
      refreshDocuments={refreshDocuments}
      deleteDocument={deleteDocument}
      handleChangeDocumentEnabled={handleChangeDocumentEnabled}
    />
  )
}
