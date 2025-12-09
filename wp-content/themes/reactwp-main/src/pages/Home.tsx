import React, { useEffect } from "react";
import { Hero } from "../components/Hero";
import { ResearcherCarousel } from "../components/ResearcherCarousel";
import { HomeFeatures } from "../components/HomeFeatures";
import { HomeLatestUpdates } from "../components/HomeLatestUpdates";
import { useApp } from "../context/AppContext";
import { useEvents } from "../hooks/useAppQueries";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Home: React.FC = () => {
  const {
    researchers,
    articles,
    settings,
    getResearchersFromServer,
    getArticlesFromServer,
  } = useApp();
  const navigate = useNavigate();

  // Fetch events specifically for this component
  const { data: eventsData, setTimeFilter } = useEvents({
    limit: 3,
    timeFilter: "future",
  });
  const events = eventsData?.data || [];

  useEffect(() => {
    // Set filter and fetch initial data for components on this page
    setTimeFilter("future");
    if (researchers.length === 0) getResearchersFromServer();
    if (articles.length === 0) getArticlesFromServer();
  }, [
    getResearchersFromServer,
    getArticlesFromServer,
    setTimeFilter,
    researchers.length,
    articles.length,
  ]);

  // Filter articles
  const editorialArticles = articles.filter((a) => a.isEditorial);
  const researcherArticles = articles.filter((a) => !a.isEditorial);

  return (
    <>
      <Hero>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => navigate("/join")}
            className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 px-8 rounded-lg shadow-lg shadow-teal-900/50 transition-all transform hover:scale-105 flex items-center justify-center"
          >
            הצטרפות כחוקר
            <ArrowRight className="w-5 h-5 mr-2" />
          </button>
          <button
            onClick={() => navigate("/about")}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-4 px-8 rounded-lg transition-colors"
          >
            קרא עוד עלינו
          </button>
        </div>
      </Hero>

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
