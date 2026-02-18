import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "../components/Footer";
import { UserStatus } from "../types";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "../context/AppContext";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
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
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentUser: null,
  },
};

export const WithPendingUser: Story = {
  args: {
    currentUser: {
      id: "1",
      firstName: "ישראל",
      lastName: "ישראלי",
      email: "israel@example.com",
      institution: "אוניברסיטת תל אביב",
      bio: "",
      status: UserStatus.PENDING,
    },
    onSimulateApproval: () => alert("Simulated Approval Clicked"),
  },
};
