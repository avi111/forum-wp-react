import React from "react";
import { Article } from "../types";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeEditorialProps {
  articles: Article[];
  limit: number;
}

export const HomeEditorial: React.FC<HomeEditorialProps> = ({
  articles,
  limit,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-indigo-50 rounded-lg">
            <FileText className="w-5 h-5 text-indigo-600" />
          </span>
          <h3 className="font-bold text-xl text-slate-900">מגזין הפורום</h3>
        </div>
        <button
          onClick={() => navigate("/articles")}
          className="text-xs font-bold text-indigo-600 hover:underline"
        >
          לכל המאמרים
        </button>
      </div>

      <div className="space-y-6 flex-1">
        {articles.slice(0, limit).map((article) => (
          <div
            key={article.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/article/${article.id}`)}
          >
            <div className="flex gap-4">
              <img
                src={article.imageUrl}
                alt=""
                className="w-20 h-20 rounded-lg object-cover shrink-0"
              />
              <div>
                <span className="text-xs text-indigo-500 font-bold mb-1 block">
                  {article.tags[0]}
                </span>
                <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <span className="text-xs text-slate-400 mt-2 block">
                  {article.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};