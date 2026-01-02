import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTA } from '../components/CTA';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/CTA',
  component: CTA,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
