import prisma from '@/lib/prisma'
import { getCurrentTenant } from '@/lib/auth/getCurrentTenant'
import {
  FormData,
  Configuration,
} from '@/components/bot/configuration/configuration/configuration'

const getBot = async (botId: string) => {
  const currentTenant = await getCurrentTenant()
  if (!currentTenant) {
    throw new Error('Current tenant not found')
  }

  const bot = await prisma.bot.findUnique({
    where: {
      id: botId,
      tenantId: currentTenant.id,
    },
  })
  return bot
}

export default async function ConfigurationPage({
  params,
}: {
  params: { botId: string }
}) {
  const bot = await getBot(params.botId)

  if (!bot) {
    return <div>Bot not found</div>
  }

  const handleUpdateBot = async (data: FormData) => {
    'use server'
    await prisma.bot.update({
      where: {
        id: bot.id,
      },
      data: {
        name: data.botName,
        description: data.description,
        emptyResponse: data.emptyResponse,
        openStatement: data.openStatement,
        showQuote: data.showQuote,
        systemPrompt: data.systemPrompt,
        similarityThreshold: data.similarityThreshold,
        keywordSimilarityWeight: data.keywordSimilarityWeight,
        temperature: data.temperature,
        topP: data.topP,
        presencePenalty: data.presencePenalty,
        frequencyPenalty: data.frequencyPenalty,
        maxTokens: data.maxTokens,
      },
    })
  }

  return <Configuration bot={bot} knowledgeBases={[]} handleUpdateBot={handleUpdateBot} />
}
