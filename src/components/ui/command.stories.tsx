import type { Meta, StoryObj } from '@storybook/react'

import { SearchIcon } from 'lucide-react'

import { CommandList } from './command'
import { CommandItem } from './command'
import { CommandInput } from './command'
import { CommandEmpty } from './command'
import { CommandGroup } from './command'
import { CommandDialog } from './command'
import { CommandShortcut } from './command'
import { CommandSeparator } from './command'

const meta: Meta<typeof CommandDialog> = {
  title: 'Ui/CommandDialog',
  component: CommandDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof CommandDialog>

export const Default: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <CommandDialog {...args}>
      <CommandInput placeholder='Search...' />
      <CommandList>
        <CommandGroup heading='Recent'>
          <CommandItem>
            Create new project
            <CommandShortcut>Cmd+N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Open project
            <CommandShortcut>Cmd+O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Files'>
          <CommandItem>
            New file
            <CommandShortcut>Cmd+N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Open file
            <CommandShortcut>Cmd+O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Save
            <CommandShortcut>Cmd+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Edit'>
          <CommandItem>
            Copy
            <CommandShortcut>Cmd+C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Paste
            <CommandShortcut>Cmd+V</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Cut
            <CommandShortcut>Cmd+X</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='View'>
          <CommandItem>
            Zoom in
            <CommandShortcut>Cmd+=</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Zoom out
            <CommandShortcut>Cmd+-</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Reset zoom
            <CommandShortcut>Cmd+0</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Help'>
          <CommandItem>
            Documentation
            <CommandShortcut>Cmd+?</CommandShortcut>
          </CommandItem>
          <CommandItem>
            About
            <CommandShortcut>Cmd+A</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
    </CommandDialog>
  ),
}

export const WithCustomInput: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <CommandDialog {...args}>
      <div className='flex items-center border-b px-3' cmdk-input-wrapper=''>
        <SearchIcon className='mr-2 h-4 w-4 shrink-0 opacity-50' />
        <input
          className='flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
          placeholder='Search...'
        />
      </div>
      <CommandList>
        <CommandGroup heading='Recent'>
          <CommandItem>
            Create new project
            <CommandShortcut>Cmd+N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Open project
            <CommandShortcut>Cmd+O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Files'>
          <CommandItem>
            New file
            <CommandShortcut>Cmd+N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Open file
            <CommandShortcut>Cmd+O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Save
            <CommandShortcut>Cmd+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Edit'>
          <CommandItem>
            Copy
            <CommandShortcut>Cmd+C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Paste
            <CommandShortcut>Cmd+V</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Cut
            <CommandShortcut>Cmd+X</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='View'>
          <CommandItem>
            Zoom in
            <CommandShortcut>Cmd+=</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Zoom out
            <CommandShortcut>Cmd+-</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Reset zoom
            <CommandShortcut>Cmd+0</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Help'>
          <CommandItem>
            Documentation
            <CommandShortcut>Cmd+?</CommandShortcut>
          </CommandItem>
          <CommandItem>
            About
            <CommandShortcut>Cmd+A</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
    </CommandDialog>
  ),
}
