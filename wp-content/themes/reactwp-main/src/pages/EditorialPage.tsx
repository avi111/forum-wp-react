import React from "react";
import { EditorialArticlesList } from "../components/EditorialArticlesList";
import { t } from "../services/stringService";

export const EditorialPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          {t("editorial_page_title")}
        </h2>
        <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      <EditorialArticlesList />
    </div>
  );
};
