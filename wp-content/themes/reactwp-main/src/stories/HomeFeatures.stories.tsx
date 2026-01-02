import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeFeatures } from '../components/HomeFeatures';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client for the provider
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta = {
  title: 'Components/HomeFeatures',
  component: HomeFeatures,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof HomeFeatures>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
