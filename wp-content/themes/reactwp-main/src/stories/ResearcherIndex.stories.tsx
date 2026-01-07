import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResearcherIndex } from "../pages/ResearcherIndex";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "../context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta = {
  title: "Pages/ResearcherIndex",
  component: ResearcherIndex,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </AppProvider>
      </QueryClientProvider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ResearcherIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
