import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleHeader } from '../components/ArticleHeader';
import { MemoryRouter } from 'react-router-dom';
import { Article } from '../types';

const meta = {
  title: 'Components/ArticleHeader',
  component: ArticleHeader,
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
} satisfies Meta<typeof ArticleHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle: Article = {
  id: '1',
  title: 'השפעת הפסיכדליה על הטיפול בדיכאון עמיד',
  excerpt: 'מחקר חדש בוחן את היעילות של פסילוסיבין בטיפול בדיכאון שאינו מגיב לטיפולים קונבנציונליים.',
  content: 'תוכן מלא...',
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
    showImage: false,
  },
};

export const WithImage: Story = {
  args: {
    article: mockArticle,
    showImage: true,
  },
};

export const LongTitle: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'מחקר מקיף ורב-מרכזי אודות ההשפעות ארוכות הטווח של טיפול משולב בפסיכדליה ופסיכותרפיה על מטופלים עם פוסט-טראומה מורכבת',
    },
    showImage: true,
  },
};

export const ManyTags: Story = {
  args: {
    article: {
      ...mockArticle,
      tags: ['דיכאון', 'פסילוסיבין', 'מחקר קליני', 'פסיכותרפיה', 'מדעי המוח', 'טיפול', 'בריאות הנפש'],
    },
    showImage: true,
  },
};
