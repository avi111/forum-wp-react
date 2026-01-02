import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeEditorial } from '../components/HomeEditorial';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/HomeEditorial',
  component: HomeEditorial,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[400px]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof HomeEditorial>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticles = [
  {
    id: '1',
    title: 'ראיון בלעדי עם חלוץ המחקר הפסיכדלי',
    excerpt: 'שוחחנו עם פרופ\' דוד נחמיאס על העבר, ההווה והעתיד של התחום.',
    content: 'תוכן מלא...',
    authorId: '0',
    authorName: 'מערכת הפורום',
    date: '12 ינואר 2024',
    isEditorial: true,
    tags: ['ראיון', 'היסטוריה'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '2',
    title: 'סיכום כנס הפסיכדליה הבינלאומי',
    excerpt: 'כל מה שקרה בכנס הגדול ביותר שנערך השנה בתחום.',
    content: 'תוכן מלא...',
    authorId: '0',
    authorName: 'מערכת הפורום',
    date: '08 ינואר 2024',
    isEditorial: true,
    tags: ['כנס', 'חדשות'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200',
  },
];

export const Default: Story = {
  args: {
    articles: mockArticles,
    limit: 2,
  },
};
