import prisma from '../../src/lib/prisma'

export const tenantSeed = async () => {
  return await prisma.tenant.create({
    data: {
      name: 'サンプルテナント',
    },
  })
}
