import { ChatOpenAI } from '@langchain/openai'

export const chatOpenAI = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY || '',
  temperature: 0.7,
  model: 'gpt-3.5-turbo',
})
