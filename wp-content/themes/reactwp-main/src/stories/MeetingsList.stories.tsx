import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeetingsList } from '../components/MeetingsList';

const meta = {
  title: 'Components/MeetingsList',
  component: MeetingsList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MeetingsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMeetings = [
  {
    id: '1',
    date: '2024-03-10',
    day: '10',
    month: 'מרץ',
    title: 'מפגש חוקרים חודשי',
    description: 'דיון בנושא אתיקה במחקר פסיכדלי והצגת מקרי בוחן.',
    buttonText: 'הרשמה למפגש',
  },
  {
    id: '2',
    date: '2024-04-05',
    day: '05',
    month: 'אפריל',
    title: 'וובינר: חידושים בטיפול ב-PTSD',
    description: 'הרצאת אורח של ד"ר ריק דובלין מ-MAPS.',
    buttonText: 'צפייה בשידור',
  },
];

export const Default: Story = {
  args: {
    meetings: mockMeetings,
  },
};

export const Empty: Story = {
  args: {
    meetings: [],
  },
};
