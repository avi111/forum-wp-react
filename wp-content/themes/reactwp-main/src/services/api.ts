import {
  INITIAL_ARTICLES,
  INITIAL_RESEARCHERS,
  MOCK_EVENTS,
  MOCK_MEETINGS,
  MOCK_NEWS,
  MOCK_TRAININGS,
} from "../mockData";
import {
  Article,
  CalendarEvent,
  Meeting,
  NewsItem,
  PaginatedResponse,
  Researcher,
  Training,
} from "../types";

const SIMULATED_DELAY_MS = 1200;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  fetchResearchers: async (): Promise<Researcher[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...INITIAL_RESEARCHERS];
  },

  fetchArticles: async (): Promise<Article[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...INITIAL_ARTICLES];
  },

  fetchNews: async (): Promise<NewsItem[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...MOCK_NEWS];
  },

  fetchEvents: async (
    page = 1,
    limit = 100,
    timeFilter: "future" | "past" | "all" = "all",
  ): Promise<PaginatedResponse<CalendarEvent>> => {
    await delay(SIMULATED_DELAY_MS);

    // Filter by date based on timeFilter
    const now = new Date();
    // Reset hours to 0 to compare dates only, or keep time if needed.
    // Setting hours to 0,0,0,0 allows "today's" events to be considered future/present.
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

    // Sort: Future events ascending, Past events descending
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
  },

  fetchMeetings: async (): Promise<Meeting[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...MOCK_MEETINGS];
  },

  fetchTrainings: async (): Promise<Training[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...MOCK_TRAININGS];
  },
};
