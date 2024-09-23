import type { Meta, StoryObj } from '@storybook/react'

import React from 'react'

import { Button } from './button'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card'

const meta: Meta<typeof HoverCard> = {
  title: 'UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='outline'>ホバーしてください</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className='p-4'>
          <h3 className='mb-2 text-lg font-bold'>ホバーカードの内容</h3>
          <p>ここにホバーカードの詳細情報を表示します。</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const CustomPosition: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='outline'>上に表示</Button>
      </HoverCardTrigger>
      <HoverCardContent align='start' side='top' sideOffset={5}>
        <div className='p-4'>
          <h3 className='mb-2 text-lg font-bold'>上部に表示</h3>
          <p>このホバーカードは上に表示されます。</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithImage: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='outline'>画像付きホバーカード</Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex space-x-4'>
          <img
            src='https://via.placeholder.com/100'
            alt='サンプル画像'
            className='h-24 w-24 rounded'
          />
          <div>
            <h3 className='mb-2 text-lg font-bold'>画像付きカード</h3>
            <p>ここに画像と共に詳細情報を表示します。</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
