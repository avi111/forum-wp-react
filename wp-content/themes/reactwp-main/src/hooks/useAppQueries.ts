import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useResearchers = () => {
  return useQuery({
    queryKey: ["researchers"],
    queryFn: api.fetchResearchers,
  });
};

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: api.fetchArticles,
  });
};

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: api.fetchNews,
  });
};

export const useEvents = (
  page = 1,
  limit = 100,
  timeFilter: "future" | "past" | "all" = "all",
) => {
  return useQuery({
    queryKey: ["events", page, limit, timeFilter],
    queryFn: () => api.fetchEvents(page, limit, timeFilter),
    placeholderData: keepPreviousData,
  });
};

export const useMeetings = () => {
  return useQuery({
    queryKey: ["meetings"],
    queryFn: api.fetchMeetings,
  });
};

export const useTrainings = () => {
  return useQuery({
    queryKey: ["trainings"],
    queryFn: api.fetchTrainings,
  });
};
