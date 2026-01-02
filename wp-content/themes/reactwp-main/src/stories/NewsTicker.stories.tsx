import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsTicker } from '../components/NewsTicker';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/NewsTicker',
  component: NewsTicker,
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
} satisfies Meta<typeof NewsTicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNews = [
  {
    id: '1',
    title: 'פורסם קול קורא למחקרים חדשים',
    date: '15.01.24',
    link: '#',
    content: 'משרד הבריאות פרסם קול קורא למחקרים בתחום הפסיכדליה. מועד אחרון להגשה: 1.3.24.',
  },
  {
    id: '2',
    title: 'כנס שנתי - הרשמה מוקדמת',
    date: '10.01.24',
    link: '#',
    content: 'ההרשמה לכנס השנתי נפתחה! מחירים מוזלים לנרשמים עד סוף החודש.',
  },
  {
    id: '3',
    title: 'וובינר בנושא אינטגרציה',
    date: '05.01.24',
    link: '#',
    content: 'הצטרפו אלינו לוובינר מרתק עם מומחים מהארץ ומהעולם.',
  },
];

export const Default: Story = {
  args: {
    news: mockNews,
  },
};
