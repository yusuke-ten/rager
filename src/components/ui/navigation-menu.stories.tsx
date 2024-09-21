import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from './navigation-menu'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Ui/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px]'>
              <li>
                <NavigationMenuLink href='/docs'>Documentation</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href='/about'>About Us</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px]'>
              <li>
                <NavigationMenuLink href='/products'>Products</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href='/services'>Services</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='/contact'>Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <NavigationMenu className='bg-gray-100 p-4'>
      <NavigationMenuList className='gap-4'>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='bg-blue-500 text-white'>
            Custom Item
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 bg-blue-100 p-4 md:w-[300px]'>
              <li>
                <NavigationMenuLink href='/custom' className='text-blue-700'>
                  Custom Link
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
