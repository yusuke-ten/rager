import prisma from '../src/lib/prisma'
import { botSeed } from './seeds/botSeed'
import { userSeed } from './seeds/userSeed'
import { tenantSeed } from './seeds/tenantSeed'
import { documentSeed } from './seeds/documentSeed'
import { knowledgeBaseSeed } from './seeds/knowledgeBaseSeed'

async function truncateAllTables() {
  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  for (const { tablename } of tableNames) {
    if (tablename !== '_prisma_migrations') {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" CASCADE;`)
    }
  }
}

async function main() {
  await truncateAllTables()
  const tenant = await tenantSeed()
  await userSeed(tenant)
  const knowledgeBase = await knowledgeBaseSeed(tenant)
  await documentSeed(knowledgeBase)
  await botSeed(tenant, knowledgeBase)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
