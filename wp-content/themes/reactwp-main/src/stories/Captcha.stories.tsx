import type { Meta, StoryObj } from '@storybook/react-vite';
import { Captcha } from '../components/Captcha';

const meta = {
  title: 'Components/Captcha',
  component: Captcha,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onVerify: { action: 'verified' },
  },
} satisfies Meta<typeof Captcha>;

export default meta;
type Story = StoryObj<typeof meta>;

// Note: Captcha requires a valid site key and internet connection to render properly.
// In a Storybook environment without the proper env vars or domain whitelisting,
// it might show an error or not render fully.

export const Default: Story = {
  args: {
    onVerify: (token: string) => console.log('Captcha verified with token:', token),
  },
};
