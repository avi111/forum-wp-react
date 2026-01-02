import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagCloud } from '../components/TagCloud';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/TagCloud',
  component: TagCloud,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[600px]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof TagCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTags = [
  { tag: 'פסיכדליה', count: 50 },
  { tag: 'MDMA', count: 40 },
  { tag: 'פסילוסיבין', count: 35 },
  { tag: 'טיפול', count: 30 },
  { tag: 'מחקר', count: 25 },
  { tag: 'LSD', count: 20 },
  { tag: 'אינטגרציה', count: 15 },
  { tag: 'טראומה', count: 12 },
  { tag: 'דיכאון', count: 10 },
  { tag: 'חרדה', count: 8 },
  { tag: 'מוח', count: 5 },
  { tag: 'תודעה', count: 3 },
];

export const Default: Story = {
  args: {
    tagsData: mockTags,
  },
};

export const Empty: Story = {
  args: {
    tagsData: [],
  },
};

export const FewTags: Story = {
  args: {
    tagsData: [
      { tag: 'פסיכדליה', count: 10 },
      { tag: 'מחקר', count: 5 },
    ],
  },
};
