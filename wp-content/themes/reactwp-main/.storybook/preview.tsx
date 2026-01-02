import type { Preview } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/index.css";
import { InjectedProps } from "../src/types";
import { ToastProvider } from "../src/context/ToastContext";
import { AppProvider } from "../src/context/AppContext";

// Extend the Window interface to include the 'object' property
declare global {
  interface Window {
    object: InjectedProps;
  }
}

// Mock the global window object
window.object = {
  site: {
    site_name: "Israel Psychedelic Research Forum",
    site_description: "A forum for psychedelic research in Israel",
    site_url: "http://localhost:3000",
    rest_url: "http://localhost:3000/wp-json",
    home_url: "http://localhost:3000",
    admin_email: "admin@example.com",
    charset: "UTF-8",
    timezone: "Asia/Jerusalem",
    date_format: "d/m/Y",
    time_format: "H:i",
    start_of_week: "0",
    language: "he-IL",
    admin_ajax_url: "http://localhost:3000/wp-admin/admin-ajax.php",
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ direction: "rtl", width: "100%", minHeight: "100vh" }}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AppProvider>
              <Story />
            </AppProvider>
          </ToastProvider>
        </QueryClientProvider>
      </div>
    ),
  ],
};

export default preview;
