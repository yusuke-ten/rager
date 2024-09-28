import { OpenAIEmbeddings } from '@langchain/openai'

export const openAIEmbeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY || '',
})
