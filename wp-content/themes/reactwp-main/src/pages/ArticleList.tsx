import React, { useState, useEffect } from "react";
import { Loader2, UserCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { PaginationControls } from "../components/PaginationControls";
import { useApp } from "../context/AppContext";
import { t } from "../services/stringService";
import { TagCloud } from "../components/TagCloud";
import {
  useEditorialArticles,
  useResearchArticles,
} from "../hooks/useAppQueries";

export const ArticleList: React.FC = () => {
  const { settings, tagsData, isTagsLoading, getTagsFromServer } = useApp();
  const navigate = useNavigate();

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

  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

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
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-lg h-[400px] flex flex-col justify-end cursor-pointer"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="relative z-10 p-8 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
                  <div className="flex gap-2 mb-3">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/tags/${encodeURIComponent(tag)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold text-teal-300 bg-teal-900/50 px-2 py-1 rounded backdrop-blur-md hover:bg-teal-800 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-teal-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-300 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-slate-400 text-sm">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.authorName}</span>
                  </div>
                </div>
              </div>
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
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                    {article.tags.slice(0, 1).map((tag) => (
                      <Link
                        key={tag}
                        to={`/tags/${encodeURIComponent(tag)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm hover:bg-white hover:text-indigo-600 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-sm text-slate-500">
                    <UserCircle className="w-4 h-4" />
                    <span>{article.authorName}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                    <span>{article.date}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClick(article.id);
                      }}
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      {t("articlelist_read_more")}
                    </button>
                  </div>
                </div>
              </div>
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
