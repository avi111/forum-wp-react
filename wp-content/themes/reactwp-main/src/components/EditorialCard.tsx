import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Article } from "../types";

export interface EditorialCardProps {
  article: Article;
  showImage?: boolean;
  mode?: "default" | "compact";
}

export const EditorialCard: React.FC<EditorialCardProps> = ({
  article,
  showImage = true,
  mode = "default",
}) => {
  const navigate = useNavigate();

  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  const shouldShowImage = showImage && article.imageUrl;

  if (mode === "compact") {
    return (
      <div
        onClick={() => handleArticleClick(article.id)}
        className="group cursor-pointer flex gap-4 items-start py-3 border-b border-slate-50 last:border-0"
      >
        {shouldShowImage && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-20 h-20 rounded-lg object-cover shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          {article.tags.length > 0 && (
            <span className="text-xs text-indigo-500 font-bold mb-1 block truncate">
              {article.tags[0]}
            </span>
          )}
          <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
            {article.title}
          </h4>
          <span className="text-xs text-slate-400 mt-2 block">
            {article.date}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => handleArticleClick(article.id)}
      className={`group relative bg-slate-900 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-end cursor-pointer ${
        shouldShowImage
          ? "h-[400px]"
          : "h-auto bg-gradient-to-br from-slate-900 to-slate-800"
      }`}
    >
      {shouldShowImage && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
        />
      )}
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
        <p className="text-slate-300 line-clamp-2">{article.excerpt}</p>
        <div className="mt-4 flex items-center text-slate-400 text-sm">
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span>{article.authorName}</span>
        </div>
      </div>
    </div>
  );
};
