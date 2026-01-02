import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResearcherIndex } from '../components/ResearcherIndex';
import { UserStatus } from '../types';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/ResearcherIndex',
  component: ResearcherIndex,
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
} satisfies Meta<typeof ResearcherIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockResearchers = [
  {
    id: '1',
    firstName: 'ד"ר',
    lastName: 'ישראל ישראלי',
    email: 'israel@example.com',
    institution: 'אוניברסיטת תל אביב',
    specialization: 'פסיכיאטריה',
    bio: 'חוקר מוביל בתחום הטיפול בפוסט טראומה באמצעות MDMA. בעל ניסיון של מעל 15 שנה במחקר קליני.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    firstName: 'פרופ\'',
    lastName: 'שרה כהן',
    email: 'sara@example.com',
    institution: 'האוניברסיטה העברית',
    specialization: 'נוירוביולוגיה',
    bio: 'מתמחה בחקר המוח והשפעת חומרים פסיכדליים על גמישות מוחית.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: '3',
    firstName: 'ד"ר',
    lastName: 'דוד לוי',
    email: 'david@example.com',
    institution: 'מרכז רפואי שיבא',
    specialization: 'פסיכולוגיה קלינית',
    bio: 'מטפל וחוקר בתחום הטיפול בפסילוסיבין לדיכאון עמיד.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: '4',
    firstName: 'ד"ר',
    lastName: 'מיכל אהרוני',
    email: 'michal@example.com',
    institution: 'אוניברסיטת בן גוריון',
    specialization: 'פרמקולוגיה',
    bio: 'חוקרת מנגנוני פעולה של חומרים פסיכדליים ברמה המולקולרית.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: '5',
    firstName: 'פרופ\'',
    lastName: 'יוסי בן-דוד',
    email: 'yossi@example.com',
    institution: 'מכון ויצמן למדע',
    specialization: 'מדעי המוח',
    bio: 'חוקר את הקשר בין תודעה לפעילות מוחית תחת השפעת חומרים משני תודעה.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=5',
  },
  {
    id: '6',
    firstName: 'ד"ר',
    lastName: 'רונית שחם',
    email: 'ronit@example.com',
    institution: 'המרכז הבינתחומי הרצליה',
    specialization: 'פסיכולוגיה חברתית',
    bio: 'חוקרת היבטים חברתיים ותרבותיים של שימוש בחומרים פסיכדליים.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=6',
  },
  {
    id: '7',
    firstName: 'ד"ר',
    lastName: 'אמיר גולן',
    email: 'amir@example.com',
    institution: 'בית חולים איכילוב',
    specialization: 'פסיכיאטריה',
    bio: 'מנהל מחלקה וחוקר ראשי בניסויים קליניים בתחום הפסיכדליה.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=7',
  },
  {
    id: '8',
    firstName: 'ד"ר',
    lastName: 'נועה ברק',
    email: 'noa@example.com',
    institution: 'אוניברסיטת חיפה',
    specialization: 'עבודה סוציאלית',
    bio: 'חוקרת שילוב טיפולים פסיכדליים בשיקום אוכלוסיות בסיכון.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=8',
  },
  {
    id: '9',
    firstName: 'פרופ\'',
    lastName: 'דניאל כרמון',
    email: 'daniel@example.com',
    institution: 'הטכניון',
    specialization: 'ביוטכנולוגיה',
    bio: 'מפתח שיטות חדשניות לייצור ומיצוי חומרים פסיכדליים.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=9',
  },
  {
    id: '10',
    firstName: 'ד"ר',
    lastName: 'תמר גל',
    email: 'tamar@example.com',
    institution: 'מרכז רפואי רמב"ם',
    specialization: 'נוירולוגיה',
    bio: 'חוקרת השפעות נוירולוגיות ארוכות טווח של טיפולים פסיכדליים.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=10',
  },
  {
    id: '11',
    firstName: 'ד"ר',
    lastName: 'עודד פרידמן',
    email: 'oded@example.com',
    institution: 'אוניברסיטת בר אילן',
    specialization: 'פילוסופיה',
    bio: 'חוקר את האתיקה והפילוסופיה של השימוש בחומרים פסיכדליים.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=11',
  },
];

export const Default: Story = {
  args: {
    researchers: mockResearchers,
  },
};

export const Empty: Story = {
  args: {
    researchers: [],
  },
};

export const ManyResearchers: Story = {
  args: {
    researchers: [
      ...mockResearchers,
      ...mockResearchers.map(r => ({ ...r, id: r.id + '_copy', firstName: r.firstName + ' (העתק)' })),
    ],
  },
};
