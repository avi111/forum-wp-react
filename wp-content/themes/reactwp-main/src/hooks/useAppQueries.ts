import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAPI } from "../services/api";
import { useState, useMemo } from "react";

export const useSettings = () => {
  const { fetchSettings } = useAPI();
  return useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });
};

export const useTemplate = (templateName: string) => {
  const { fetchTemplate } = useAPI();

  return useQuery({
    queryKey: ["template", templateName],
    queryFn: () => fetchTemplate(templateName),
    staleTime: 1000 * 60 * 60,
  });
};

export const useResearchers = () => {
  const { fetchResearchers } = useAPI();

  return useQuery({
    queryKey: ["researchers"],
    queryFn: fetchResearchers,
    enabled: false,
  });
};

export const useArticles = () => {
  const { fetchArticles } = useAPI();

  return useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    enabled: false,
  });
};

export const useNews = () => {
  const { fetchNews } = useAPI();

  return useQuery({
    // Added a version number to the key to invalidate the cache
    queryKey: ["news", "v2"],
    queryFn: fetchNews,
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

  const { fetchEvents } = useAPI();

  const queryInfo = useQuery({
    queryKey: ["events", page, limit, timeFilter],
    queryFn: () => fetchEvents(page, limit, timeFilter),
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
  const { fetchMeetings } = useAPI();

  return useQuery({
    queryKey: ["meetings"],
    queryFn: fetchMeetings,
    enabled: false,
  });
};

export const useTrainings = () => {
  const { fetchTrainings } = useAPI();

  return useQuery({
    queryKey: ["trainings"],
    queryFn: fetchTrainings,
    enabled: false,
  });
};
