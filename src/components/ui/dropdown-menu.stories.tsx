import type { Meta, StoryObj } from '@storybook/react'

import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuCheckboxItem,
} from './dropdown-menu'

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: 'Ui/DropdownMenu',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Wait for the story to render
    await new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (canvasElement.querySelector('.dropdown-menu')) {
          observer.disconnect()
          resolve(undefined)
        }
      })
      observer.observe(canvasElement, { subtree: true, childList: true })
    })
    // Trigger the dropdown menu
    await new Promise((resolve) => {
      const button = canvasElement.querySelector<HTMLButtonElement>(
        '.dropdown-menu-trigger',
      )
      if (button) {
        button.click()
        resolve(undefined)
      }
    })
    // Wait for the dropdown menu to open
    await new Promise((resolve) => {
      const menu = canvasElement.querySelector('.dropdown-menu-content')
      if (menu) {
        menu.addEventListener('transitionend', () => {
          resolve(undefined)
        })
      }
    })
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Label</DropdownMenuLabel>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithShortcut: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          Item 1<DropdownMenuShortcut>Ctrl+Shift+I</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem checked={true}>Item 1</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Item 2</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithRadio: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value='item-1'>
          <DropdownMenuRadioItem value='item-1'>Item 1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='item-2'>Item 2</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithGroup: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
          <DropdownMenuItem>Item 4</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithSub: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Sub Item</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
            <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithPortal: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  ),
}
