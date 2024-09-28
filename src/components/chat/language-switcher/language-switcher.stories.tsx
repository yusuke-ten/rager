import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { RFC5646LanguageTag } from '@/lib/rfc5646-language-tags'

import { LanguageSwitcher } from './language-switcher'

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Chat/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LanguageSwitcher>

export const Default: Story = {
  render: (args) => {
    const [selectedLanguage, setSelectedLanguage] = useState<RFC5646LanguageTag>('ja')
    return (
      <LanguageSwitcher
        {...args}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    )
  },
  args: {
    languageList: [
      {
        id: 'ja',
        label: '日本語',
      },
      {
        id: 'en',
        label: 'English',
      },
      {
        id: 'zh',
        label: 'Chinese',
      },
      {
        id: 'ko',
        label: 'Korean',
      },
      {
        id: 'fr',
        label: 'French',
      },
    ],
  },
}
