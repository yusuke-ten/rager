import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

const meta: Meta = {
  title: 'Ui/Tabs',
  component: Tabs,
}

export default meta

export const Default: StoryObj<typeof Tabs> = {
  render: (args) => (
    <Tabs defaultValue='tab1' {...args}>
      <TabsList aria-label='Example tabs'>
        <TabsTrigger value='tab1'>Tab One</TabsTrigger>
        <TabsTrigger value='tab2'>Tab Two</TabsTrigger>
        <TabsTrigger value='tab3'>Tab Three</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>Content of Tab One</TabsContent>
      <TabsContent value='tab2'>Content of Tab Two</TabsContent>
      <TabsContent value='tab3'>Content of Tab Three</TabsContent>
    </Tabs>
  ),
}
