import { Tenant } from '@prisma/client'

import prisma from '../../src/lib/prisma'

export const knowledgeBaseSeed = async (tenant: Tenant) => {
  return await prisma.knowledgeBase.create({
    data: {
      name: 'サンプルナレッジベース',
      description: 'これはサンプルのナレッジベースです。',
      tenantId: tenant.id,
    },
  })
}
