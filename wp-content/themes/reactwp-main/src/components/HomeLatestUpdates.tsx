import React from "react";
import { Article, CalendarEvent } from "../types";
import { HomeEditorial } from "./HomeEditorial";
import { HomeResearch } from "./HomeResearch";
import { HomeEvents } from "./HomeEvents";

interface HomeLatestUpdatesProps {
  editorialArticles: Article[];
  researcherArticles: Article[];
  events: CalendarEvent[];
  editorialLimit: number;
  researchLimit: number;
}

export const HomeLatestUpdates: React.FC<HomeLatestUpdatesProps> = ({
  editorialArticles,
  researcherArticles,
  events,
  editorialLimit,
  researchLimit,
}) => {
  return (
    <div className="bg-slate-50 border-t border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <HomeEditorial articles={editorialArticles} limit={editorialLimit} />
          <HomeResearch articles={researcherArticles} limit={researchLimit} />
          <HomeEvents events={events} />
        </div>
      </div>
    </div>
  );
};