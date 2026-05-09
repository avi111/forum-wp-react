import { useEffect } from "react";
import { useApp } from "../context/AppContext";

/**
 * Hook to set the page title in the format: Page Name | Site Name | Site Description
 * @param pageTitle The name of the current page
 */
export const usePageTitle = (pageTitle: string | undefined) => {
  const { site } = useApp();

  useEffect(() => {
    const siteName = site?.site_name || "IPRF";
    const siteDescription = site?.site_description || "";

    let fullTitle = "";
    if (pageTitle) {
      fullTitle = `${pageTitle} | ${siteName}`;
    } else {
      fullTitle = siteName;
    }

    if (siteDescription) {
      fullTitle += ` | ${siteDescription}`;
    }

    document.title = fullTitle;
  }, [pageTitle, site]);
};
