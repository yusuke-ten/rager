import { revalidatePath } from 'next/cache'
import {
  Document as DocumentType,
  DocumentSegment as DocumentSegmentType,
} from '@prisma/client'

import prisma from '@/lib/prisma'
import { Document } from '@/components/document/document'
import { checkKnowledgeBaseAccess } from '@/lib/auth/checkKnowledgeBaseAccess'

const getDocument = async (knowledgeBaseId: string, documentId: string) => {
  const document = await prisma.document.findUnique({
    where: {
      id: documentId,
      knowledgeBaseId: knowledgeBaseId,
    },
  })
  return document
}

const getDocumentSegments = async (knowledgeBaseId: string, documentId: string) => {
  const documentSegments = await prisma.documentSegment.findMany({
    where: {
      documentId: documentId,
    },
    orderBy: {
      position: 'asc',
    },
  })
  return documentSegments
}

export default async function DocumentPage({
  params,
}: {
  params: { knowledgeBaseId: string; documentId: string }
}) {
  if (!(await checkKnowledgeBaseAccess(params.knowledgeBaseId))) {
    return <div>Knowledge base not found</div>
  }
  const { knowledgeBaseId, documentId } = params
  const document: DocumentType | null = await getDocument(knowledgeBaseId, documentId)
  const documentSegments: DocumentSegmentType[] = await getDocumentSegments(
    knowledgeBaseId,
    documentId,
  )

  if (!document) {
    return <div>Document not found</div>
  }

  const handleChangeDocumentSegmentEnabled = async (
    segmentId: string,
    enabled: boolean,
  ) => {
    'use server'
    await prisma.documentSegment.update({
      where: {
        id: segmentId,
      },
      data: {
        enabled: enabled,
      },
    })
    revalidatePath(`/dashboard/knowledge/${knowledgeBaseId}/dataset/${documentId}`)
  }

  return (
    <Document
      document={document}
      documentSegments={documentSegments}
      handleChangeDocumentSegmentEnabled={handleChangeDocumentSegmentEnabled}
    />
  )
}
