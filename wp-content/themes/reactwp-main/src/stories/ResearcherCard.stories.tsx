import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResearcherCard } from '../components/ResearcherCard';
import { UserStatus } from '../types';

const meta = {
  title: 'Components/ResearcherCard',
  component: ResearcherCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: 'radio',
      options: ['default', 'carousel'],
      description: 'Determines the visual style of the card',
    },
  },
} satisfies Meta<typeof ResearcherCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockResearcher = {
  id: '1',
  firstName: 'ד"ר',
  lastName: 'ישראל ישראלי',
  email: 'israel@example.com',
  institution: 'אוניברסיטת תל אביב',
  specialization: 'פסיכיאטריה',
  bio: 'חוקר מוביל בתחום הטיפול בפוסט טראומה באמצעות MDMA. בעל ניסיון של מעל 15 שנה במחקר קליני.',
  status: UserStatus.ACTIVE,
  imageUrl: 'https://i.pravatar.cc/150?u=1',
};

export const Default: Story = {
  args: {
    researcher: mockResearcher,
    variant: 'default',
    onClick: (id: string) => console.log('Clicked researcher:', id),
  },
};

export const CarouselVariant: Story = {
  args: {
    researcher: mockResearcher,
    variant: 'carousel',
    onClick: (id: string) => console.log('Clicked researcher:', id),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LongBio: Story = {
  args: {
    researcher: {
      ...mockResearcher,
      bio: 'זהו ביוגרפיה ארוכה מאוד שנועדה לבדוק כיצד הכרטיס מתמודד עם טקסט ארוך. ' +
           'הטקסט אמור להיחתך אחרי מספר שורות מסוים (line-clamp). ' +
           'אנחנו רוצים לוודא שהעיצוב נשמר גם כאשר יש הרבה מלל בתיאור החוקר. ' +
           'המשך טקסט סתמי כדי למלא את המקום ולראות את ההשפעה על התצוגה. ' +
           'עוד קצת טקסט כדי להיות בטוחים שזה מספיק ארוך.',
    },
    variant: 'default',
    onClick: (id: string) => console.log('Clicked researcher:', id),
  },
};

export const LongName: Story = {
  args: {
    researcher: {
      ...mockResearcher,
      firstName: 'פרופ\' ד"ר',
      lastName: 'אלכסנדר מוחמד אבן סינא',
    },
    variant: 'default',
    onClick: (id: string) => console.log('Clicked researcher:', id),
  },
};
