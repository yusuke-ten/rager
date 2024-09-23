import type { Meta, StoryObj } from '@storybook/react';

import { ModelSelector } from './model-selector';

const meta: Meta<typeof ModelSelector> = {
  title: 'ModelSelector',
  component: ModelSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModelSelector>;

export const Default: Story = {
  args: {
    children: 'ModelSelectorのデフォルト表示',
  },
};
