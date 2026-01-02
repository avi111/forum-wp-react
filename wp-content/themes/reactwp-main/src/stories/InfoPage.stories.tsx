import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoPage } from '../components/InfoPage';
import { Info } from 'lucide-react';

const meta = {
  title: 'Components/InfoPage',
  component: InfoPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InfoPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'אודות הפורום',
    icon: Info,
    children: (
      <>
        <p>
          הפורום הישראלי למחקר פסיכדלי הוקם במטרה לקדם את המחקר המדעי והקליני בתחום החומרים משני התודעה בישראל.
        </p>
        <h3>מטרות הפורום</h3>
        <ul>
          <li>יצירת רשת שיתוף פעולה בין חוקרים</li>
          <li>קידום רגולציה מבוססת מדע</li>
          <li>הנגשת מידע לציבור הרחב</li>
        </ul>
        <p>
          אנו מאמינים כי לחומרים פסיכדליים פוטנציאל רב לטיפול במגוון הפרעות נפשיות, וכי מחקר אחראי ומבוקר הוא המפתח למימוש פוטנציאל זה.
        </p>
      </>
    ),
  },
};
