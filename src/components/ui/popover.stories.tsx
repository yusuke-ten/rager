import type { Meta, StoryObj } from '@storybook/react'

import { Popover, PopoverAnchor, PopoverTrigger, PopoverContent } from './popover'

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Ui/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button className='rounded-md bg-gray-100 px-3 py-2 text-gray-900 shadow-sm'>
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='p-4'>
          <p>
            This is the popover content. It can contain any content you want, like text,
            images, or forms.
          </p>
          <button className='rounded-md bg-gray-100 px-3 py-2 text-gray-900 shadow-sm'>
            Close Popover
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const WithAnchor: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button className='rounded-md bg-gray-100 px-3 py-2 text-gray-900 shadow-sm'>
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverAnchor>
        <div className='absolute -top-10 left-1/2 -translate-x-1/2'>
          <PopoverContent>
            <div className='p-4'>
              <p>
                This is the popover content. It can contain any content you want, like
                text, images, or forms.
              </p>
              <button className='rounded-md bg-gray-100 px-3 py-2 text-gray-900 shadow-sm'>
                Close Popover
              </button>
            </div>
          </PopoverContent>
        </div>
      </PopoverAnchor>
    </Popover>
  ),
}

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button className='rounded-md bg-gray-100 px-3 py-2 text-gray-900 shadow-sm'>
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverContent align='start'>
        <div className='p-4'>
          <p>
            This is the popover content. It can contain any content you want, like text,
            images, or forms.
          </p>
          <button className='rounded-md bg-gray-100 px-3 py-2 text-gray-900 shadow-sm'>
            Close Popover
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button className='rounded-md bg-gray-100 px-3 py-2 text-gray-900 shadow-sm'>
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <div className='p-4'>
          <p>
            This is the popover content. It can contain any content you want, like text,
            images, or forms.
          </p>
          <button className='rounded-md bg-gray-100 px-3 py-2 text-gray-900 shadow-sm'>
            Close Popover
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
