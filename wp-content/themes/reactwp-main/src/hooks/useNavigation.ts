import { useCallback } from "react";
import { PageView } from "../types";
import { useApp } from "../context/AppContext";

export const useNavigation = () => {
  const { site } = useApp();

  const getPath = useCallback(
    (view: PageView) => {
      switch (view) {
        case PageView.HOME:
          return "/";
        case PageView.RESEARCHERS:
          return "/researchers";
        case PageView.RESEARCH_ARTICLES: // Updated from SCIENTIFIC_ARTICLES
          return "/research-articles";
        case PageView.EDITORIAL_ARTICLES:
          return "/editorial-articles";
        case PageView.TRAINING:
          return "/training";
        case PageView.EVENTS:
          return "/events";
        case PageView.CONTACT:
          return "/contact";
        case PageView.JOIN:
          return "/join";
        case PageView.DASHBOARD:
          return site.site_url + "/wp-admin/";
        case PageView.MEETINGS:
          return "/meetings";
        case PageView.LOGIN:
          return site.site_url + "/wp-admin/";
        case PageView.STUDENTS:
          return "/students";
        case PageView.RESEARCH_TOOLS:
          return "/research-tools";
        default:
          return "/";
      }
    },
    [site],
  );

  return { getPath };
};
