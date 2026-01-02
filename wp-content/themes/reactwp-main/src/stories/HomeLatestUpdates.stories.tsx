import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeLatestUpdates } from '../components/HomeLatestUpdates';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/HomeLatestUpdates',
  component: HomeLatestUpdates,
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
} satisfies Meta<typeof HomeLatestUpdates>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockEditorialArticles = [
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

const mockResearchArticles = [
  {
    id: '3',
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
    id: '4',
    title: 'MDMA לטיפול בפוסט טראומה',
    excerpt: 'סקירה של הממצאים האחרונים מניסויים קליניים שלב 3.',
    content: 'תוכן מלא...',
    authorId: '2',
    authorName: 'פרופ\' שרה כהן',
    date: '05 ינואר 2024',
    isEditorial: false,
    tags: ['MDMA', 'PTSD'],
  },
];

const mockEvents = [
  {
    id: '1',
    title: 'כנס הפסיכדליה השנתי 2024',
    date: '2024-05-15',
    day: '15',
    month: 'מאי',
    location: 'אוניברסיטת תל אביב',
    type: 'כנס',
  },
  {
    id: '2',
    title: 'סדנת אינטגרציה למטפלים',
    date: '2024-06-01',
    day: '01',
    month: 'יוני',
    location: 'מרכז רפואי שיבא',
    type: 'סדנה',
  },
];

export const Default: Story = {
  args: {
    editorialArticles: mockEditorialArticles,
    researcherArticles: mockResearchArticles,
    events: mockEvents,
    editorialLimit: 2,
    researchLimit: 3,
  },
};
