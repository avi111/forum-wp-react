import {
  INITIAL_ARTICLES,
  INITIAL_RESEARCHERS,
  MOCK_EVENTS,
  MOCK_NEWS,
} from "../mockData";
import { Article, CalendarEvent, NewsItem, Researcher } from "../types";

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

  fetchEvents: async (): Promise<CalendarEvent[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...MOCK_EVENTS];
  },
};
