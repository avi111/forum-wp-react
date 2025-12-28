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

export const getRestUrl = () => {
  if (import.meta.env.DEV) {
    window.object = object;
  }
  const { site } = window.object || {};
  const { rest_url: restUrl } = site || {};
  return restUrl;
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
        const value = data[key];
        // Handle arrays (like subSpecializations)
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, value);
        }
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
          responseData.data?.message || "Unknown error from server",
        );
      }
      return responseData.data;
    } catch (e) {
      // If it's already an error object from the previous block, rethrow it
      if (
        e instanceof Error &&
        e.message !== `Failed to parse JSON response: ${responseText}`
      ) {
        throw e;
      }
      console.error("Failed to parse JSON response:", e);
      throw new Error(`Failed to parse JSON response: ${responseText}`);
    }
  }, []);

  const submitJoinForm = useCallback(
    async (data: any): Promise<{ message: string }> => {
      try {
        return await post("join_form_submit", data);
      } catch (error) {
        if (import.meta.env.DEV) {
          await delay(1000);
          return { message: "ההרשמה בוצעה בהצלחה (Mock)" };
        }
        throw error;
      }
    },
    [post],
  );

  const sendContactForm7 = useCallback(
    async (formId: number, data: Record<string, string>) => {
      const restUrl = getRestUrl();
      if (!restUrl) {
        console.warn("REST URL not found, falling back to mock.");
        if (import.meta.env.DEV) {
          await delay(1000);
          return { status: "mail_sent", message: "ההודעה נשלחה בהצלחה (Mock)" };
        }
        throw new Error("REST URL is not configured.");
      }

      const url = `${restUrl}contact-form-7/v1/contact-forms/${formId}/feedback`;
      const formData = new FormData();

      // Add required CF7 hidden fields
      formData.append("_wpcf7", formId.toString());
      formData.append("_wpcf7_version", "5.9.3"); // Example version
      formData.append("_wpcf7_locale", "he_IL");
      formData.append("_wpcf7_unit_tag", `wpcf7-f${formId}-p1-o1`);
      formData.append("_wpcf7_container_post", "0");

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          formData.append(key, data[key]);
        }
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        return await response.json();
      } catch (error) {
        console.error("CF7 submission failed:", error);
        throw error;
      }
    },
    [],
  );

  const subscribeToNewsletter = useCallback(
    async (email: string): Promise<{ success: boolean; message: string }> => {
      try {
        return await post("subscribe_newsletter", { email });
      } catch (error) {
        console.error("Newsletter subscription failed:", error);
        return {
          success: false,
          message: "אירעה שגיאה בתקשורת עם השרת.",
        };
      }
    },
    [post],
  );

  const fetchCurrentUser = useCallback(async (): Promise<Researcher | null> => {
    try {
      return await post("fetchCurrentUser");
    } catch (error) {
      console.warn(
        "Failed to fetch current user from server, assuming logged out.",
        error,
      );
      if (import.meta.env.DEV) {
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

  const fetchArticlesPaged = useCallback(
    async (
      type: "editorial" | "research" | "",
      page: number,
      limit: number,
      tag?: string,
    ): Promise<PaginatedResponse<Article>> => {
      try {
        const payload: Record<string, string> = {
          type,
          page: `${page}`,
          limit: `${limit}`,
        };
        if (tag && tag.trim()) {
          payload.tag = tag.trim();
        }
        return await post("fetchArticlesPaged", payload);
      } catch (error) {
        console.warn(
          "Failed to fetch paged articles from server, falling back to mock. If you're on DEV this is expected.",
          error,
        );
        if (import.meta.env.DEV) {
          await delay(300);
          let filtered = [...INITIAL_ARTICLES];
          if (type === "editorial") {
            filtered = filtered.filter((a) => a.isEditorial === true);
          } else if (type === "research") {
            filtered = filtered.filter((a) => a.isEditorial === false);
          }
          if (tag && tag.trim()) {
            const tagNorm = tag.trim();
            filtered = filtered.filter((a) => a.tags.includes(tagNorm));
          }
          const total = filtered.length;
          const start = (page - 1) * limit;
          const end = start + limit;
          const data = filtered.slice(start, end);
          return { data, total };
        }
        throw error;
      }
    },
    [post],
  );

  const fetchTags = useCallback(async (): Promise<
    { tag: string; count: number }[]
  > => {
    try {
      return await post("fetchTags");
    } catch (error) {
      console.warn(
        "Failed to fetch tags from server, falling back to mock.",
        error,
      );
      if (import.meta.env.DEV) {
        await delay(300);
        const counts: Record<string, number> = {};
        INITIAL_ARTICLES.forEach((a) => {
          a.tags.forEach((tag) => {
            counts[tag] = (counts[tag] || 0) + 1;
          });
        });
        return Object.entries(counts).map(([tag, count]) => ({
          tag,
          count,
        }));
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
      }
    },
    [post],
  );

  return {
    post,
    submitJoinForm,
    sendContactForm7,
    subscribeToNewsletter,
    fetchCurrentUser,
    fetchSettings,
    fetchTemplate,
    fetchResearchers,
    fetchArticles,
    fetchArticlesPaged,
    fetchTags,
    fetchNews,
    fetchEvents,
    fetchMeetings,
    fetchTrainings,
    sendContactMessage,
  };
};
