
import React from "react";
import { Hero } from "../components/Hero";
import { ResearcherCarousel } from "../components/ResearcherCarousel";
import { HomeFeatures } from "../components/HomeFeatures";
import { HomeLatestUpdates } from "../components/HomeLatestUpdates";
import { useApp } from "../context/AppContext";

export const Home: React.FC = () => {
  const { researchers, articles, events, settings } = useApp();

  // Filter articles
  const editorialArticles = articles.filter((a) => a.isEditorial);
  const researcherArticles = articles.filter((a) => !a.isEditorial);

  return (
    <>
      <Hero />

      <HomeFeatures />

      <ResearcherCarousel researchers={researchers} />

      <HomeLatestUpdates
        editorialArticles={editorialArticles}
        researcherArticles={researcherArticles}
        events={events}
        editorialLimit={settings.latestEditorialLimit}
        researchLimit={settings.latestResearchLimit}
      />
    </>
  );
};
