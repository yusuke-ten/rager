import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/assets/styles/globals.css'
import { LoadingProvider } from '../src/hooks/use-loading'

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
      <LoadingProvider>
        <Story />
      </LoadingProvider>
    ),
  ],
}

export default preview
