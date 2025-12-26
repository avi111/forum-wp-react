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
        case PageView.ARTICLES:
          return "/articles";
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
          return "/login";
        default:
          return "/";
      }
    },
    [site],
  );

  return { getPath };
};
