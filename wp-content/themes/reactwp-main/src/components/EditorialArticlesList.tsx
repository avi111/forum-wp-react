import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { PaginationControls } from "./PaginationControls";
import { useApp } from "../context/AppContext";
import { t } from "../services/stringService";
import { useEditorialArticles } from "../hooks/useAppQueries";
import { EditorialCard } from "./EditorialCard";

export const EditorialArticlesList: React.FC = () => {
  const { settings } = useApp();
  const [editorialPage, setEditorialPage] = useState(1);

  const editorialQuery = useEditorialArticles(
    editorialPage,
    settings.editorialItemsPerPage,
  );

  const currentEditorialArticles = editorialQuery.data?.data || [];
  const totalEditorialPages = editorialQuery.data
    ? Math.ceil(editorialQuery.data.total / settings.editorialItemsPerPage)
    : 0;

  const handleEditorialPageChange = (page: number) => {
    setEditorialPage(page);
  };

  return (
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
            <EditorialCard
              key={article.id}
              article={article}
              showImage={false}
            />
          ))}
        </div>
      )}

      <PaginationControls
        currentPage={editorialPage}
        totalPages={totalEditorialPages}
        onPageChange={handleEditorialPageChange}
      />
    </div>
  );
};
