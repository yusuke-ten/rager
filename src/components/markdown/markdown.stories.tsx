import type { Meta, StoryObj } from '@storybook/react'

import sample from './sample.md'
import { Markdown } from './markdown'
const meta: Meta<typeof Markdown> = {
  title: 'Markdown',
  component: Markdown,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Markdown>

export const Basic: Story = {
  args: {
    children: sample.toString(),
  },
}

export const WithCodeBlock: Story = {
  args: {
    children: `
# Code Example

\`\`\`javascript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`
    `,
  },
}

export const WithTable: Story = {
  args: {
    children: `
# Table Example

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
    `,
  },
}
