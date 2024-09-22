import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/assets/styles/globals.css'
import { LoadingProvider } from '../src/hooks/use-loading'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${notoSansJP.variable} font-sans antialiased`}>
        <LoadingProvider>
          <Story />
        </LoadingProvider>
      </div>
    ),
  ],
}

export default preview
