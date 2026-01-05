import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaginationControls } from '../components/PaginationControls';

const meta = {
  title: 'Components/PaginationControls',
  component: PaginationControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'pageChanged' },
  },
} satisfies Meta<typeof PaginationControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};
