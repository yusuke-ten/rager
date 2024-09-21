'use client'

import { Bot } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
  botList: Bot[]
}

export const BotList = ({ botList }: Props) => {
  return (
    <div className='flex w-96 flex-col bg-white p-6'>
      <Button>Create an Assistant</Button>
      <Separator className='my-4' />
      <ScrollArea className='flex-grow'>
        {botList.map((bot) => (
          <Card
            className='mb-3 transition-shadow duration-300 hover:shadow-md'
            key={bot.id}
          >
            <CardContent className='flex items-center space-x-3 p-4'>
              <div>
                <div className='text-lg font-semibold'>{bot.name}</div>
                <div className='text-sm text-gray-500'>有用な対話アシスタント</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}
