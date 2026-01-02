import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from '../components/Navbar';
import { PageView, UserStatus } from '../types';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AppProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AppProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: 'ראשי', view: PageView.HOME },
  { label: 'חוקרים', view: PageView.RESEARCHERS },
  { label: 'הכשרות', view: PageView.TRAINING },
  { label: 'אירועים', view: PageView.EVENTS },
  { label: 'מאמרים', view: PageView.ARTICLES },
  { label: 'צור קשר', view: PageView.CONTACT },
];

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    onLogout: () => {},
    navItems: navItems,
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    onLogout: () => console.log('Logout clicked'),
    navItems: navItems,
    currentUser: {
      id: '1',
      firstName: 'ישראל',
      lastName: 'ישראלי',
      email: 'israel@example.com',
      institution: 'אוניברסיטת תל אביב',
      specialization: 'פסיכיאטריה',
      bio: '',
      status: UserStatus.ACTIVE,
    },
  },
};
