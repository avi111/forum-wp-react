import type { Meta, StoryObj } from '@storybook/react-vite';
import { EventsList } from '../components/EventsList';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/EventsList',
  component: EventsList,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[800px]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'pageChanged' },
  },
} satisfies Meta<typeof EventsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockEvents = [
  {
    id: '1',
    title: 'כנס הפסיכדליה השנתי 2024',
    date: '2024-05-15',
    day: '15',
    month: 'מאי',
    location: 'אוניברסיטת תל אביב',
    type: 'כנס',
    description: 'הכנס השנתי הגדול ביותר בישראל בתחום המחקר הפסיכדלי.',
  },
  {
    id: '2',
    title: 'סדנת אינטגרציה למטפלים',
    date: '2024-06-01',
    day: '01',
    month: 'יוני',
    location: 'מרכז רפואי שיבא',
    type: 'סדנה',
    description: 'סדנה מעשית למטפלים העוסקת בטכניקות אינטגרציה לאחר חוויות פסיכדליות.',
  },
  {
    id: '3',
    title: 'הרצאה: עתיד הטיפול ב-MDMA',
    date: '2024-06-20',
    day: '20',
    month: 'יוני',
    location: 'זום',
    type: 'הרצאה',
    description: 'הרצאה מרתקת על העתיד של הטיפול ב-MDMA ל-PTSD.',
  },
];

export const Default: Story = {
  args: {
    events: mockEvents,
    totalPages: 3,
    currentPage: 1,
    isLoading: false,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const Loading: Story = {
  args: {
    events: [],
    totalPages: 1,
    currentPage: 1,
    isLoading: true,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const LoadingWithData: Story = {
  args: {
    events: mockEvents,
    totalPages: 3,
    currentPage: 1,
    isLoading: true,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const Empty: Story = {
  args: {
    events: [],
    totalPages: 1,
    currentPage: 1,
    isLoading: false,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};
