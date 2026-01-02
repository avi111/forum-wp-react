import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResearcherCarousel } from '../components/ResearcherCarousel';
import { UserStatus } from '../types';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/ResearcherCarousel',
  component: ResearcherCarousel,
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
} satisfies Meta<typeof ResearcherCarousel>;

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
    bio: 'חוקר מוביל בתחום הטיפול בפוסט טראומה באמצעות MDMA.',
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
    bio: 'מתמחה בחקר המוח והשפעת חומרים פסיכדליים.',
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
    bio: 'מטפל וחוקר בתחום הטיפול בפסילוסיבין.',
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
    bio: 'חוקרת מנגנוני פעולה של חומרים פסיכדליים.',
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
    bio: 'חוקר את הקשר בין תודעה לפעילות מוחית.',
    status: UserStatus.ACTIVE,
    imageUrl: 'https://i.pravatar.cc/150?u=5',
  },
];

export const Default: Story = {
  args: {
    researchers: mockResearchers,
  },
};

export const FewResearchers: Story = {
  args: {
    researchers: mockResearchers.slice(0, 3),
  },
};
