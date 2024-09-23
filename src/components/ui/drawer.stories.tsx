import type { Meta, StoryObj } from '@storybook/react'

import React from 'react'

import { Button } from './button'
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from './drawer'

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline'>ドロワーを開く</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ドロワータイトル</DrawerTitle>
          <DrawerDescription>ここにドロワーの説明を入れます。</DrawerDescription>
        </DrawerHeader>
        <div className='p-4'>ドロワーの本文コンテンツがここに入ります。</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>閉じる</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const CustomPosition: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline'>上部ドロワーを開く</Button>
      </DrawerTrigger>
      <DrawerContent className='bottom-auto top-0'>
        <DrawerHeader>
          <DrawerTitle>上部ドロワー</DrawerTitle>
        </DrawerHeader>
        <div className='p-4'>このドロワーは画面上部から開きます。</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>閉じる</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
