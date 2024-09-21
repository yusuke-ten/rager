import type { Meta, StoryObj } from '@storybook/react'

import { Answer } from './answer'

const meta: Meta<typeof Answer> = {
  title: 'Chat/Answer',
  component: Answer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Answer>

export const Empty: Story = {
  args: {
    children: '',
  },
}

export const WithText: Story = {
  args: {
    children: 'これは回答のテキストです。',
  },
}

export const WithLongText: Story = {
  args: {
    children:
      'これは長い回答のテキストです。複数の文章を含んでいます。Answerコンポーネントがどのように長いテキストを表示するかを確認するためのものです。',
  },
}

export const WithVeryLongText: Story = {
  args: {
    children: `
      これは非常に長い回答のテキストです。Answerコンポーネントが大量のテキストをどのように処理し表示するかを確認するためのものです。

      長文の回答には、複数の段落や様々な情報が含まれる可能性があります。例えば、以下のようなトピックについて詳細な説明が含まれるかもしれません：

      1. 日本の四季：
         日本には春、夏、秋、冬の四季があります。各季節には特徴的な自然現象や文化的行事があります。例えば、春には桜の花見、夏には花火大会、秋には紅葉狩り、冬にはスキーやスノーボードなどが楽しまれます。

      2. 日本の伝統芸能：
         歌舞伎、能、文楽など、日本には長い歴史を持つ伝統芸能が数多く存在します。これらは日本の文化遺産として大切に保存され、今日でも上演されています。

      3. 日本の食文化：
         寿司、天ぷら、ラーメンなど、日本料理は世界中で人気があります。各地域には独自の郷土料理があり、その土地の気候や歴史を反映しています。

      このように、長文の回答では様々なトピックや詳細な情報が含まれる可能性があります。Answerコンポーネントは、このような長いテキストを適切に表示し、読みやすさを維持する必要があります。
    `,
  },
}
