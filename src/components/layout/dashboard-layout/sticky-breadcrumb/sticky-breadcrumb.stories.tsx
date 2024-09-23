import type { Meta, StoryObj } from '@storybook/react';

import { StickyBreadcrumb } from './sticky-breadcrumb';

const meta: Meta<typeof StickyBreadcrumb> = {
  title: 'StickyBreadcrumb',
  component: StickyBreadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StickyBreadcrumb>;

export const Default: Story = {
  args: {
    children: 'StickyBreadcrumbのデフォルト表示',
  },
};
