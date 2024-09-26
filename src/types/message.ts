import { MessageRole } from '@prisma/client'

export type Message = {
  id: string
  content: string
  role: MessageRole
}
