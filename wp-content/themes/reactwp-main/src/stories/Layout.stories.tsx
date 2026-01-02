import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout } from '../components/Layout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';

const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AppProvider>
        <MemoryRouter>
          <Routes>
            <Route element={<Story />}>
              <Route path="/" element={<div className="p-8 text-center min-h-[500px]">תוכן העמוד הראשי</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AppProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
