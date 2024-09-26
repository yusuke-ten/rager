export type Bot = {
  id: string
  name: string
  description: string | null
  emptyResponse: string | null
  openStatement: string | null
  showQuote: boolean
  systemPrompt: string
  similarityThreshold: number
  keywordSimilarityWeight: number
  temperature: number
  topP: number
  presencePenalty: number
  frequencyPenalty: number
  maxTokens: number
}
