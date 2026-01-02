import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrainingCard } from '../components/TrainingCard';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/TrainingCard',
  component: TrainingCard,
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
} satisfies Meta<typeof TrainingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTraining = {
  id: '1',
  category: 'קורס בסיסי',
  title: 'מבוא לפסיכדליה',
  description: 'קורס מקיף המציג את ההיסטוריה, הפרמקולוגיה והשימושים הקליניים של חומרים פסיכדליים.',
  date: '15 ינואר 2024',
  colorTheme: 'teal' as const,
};

export const TealTheme: Story = {
  args: {
    training: mockTraining,
  },
};

export const IndigoTheme: Story = {
  args: {
    training: {
      ...mockTraining,
      category: 'סדנה מתקדמת',
      title: 'אינטגרציה פסיכדלית',
      colorTheme: 'indigo',
    },
  },
};

export const LongDescription: Story = {
  args: {
    training: {
      ...mockTraining,
      description: 'זהו תיאור ארוך מאוד שנועד לבדוק את התנהגות הכרטיס כאשר יש הרבה טקסט. ' +
                   'הטקסט אמור להיחתך אחרי שלוש שורות (line-clamp-3). ' +
                   'חשוב לוודא שהעיצוב נשמר ולא נשבר, ושהכרטיס שומר על גובה אחיד יחסית או מתרחב בצורה נעימה לעין. ' +
                   'עוד טקסט למילוי המקום.',
    },
  },
};
