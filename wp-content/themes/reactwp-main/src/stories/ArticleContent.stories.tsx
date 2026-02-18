import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleContent } from '../components/ArticleContent';
import { MemoryRouter } from 'react-router-dom';
import { Article } from '../types';

const meta = {
  title: 'Components/ArticleContent',
  component: ArticleContent,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="bg-slate-50 min-h-screen py-12">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle: Article = {
  id: '1',
  title: 'השפעת הפסיכדליה על הטיפול בדיכאון עמיד',
  excerpt: 'מחקר חדש בוחן את היעילות של פסילוסיבין בטיפול בדיכאון שאינו מגיב לטיפולים קונבנציונליים.',
  content: `
    <p>זהו תוכן המאמר. הוא מכיל <strong>הדגשות</strong>, <em>נטיות</em>, ורשימות:</p>
    <ul>
      <li>נקודה ראשונה</li>
      <li>נקודה שנייה</li>
      <li>נקודה שלישית</li>
    </ul>
    <p>כמו כן, יש כאן פסקאות ארוכות יותר שנועדו להדגים את הקריאות של הטקסט. המחקרים מראים כי השימוש בחומרים פסיכדליים בסביבה טיפולית מבוקרת יכול להוביל לתוצאות משמעותיות בקרב מטופלים הסובלים מדיכאון עמיד, פוסט-טראומה והתמכרויות.</p>
    <h3>כותרת משנה</h3>
    <p>טקסט נוסף תחת כותרת המשנה. חשוב לציין כי הטיפול אינו מתאים לכל אחד ויש צורך בסינון קפדני של המועמדים לטיפול.</p>
  `,
  authorId: 'auth1',
  authorName: 'ד"ר ישראל ישראלי',
  date: '15 ינואר 2024',
  isEditorial: false,
  tags: ['דיכאון', 'פסילוסיבין'],
  imageUrl: 'https://images.unsplash.com/photo-1555431189-0fabf2667795',
};

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const WithAttachments: Story = {
  args: {
    article: {
      ...mockArticle,
      attachments: [
        {
          name: 'פרוטוקול הטיפול המלא',
          url: '#',
          type: 'doc',
          size: '2.4 MB'
        },
        {
          name: 'נספח א - שאלונים',
          url: '#',
          type: 'other',
          size: '150 KB'
        }
      ]
    },
  },
};

export const WithPDFPreview: Story = {
  args: {
    article: {
      ...mockArticle,
      attachments: [
        {
          name: 'מצגת סיכום המחקר',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          type: 'pdf',
          size: '1.2 MB'
        }
      ]
    },
  },
};

export const RichContent: Story = {
  args: {
    article: {
      ...mockArticle,
      content: `
        <h2>מבוא</h2>
        <p>השימוש בחומרים פסיכדליים למטרות ריפוי ידוע לאנושות מזה אלפי שנים. תרבויות ילידיות במרכז ודרום אמריקה השתמשו בפטריות פסילוסיבין, באייוואסקה ובקקטוסים מסקליניים בטקסים דתיים ורפואיים.</p>
        <blockquote>
          "החוויה הפסיכדלית היא מסע אל תוך הנפש, המאפשר לנו לראות את עצמנו ואת העולם באור חדש."
        </blockquote>
        <h2>ממצאים עיקריים</h2>
        <p>במחקר הנוכחי, שנערך בקרב 50 משתתפים, נמצא כי:</p>
        <ol>
          <li>70% מהמשתתפים דיווחו על ירידה של לפחות 50% בתסמיני הדיכאון.</li>
          <li>30% מהמשתתפים הגיעו לרמיסיה מלאה.</li>
          <li>ההשפעה החיובית נשמרה גם בבדיקת מעקב שנערכה לאחר 6 חודשים.</li>
        </ol>
        <p>הגרף הבא מציג את הירידה במדדי הדיכאון לאורך זמן:</p>
        <div style="background: #f1f5f9; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          [כאן היה יכול להיות גרף]
        </div>
        <h2>דיון ומסקנות</h2>
        <p>תוצאות אלו מצטרפות לגוף ידע הולך וגדל התומך בפוטנציאל הטיפולי של הפסיכדליה. עם זאת, נדרשים מחקרים נוספים בקנה מידה רחב יותר כדי לבסס את הממצאים ולהבין את המנגנונים הביולוגיים והפסיכולוגיים העומדים בבסיס הטיפול.</p>
      `
    },
  },
};
