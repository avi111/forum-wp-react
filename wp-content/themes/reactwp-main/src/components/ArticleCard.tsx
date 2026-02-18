import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { Article } from "../types";
import { t } from "../services/stringService";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  return (
    <div
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
  );
};
