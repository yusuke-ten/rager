import prisma from '@/lib/prisma'
import { getCurrentTenant } from '@/lib/auth/getCurrentTenant'

export const checkKnowledgeBaseAccess = async (
  knowledgeBaseId: string,
): Promise<boolean> => {
  const tenant = await getCurrentTenant()
  if (!tenant) {
    throw new Error('tenant not found')
  }
  const knowledgeBase = await prisma.knowledgeBase.findUnique({
    where: { id: knowledgeBaseId, tenantId: tenant.id },
  })
  if (!knowledgeBase) {
    throw new Error('knowledge base not found')
  }
  return true
}
