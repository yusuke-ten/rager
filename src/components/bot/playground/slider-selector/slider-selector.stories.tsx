import type { Meta, StoryObj } from '@storybook/react'

import { SliderSelector } from './slider-selector'

const meta: Meta<typeof SliderSelector> = {
  title: 'Bot/Playground/SliderSelector',
  component: SliderSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='flex w-[350px] justify-center'>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof SliderSelector>

export const Default: Story = {
  args: {
    label: 'Slider Selector',
    defaultValue: [0.5],
    max: 100,
    step: 1,
    description: 'Slider Selectorの説明',
  },
}

export const Temperature: Story = {
  args: {
    label: 'Temperature',
    defaultValue: [0.5],
    max: 1,
    step: 0.1,
    description: `ランダム性を制御します：値を下げると、結果がより少なくランダムになります。Temperatureがゼロに近づくと、モデルは決定論的で繰り返しのあるものになります。`,
  },
}

export const MaxTokens: Story = {
  args: {
    label: 'Maximum Length',
    defaultValue: [4000],
    max: 4000,
    step: 10,
    description: `生成するトークンの最大数です。リクエストは最大2,048または4,000トークンを使用でき、プロンプトと完了の間で共有されます。正確な制限はモデルによって異なります。`,
  },
}

export const TopP: Story = {
  args: {
    label: 'Top P',
    defaultValue: [0.5],
    max: 1,
    step: 0.1,
    description: `多様性を核サンプリングで制御します：0.5は、すべての
          確率加重オプションの半分が考慮されることを意味します。`,
  },
}
