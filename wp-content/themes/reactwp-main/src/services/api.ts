import {
  INITIAL_ARTICLES,
  INITIAL_RESEARCHERS,
  MOCK_EVENTS,
  MOCK_MEETINGS,
  MOCK_NEWS,
  MOCK_SETTINGS,
  MOCK_TEMPLATES,
  MOCK_TRAININGS,
  object,
} from "../mockData";
import {
  AppSettings,
  Article,
  CalendarEvent,
  ContactProps,
  Meeting,
  NewsItem,
  PaginatedResponse,
  Researcher,
  Training,
} from "../types";
import { useCallback } from "react";

export const getAdminAjaxUrl = () => {
  if (import.meta.env.DEV) {
    window.object = object;
  }
  const { site } = window.object || {};
  const { admin_ajax_url: adminAjaxUrl } = site || {};
  return adminAjaxUrl;
};

const SIMULATED_DELAY_MS = 1200;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type WpPostFetcher = <T>(
  action: string,
  data?: Record<string, string | Blob>,
) => Promise<T>;

export const useAPI = () => {
  const post: WpPostFetcher = useCallback(async (action, data = {}) => {
    const url = getAdminAjaxUrl();
    if (!url) {
      throw new Error("Admin AJAX URL is not configured.");
    }

    const formData = new FormData();
    formData.append("action", action);

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        formData.append(key, data[key]);
      }
    }

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    try {
      const responseData = JSON.parse(responseText);
      if (responseData.success === false) {
        throw new Error(
          `WordPress AJAX error: ${responseData.data?.message || "Unknown error"}`,
        );
      }
      return responseData.data;
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      throw new Error(`Failed to parse JSON response: ${responseText}`);
    }
  }, []);

  const fetchCurrentUser = useCallback(async (): Promise<Researcher | null> => {
    try {
      return await post("fetchCurrentUser");
    } catch (error) {
      console.warn(
        "Failed to fetch current user from server, assuming logged out.",
        error,
      );
      if (import.meta.env.DEV) {
        // In dev, you might want to return a mock user for testing
        // return INITIAL_RESEARCHERS[0];
        return null;
      }
      throw error;
    }
  }, [post]);

  const fetchTemplate = useCallback(
    async (templateName: string): Promise<string | null> => {
      try {
        return await post("fetchTemplate", { name: templateName });
      } catch (error) {
        console.warn(
          `Failed to fetch template '${templateName}' from server, falling back to mock.`,
          error,
        );
        if (import.meta.env.DEV) {
          await delay(200);
          return MOCK_TEMPLATES[templateName] || null;
        }
        throw error;
      }
    },
    [post],
  );

  const fetchSettings = useCallback(async (): Promise<AppSettings> => {
    try {
      return await post("fetchSettings");
    } catch (error) {
      console.warn(
        "Failed to fetch settings from server, falling back to mock.",
        error,
      );
      if (import.meta.env.DEV) {
        await delay(500);
        return { ...MOCK_SETTINGS };
      }
      throw error;
    }
  }, [post]);

  const fetchResearchers = useCallback(async (): Promise<Researcher[]> => {
    try {
      return await post("fetchResearchers");
    } catch (error) {
      console.warn(
        "Failed to fetch researchers from server, falling back to mock.",
        error,
      );
      if (import.meta.env.DEV) {
        await delay(SIMULATED_DELAY_MS);
        return [...INITIAL_RESEARCHERS];
      }
      throw error;
    }
  }, [post]);

  const fetchArticles = useCallback(async (): Promise<Article[]> => {
    try {
      return await post("fetchArticles");
    } catch (error) {
      console.warn(
        "Failed to fetch articles from server, falling back to mock.",
        error,
      );
      if (import.meta.env.DEV) {
        await delay(SIMULATED_DELAY_MS);
        return [...INITIAL_ARTICLES];
      }
      throw error;
    }
  }, [post]);

  const fetchNews = useCallback(async (): Promise<NewsItem[]> => {
    try {
      return await post("fetchNews");
    } catch (error) {
      console.warn(
        "Failed to fetch news from server, falling back to mock.",
        error,
      );
      if (import.meta.env.DEV) {
        await delay(SIMULATED_DELAY_MS);
        return [...MOCK_NEWS];
      }
      throw error;
    }
  }, [post]);

  const fetchEvents = useCallback(
    async (
      page = 1,
      limit = 100,
      timeFilter: "future" | "past" | "all" = "all",
    ): Promise<PaginatedResponse<CalendarEvent>> => {
      try {
        return await post("fetchEvents", {
          page: `${page}`,
          limit: `${limit}`,
          timeFilter,
        });
      } catch (error) {
        console.warn(
          "Failed to fetch events from server, falling back to mock.",
          error,
        );
        if (import.meta.env.DEV) {
          await delay(SIMULATED_DELAY_MS);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          let filteredEvents = MOCK_EVENTS;
          if (timeFilter === "future") {
            filteredEvents = MOCK_EVENTS.filter(
              (event) => new Date(event.date) >= now,
            );
          } else if (timeFilter === "past") {
            filteredEvents = MOCK_EVENTS.filter(
              (event) => new Date(event.date) < now,
            );
          }
          if (timeFilter === "past") {
            filteredEvents.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            );
          } else {
            filteredEvents.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            );
          }
          const start = (page - 1) * limit;
          const end = start + limit;
          const data = filteredEvents.slice(start, end);
          return { data, total: filteredEvents.length };
        }
        throw error;
      }
    },
    [post],
  );

  const fetchMeetings = useCallback(async (): Promise<Meeting[]> => {
    try {
      return await post("fetchMeetings");
    } catch (error) {
      console.warn(
        "Failed to fetch meetings from server, falling back to mock.",
        error,
      );
      if (import.meta.env.DEV) {
        await delay(SIMULATED_DELAY_MS);
        return [...MOCK_MEETINGS];
      }
      throw error;
    }
  }, [post]);

  const fetchTrainings = useCallback(async (): Promise<Training[]> => {
    try {
      return await post("fetchTrainings");
    } catch (error) {
      console.warn(
        "Failed to fetch trainings from server, falling back to mock.",
        error,
      );
      if (import.meta.env.DEV) {
        await delay(SIMULATED_DELAY_MS);
        return [...MOCK_TRAININGS];
      }
      throw error;
    }
  }, [post]);

  const sendContactMessage = useCallback(
    async (data: ContactProps): Promise<void> => {
      try {
        await post("sendContactMessage", data);
      } catch (error) {
        console.error("Failed to send contact message:", error);
        // Optionally, handle the error in the UI
      }
    },
    [post],
  );

  return {
    post,
    fetchCurrentUser,
    fetchSettings,
    fetchTemplate,
    fetchResearchers,
    fetchArticles,
    fetchNews,
    fetchEvents,
    fetchMeetings,
    fetchTrainings,
    sendContactMessage,
  };
};
