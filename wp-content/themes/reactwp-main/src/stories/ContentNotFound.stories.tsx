import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentNotFound } from '../components/ContentNotFound';

const meta = {
  title: 'Components/ContentNotFound',
  component: ContentNotFound,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContentNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
