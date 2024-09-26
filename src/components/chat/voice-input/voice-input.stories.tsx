import type { Meta, StoryObj } from '@storybook/react'

import { RFC5646_LANGUAGE_TAGS } from '@/lib/rfc5646-language-tags'

import { VoiceInput } from './voice-input'

const meta: Meta<typeof VoiceInput> = {
  title: 'Chat/VoiceInput',
  component: VoiceInput,
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: {
        type: 'select',
        options: Object.keys(RFC5646_LANGUAGE_TAGS),
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof VoiceInput>

export const Default: Story = {
  args: {
    language: 'ja-JP',
    handleSubmit: (transcript: string) => console.log(transcript),
  },
}
