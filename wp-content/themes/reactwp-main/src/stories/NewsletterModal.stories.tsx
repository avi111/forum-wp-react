import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterModal } from '../components/NewsletterModal';
import { AppProvider } from '../context/AppContext';

const meta = {
  title: 'Components/NewsletterModal',
  component: NewsletterModal,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof NewsletterModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close modal'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Close modal'),
  },
};
