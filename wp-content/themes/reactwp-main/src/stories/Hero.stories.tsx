import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from '../components/Hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithChildren: Story = {
  args: {
    children: (
      <div className="flex gap-4 justify-center md:justify-start">
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg shadow-teal-500/25">
          הצטרפו לקהילה
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-bold text-lg border border-slate-700 transition-all">
          קרא עוד
        </button>
      </div>
    ),
  },
};
