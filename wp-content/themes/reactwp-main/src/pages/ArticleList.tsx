import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PaginationControls } from "../components/PaginationControls";
import { useApp } from "../context/AppContext";
import { t } from "../services/stringService";
import { TagCloud } from "../components/TagCloud";
import {
  useEditorialArticles,
  useResearchArticles,
} from "../hooks/useAppQueries";
import { ArticleCard } from "../components/ArticleCard";
import { EditorialCard } from "../components/EditorialCard";

export const ArticleList: React.FC = () => {
  const { settings, tagsData, isTagsLoading, getTagsFromServer } = useApp();

  // State for separate pagination
  const [editorialPage, setEditorialPage] = useState(1);
  const [researcherPage, setResearcherPage] = useState(1);

  // Fetch paginated lists (lazy load per page)
  const editorialQuery = useEditorialArticles(
    editorialPage,
    settings.editorialItemsPerPage,
  );
  const researcherQuery = useResearchArticles(
    researcherPage,
    settings.researcherItemsPerPage,
  );

  // Load tags data for TagCloud only when this page is mounted
  useEffect(() => {
    if (!tagsData && !isTagsLoading) {
      getTagsFromServer();
    }
  }, [tagsData, isTagsLoading, getTagsFromServer]);

  // Data + totals from server
  const currentEditorialArticles = editorialQuery.data?.data || [];
  const totalEditorialPages = editorialQuery.data
    ? Math.ceil(editorialQuery.data.total / settings.editorialItemsPerPage)
    : 0;

  const currentResearcherArticles = researcherQuery.data?.data || [];
  const totalResearcherPages = researcherQuery.data
    ? Math.ceil(researcherQuery.data.total / settings.researcherItemsPerPage)
    : 0;

  const handleEditorialPageChange = (page: number) => {
    setEditorialPage(page);
  };

  const handleResearcherPageChange = (page: number) => {
    setResearcherPage(page);
  };

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

      {/* Editorial / Featured Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="w-2 h-8 bg-indigo-600 rounded ml-3"></span>
          {t("articlelist_editorial_section_title")}
        </h3>
        {editorialQuery.isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {currentEditorialArticles.map((article) => (
              <EditorialCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <PaginationControls
          currentPage={editorialPage}
          totalPages={totalEditorialPages}
          onPageChange={handleEditorialPageChange}
        />
      </div>

      {/* Researcher Articles Section */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="w-2 h-8 bg-teal-500 rounded ml-3"></span>
          {t("articlelist_researcher_section_title")}
        </h3>
        {researcherQuery.isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {currentResearcherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <PaginationControls
          currentPage={researcherPage}
          totalPages={totalResearcherPages}
          onPageChange={handleResearcherPageChange}
        />
      </div>
    </div>
  );
};
