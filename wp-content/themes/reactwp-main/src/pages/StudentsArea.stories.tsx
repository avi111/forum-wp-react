import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StudentsArea } from "./StudentsArea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a mock query client for Storybook
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof StudentsArea> = {
  title: "Pages/StudentsArea",
  component: StudentsArea,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div style={{ minHeight: "100vh" }}>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof StudentsArea>;

export const Default: Story = {};
