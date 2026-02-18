import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditorialCard } from '../components/EditorialCard';
import { MemoryRouter } from 'react-router-dom';
import { Article } from '../types';

const meta = {
  title: 'Components/EditorialCard',
  component: EditorialCard,
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
} satisfies Meta<typeof EditorialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle: Article = {
  id: '1',
  title: 'עתיד הפסיכדליה בישראל: ראיון מיוחד',
  excerpt: 'שוחחנו עם מובילי הדעה בתחום על האתגרים וההזדמנויות העומדים בפני הקהילה המדעית והטיפולית בישראל בשנים הקרובות.',
  content: 'תוכן מלא של המאמר...',
  authorId: 'auth1',
  authorName: 'מערכת הפורום',
  date: '20 ינואר 2024',
  isEditorial: true,
  tags: ['ראיון', 'מדיניות', 'עתיד התחום'],
  imageUrl: 'https://images.unsplash.com/photo-1518531933037-9a82bf55a5e9?auto=format&fit=crop&q=80&w=1000',
};

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const NoImage: Story = {
  args: {
    article: mockArticle,
    showImage: false,
  },
};

export const LongTitle: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'סקירה מקיפה של ההתפתחויות הרגולטוריות האחרונות בתחום הטיפול הפסיכדלי באירופה ובצפון אמריקה והשלכותיהן על ישראל',
    },
  },
};

export const LongExcerpt: Story = {
  args: {
    article: {
      ...mockArticle,
      excerpt: 'זהו תקציר ארוך מאוד שנועד לבדוק את התנהגות הכרטיס כאשר יש הרבה טקסט. הטקסט אמור להיחתך אחרי שתי שורות (line-clamp-2). חשוב לוודא שהעיצוב נשמר ולא נשבר, ושהכרטיס שומר על המראה הנקי שלו. עוד טקסט למילוי המקום כדי לוודא שהחיתוך עובד כמו שצריך.',
    },
  },
};

export const ManyTags: Story = {
  args: {
    article: {
      ...mockArticle,
      tags: ['ראיון', 'מדיניות', 'עתיד התחום', 'רגולציה', 'מחקר', 'טיפול', 'חברה'],
    },
  },
};
