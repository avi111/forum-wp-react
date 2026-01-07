import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResearchersFilter } from "../components/ResearchersFilter";
import { MemoryRouter } from "react-router-dom";
import { ResearchersFilterProvider } from "../context/ResearchersFilterContext";

const meta = {
  title: "Components/ResearchersFilter",
  component: ResearchersFilter,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ResearchersFilterProvider>
          <Story />
        </ResearchersFilterProvider>
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ResearchersFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
