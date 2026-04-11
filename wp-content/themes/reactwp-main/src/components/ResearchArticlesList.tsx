import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { PaginationControls } from "./PaginationControls";
import { useApp } from "../context/AppContext";
import { t } from "../services/stringService";
import { useResearchArticles } from "../hooks/useAppQueries";
import { ArticleCard } from "./ArticleCard";

export const ResearchArticlesList: React.FC = () => {
  const { settings } = useApp();
  const [researcherPage, setResearcherPage] = useState(1);

  const researcherQuery = useResearchArticles(
    researcherPage,
    settings.researcherItemsPerPage,
  );

  const currentResearcherArticles = researcherQuery.data?.data || [];
  const totalResearcherPages = researcherQuery.data
    ? Math.ceil(researcherQuery.data.total / settings.researcherItemsPerPage)
    : 0;

  const handleResearcherPageChange = (page: number) => {
    setResearcherPage(page);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
        <span className="w-2 h-8 bg-teal-500 rounded ml-3"></span>
        {t("articlelist_researcher_section_title")}
      </h3>
      {researcherQuery.isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
        </div>
      ) : currentResearcherArticles.length === 0 ? (
        <div className="text-center py-16 text-slate-600">
          {t("no_research_articles_found")}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {currentResearcherArticles.map((article) => (
            <ArticleCard key={article.id} article={article} showImage={false} />
          ))}
        </div>
      )}

      {currentResearcherArticles.length > 0 && (
        <PaginationControls
          currentPage={researcherPage}
          totalPages={totalResearcherPages}
          onPageChange={handleResearcherPageChange}
        />
      )}
    </div>
  );
};
