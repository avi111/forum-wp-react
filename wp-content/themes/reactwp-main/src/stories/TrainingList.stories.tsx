import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrainingList } from '../components/TrainingList';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/TrainingList',
  component: TrainingList,
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
} satisfies Meta<typeof TrainingList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTrainings = [
  {
    id: '1',
    category: 'קורס בסיסי',
    title: 'מבוא לפסיכדליה',
    description: 'קורס מקיף המציג את ההיסטוריה, הפרמקולוגיה והשימושים הקליניים של חומרים פסיכדליים.',
    date: '15 ינואר 2024',
    colorTheme: 'teal' as const,
  },
  {
    id: '2',
    category: 'סדנה מתקדמת',
    title: 'אינטגרציה פסיכדלית',
    description: 'סדנה מעשית למטפלים העוסקת בטכניקות אינטגרציה לאחר חוויות פסיכדליות.',
    date: '20 פברואר 2024',
    colorTheme: 'indigo' as const,
  },
  {
    id: '3',
    category: 'הכשרה מקצועית',
    title: 'טיפול ב-MDMA ל-PTSD',
    description: 'הכשרה מקיפה למטפלים המעוניינים להשתלב במחקרים קליניים.',
    date: '10 מרץ 2024',
    colorTheme: 'purple' as const,
  },
];

export const Default: Story = {
  args: {
    trainings: mockTrainings,
  },
};

export const Empty: Story = {
  args: {
    trainings: [],
  },
};
