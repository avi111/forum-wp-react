import React, { useState } from "react";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PaginationControls } from "../components/PaginationControls";
import { useApp } from "../context/AppContext";
import { t } from "../services/stringService";

export const ArticleList: React.FC = () => {
  const { articles, settings } = useApp();
  const navigate = useNavigate();

  // State for separate pagination
  const [editorialPage, setEditorialPage] = useState(1);
  const [researcherPage, setResearcherPage] = useState(1);

  // Filter articles
  const allEditorialArticles = articles.filter((a) => a.isEditorial);
  const allResearcherArticles = articles.filter((a) => !a.isEditorial);

  // Calculate Pagination for Editorials
  const totalEditorialPages = Math.ceil(
    allEditorialArticles.length / settings.editorialItemsPerPage,
  );
  const currentEditorialArticles = allEditorialArticles.slice(
    (editorialPage - 1) * settings.editorialItemsPerPage,
    editorialPage * settings.editorialItemsPerPage,
  );

  // Calculate Pagination for Researchers
  const totalResearcherPages = Math.ceil(
    allResearcherArticles.length / settings.researcherItemsPerPage,
  );
  const currentResearcherArticles = allResearcherArticles.slice(
    (researcherPage - 1) * settings.researcherItemsPerPage,
    researcherPage * settings.researcherItemsPerPage,
  );

  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  const handleEditorialPageChange = (page: number) => {
    setEditorialPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResearcherPageChange = (page: number) => {
    setResearcherPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          {t("articleList_page_title")}
        </h2>
        <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      {/* Editorial / Featured Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="w-2 h-8 bg-indigo-600 rounded ml-3"></span>
          {t("articleList_editorial_section_title")}
        </h3>
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
                    <span
                      key={tag}
                      className="text-xs font-bold text-teal-300 bg-teal-900/50 px-2 py-1 rounded backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-teal-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-300 line-clamp-2">{article.excerpt}</p>
                <div className="mt-4 flex items-center text-slate-400 text-sm">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.authorName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

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
          {t("articleList_researcher_section_title")}
        </h3>
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {article.tags[0]}
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
                    {t("articleList_read_more")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <PaginationControls
          currentPage={researcherPage}
          totalPages={totalResearcherPages}
          onPageChange={handleResearcherPageChange}
        />
      </div>
    </div>
  );
};
