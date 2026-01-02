import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeResearch } from '../components/HomeResearch';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/HomeResearch',
  component: HomeResearch,
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
} satisfies Meta<typeof HomeResearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticles = [
  {
    id: '1',
    title: 'השפעת פסילוסיבין על דיכאון עמיד',
    excerpt: 'מחקר קליני חדש בודק את היעילות של טיפול בפסילוסיבין בשילוב עם פסיכותרפיה.',
    content: 'תוכן מלא...',
    authorId: '1',
    authorName: 'ד"ר ישראל ישראלי',
    date: '10 ינואר 2024',
    isEditorial: false,
    tags: ['פסילוסיבין', 'דיכאון', 'מחקר קליני'],
  },
  {
    id: '2',
    title: 'MDMA לטיפול בפוסט טראומה',
    excerpt: 'סקירה של הממצאים האחרונים מניסויים קליניים שלב 3.',
    content: 'תוכן מלא...',
    authorId: '2',
    authorName: 'פרופ\' שרה כהן',
    date: '05 ינואר 2024',
    isEditorial: false,
    tags: ['MDMA', 'PTSD'],
  },
  {
    id: '3',
    title: 'מנגנוני פעולה של LSD',
    excerpt: 'מחקר הדמיה מוחית החושף כיצד LSD משפיע על רשתות עצביות.',
    content: 'תוכן מלא...',
    authorId: '3',
    authorName: 'ד"ר דוד לוי',
    date: '28 דצמבר 2023',
    isEditorial: false,
    tags: ['LSD', 'מדעי המוח'],
  },
];

export const Default: Story = {
  args: {
    articles: mockArticles,
    limit: 3,
  },
};

export const LimitedView: Story = {
  args: {
    articles: mockArticles,
    limit: 1,
  },
};
