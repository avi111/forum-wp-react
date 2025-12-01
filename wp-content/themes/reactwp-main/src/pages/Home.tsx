import React from "react";
import { Hero } from "../components/Hero";
import { ResearcherCarousel } from "../components/ResearcherCarousel";
import { HomeFeatures } from "../components/HomeFeatures";
import { HomeLatestUpdates } from "../components/HomeLatestUpdates";
import { Article, CalendarEvent, Researcher } from "../types";
import { useLocation } from "react-router-dom";

interface HomeProps {
  researchers: Researcher[];
  articles: Article[];
  events: CalendarEvent[];
}

export const Home: React.FC<HomeProps> = ({
  researchers,
  articles,
  events,
}) => {
  const location = useLocation();

  console.log(location);

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
      />
    </>
  );
};
