import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  decorators: [(Story) => <TooltipProvider delayDuration={0}>{Story()}</TooltipProvider>],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>ホバーしてください</TooltipTrigger>
      <TooltipContent>
        <p>ツールチップの内容</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const CustomPosition: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>カスタム位置</TooltipTrigger>
      <TooltipContent sideOffset={10}>
        <p>上にずらしたツールチップ</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const CustomStyle: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>カスタムスタイル</TooltipTrigger>
      <TooltipContent className='bg-red-500 text-white'>
        <p>赤い背景のツールチップ</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>長いツールチップ</TooltipTrigger>
      <TooltipContent className='max-h-[200px] max-w-[300px] overflow-y-auto'>
        <p className='text-sm'>
          これは長いツールチップの例です。ツールチップの内容が長い場合、自動的にスクロールバーが表示されます。
          これは長いツールチップの例です。ツールチップの内容が長い場合、自動的にスクロールバーが表示されます。
          これは長いツールチップの例です。ツールチップの内容が長い場合、自動的にスクロールバーが表示されます。
          これは長いツールチップの例です。ツールチップの内容が長い場合、自動的にスクロールバーが表示されます。
          これは長いツールチップの例です。ツールチップの内容が長い場合、自動的にスクロールバーが表示されます。
        </p>
      </TooltipContent>
    </Tooltip>
  ),
}
