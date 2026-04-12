import React from "react";
import { t } from "../services/stringService";

export const ArticleList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          {t("articlelist_page_title")}
        </h2>
        <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
      </div>
      {/* ArticleList is now a general landing page for articles,
          the specific lists are in ResearchArticlesPage and EditorialPage */}
      <p className="text-center text-slate-600">
        {t("articlelist_intro_text")} {/* You might want to add this string in WP */}
      </p>
    </div>
  );
};
