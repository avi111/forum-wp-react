import React from "react";
import { Article } from "../types";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeResearchProps {
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
          <div
            key={article.id}
            onClick={() => navigate(`/article/${article.id}`)}
            className="block hover:bg-slate-50 p-3 rounded-lg -mx-2 transition-colors border-b border-slate-50 last:border-0 cursor-pointer"
          >
            <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">
              {article.title}
            </h4>
            <p className="text-xs text-slate-500 mb-2 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className="text-teal-600 font-medium">
                {article.authorName}
              </span>
              <span className="text-slate-400">{article.date}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/join")}
        className="mt-4 w-full py-2 text-sm text-slate-500 hover:text-teal-600 font-medium border border-slate-200 rounded-lg hover:border-teal-300 transition-colors flex items-center justify-center"
      >
        הגש מחקר לפרסום <ArrowLeft className="w-4 h-4 mr-1" />
      </button>
    </div>
  );
};