import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { t } from "../services/stringService";
import { TagCloud } from "../components/TagCloud";
import { EditorialArticlesList } from "../components/EditorialArticlesList";
import { ResearchArticlesList } from "../components/ResearchArticlesList";

export const ArticleList: React.FC = () => {
  const { tagsData, isTagsLoading, getTagsFromServer } = useApp();

  // Load tags data for TagCloud only when this page is mounted
  useEffect(() => {
    if (!tagsData && !isTagsLoading) {
      getTagsFromServer();
    }
  }, [tagsData, isTagsLoading, getTagsFromServer]);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          {t("articlelist_page_title")}
        </h2>
        <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      {/* Tag Cloud Section */}
      {isTagsLoading && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-16">
          <div className="h-6 w-48 bg-slate-100 rounded mb-4 animate-pulse" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-16 bg-slate-100 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      )}
      <TagCloud tagsData={tagsData || []} />

      {/* Researcher Articles Section */}
      <ResearchArticlesList />

      {/* Editorial / Featured Section */}
      <EditorialArticlesList />
    </div>
  );
};
