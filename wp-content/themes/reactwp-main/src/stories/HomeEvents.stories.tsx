import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeEvents } from '../components/HomeEvents';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/HomeEvents',
  component: HomeEvents,
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
} satisfies Meta<typeof HomeEvents>;

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
  },
  {
    id: '2',
    title: 'סדנת אינטגרציה למטפלים',
    date: '2024-06-01',
    day: '01',
    month: 'יוני',
    location: 'מרכז רפואי שיבא',
    type: 'סדנה',
  },
  {
    id: '3',
    title: 'הרצאה: עתיד הטיפול ב-MDMA',
    date: '2024-06-20',
    day: '20',
    month: 'יוני',
    location: 'זום',
    type: 'הרצאה',
  },
];

export const Default: Story = {
  args: {
    events: mockEvents,
  },
};

export const Empty: Story = {
  args: {
    events: [],
  },
};

export const SingleEvent: Story = {
  args: {
    events: [mockEvents[0]],
  },
};
