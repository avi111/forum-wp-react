import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useState, useMemo } from "react";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: api.fetchSettings,
  });
};

export const useTemplate = (templateName: string) => {
  return useQuery({
    queryKey: ["template", templateName],
    queryFn: () => api.fetchTemplate(templateName),
    staleTime: 1000 * 60 * 60,
  });
};

export const useResearchers = () => {
  return useQuery({
    queryKey: ["researchers"],
    queryFn: api.fetchResearchers,
    enabled: false,
  });
};

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: api.fetchArticles,
    enabled: false,
  });
};

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: api.fetchNews,
    enabled: false,
  });
};

export interface UseEventsParams {
  page?: number;
  limit?: number;
  timeFilter?: "future" | "past" | "all";
}

export const useEvents = (initialParams: UseEventsParams = {}) => {
  const [page, setPage] = useState(initialParams.page || 1);
  const [limit, setLimit] = useState(initialParams.limit || 10);
  const [timeFilter, setTimeFilter] = useState(
    initialParams.timeFilter || "all",
  );

  const queryInfo = useQuery({
    queryKey: ["events", page, limit, timeFilter],
    queryFn: () => api.fetchEvents(page, limit, timeFilter),
    placeholderData: keepPreviousData,
  });

  const totalPages = useMemo(() => {
    return queryInfo.data ? Math.ceil(queryInfo.data.total / limit) : 0;
  }, [queryInfo.data, limit]);

  return {
    ...queryInfo,
    page,
    setPage,
    limit,
    setLimit,
    timeFilter,
    setTimeFilter,
    totalPages,
  };
};

export const useMeetings = () => {
  return useQuery({
    queryKey: ["meetings"],
    queryFn: api.fetchMeetings,
    enabled: false,
  });
};

export const useTrainings = () => {
  return useQuery({
    queryKey: ["trainings"],
    queryFn: api.fetchTrainings,
    enabled: false,
  });
};