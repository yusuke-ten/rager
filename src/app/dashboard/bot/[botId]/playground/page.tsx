import prisma from '@/lib/prisma'
import { Bot } from '@/types/bot'
import { Playground } from '@/components/bot/playground'
import { getCurrentTenant } from '@/lib/auth/getCurrentTenant'

const getBot = async (botId: string): Promise<Bot | null> => {
  const currentTenant = await getCurrentTenant()
  if (!currentTenant) {
    return null
  }
  const bot = await prisma.bot.findUnique({
    where: {
      id: botId,
      tenantId: currentTenant.id,
    },
  })

  if (!bot) {
    return null
  }
  return {
    id: bot.id,
    name: bot.name,
    description: bot.description,
    emptyResponse: bot.emptyResponse,
    openStatement: bot.openStatement,
    showQuote: bot.showQuote,
    systemPrompt: bot.systemPrompt,
    similarityThreshold: bot.similarityThreshold,
    keywordSimilarityWeight: bot.keywordSimilarityWeight,
    temperature: bot.temperature,
    topP: bot.topP,
    presencePenalty: bot.presencePenalty,
    frequencyPenalty: bot.frequencyPenalty,
    maxTokens: bot.maxTokens,
  }
}

export default async function PlaygroundPage({ params }: { params: { botId: string } }) {
  const bot = await getBot(params.botId)
  if (!bot) {
    return <div>Bot not found</div>
  }
  return <Playground bot={bot} />
}
