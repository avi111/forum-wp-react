import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleCard } from '../components/ArticleCard';
import { MemoryRouter } from 'react-router-dom';
import { Article } from '../types';

const meta = {
  title: 'Components/ArticleCard',
  component: ArticleCard,
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
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle: Article = {
  id: '1',
  title: 'השפעת הפסיכדליה על הטיפול בדיכאון עמיד',
  excerpt: 'מחקר חדש בוחן את היעילות של פסילוסיבין בטיפול בדיכאון שאינו מגיב לטיפולים קונבנציונליים. התוצאות מראות שיפור משמעותי בקרב המשתתפים.',
  content: 'תוכן מלא של המאמר...',
  authorId: 'auth1',
  authorName: 'ד"ר ישראל ישראלי',
  date: '15 ינואר 2024',
  isEditorial: false,
  tags: ['דיכאון', 'פסילוסיבין', 'מחקר קליני'],
  imageUrl: 'https://images.unsplash.com/photo-1555431189-0fabf2667795?auto=format&fit=crop&q=80&w=1000',
};

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const LongTitle: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'מחקר מקיף ורב-מרכזי אודות ההשפעות ארוכות הטווח של טיפול משולב בפסיכדליה ופסיכותרפיה על מטופלים עם פוסט-טראומה מורכבת',
    },
  },
};

export const LongExcerpt: Story = {
  args: {
    article: {
      ...mockArticle,
      excerpt: 'זהו תקציר ארוך מאוד שנועד לבדוק את התנהגות הכרטיס כאשר יש הרבה טקסט. הטקסט אמור להיחתך אחרי שלוש שורות (line-clamp-3). חשוב לוודא שהעיצוב נשמר ולא נשבר, ושהכרטיס שומר על גובה אחיד יחסית או מתרחב בצורה נעימה לעין. עוד טקסט למילוי המקום כדי לוודא שהחיתוך עובד כמו שצריך.',
    },
  },
};

export const ManyTags: Story = {
  args: {
    article: {
      ...mockArticle,
      tags: ['דיכאון', 'פסילוסיבין', 'מחקר קליני', 'פסיכותרפיה', 'מדעי המוח', 'טיפול', 'בריאות הנפש'],
    },
  },
};
