import React from "react";
import { Article } from "../types";
import { FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArticleCard } from "./ArticleCard";

export interface HomeResearchProps {
  articles: Article[];
  limit: number;
}

export const HomeResearch: React.FC<HomeResearchProps> = ({
  articles,
  limit,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-teal-50 rounded-lg">
            <FlaskConical className="w-5 h-5 text-teal-600" />
          </span>
          <h3 className="font-bold text-xl text-slate-900">מחקרים חדשים</h3>
        </div>
        <button
          onClick={() => navigate("/researchers")}
          className="text-xs font-bold text-teal-600 hover:underline"
        >
          לאינדקס המלא
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {articles.slice(0, limit).map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            mode="compact"
            showImage={false}
          />
        ))}
      </div>
    </div>
  );
};
