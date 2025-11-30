import { useQuery } from "@tanstack/react-query";
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

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: api.fetchEvents,
  });
};
