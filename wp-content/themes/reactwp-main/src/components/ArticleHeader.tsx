import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Article } from "../types";

interface ArticleHeaderProps {
  article: Article;
  showImage?: boolean;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  showImage = false,
}) => {
  const navigate = useNavigate();
  const shouldShowImage = showImage && article.imageUrl;

  return (
    <div className="relative h-[400px] w-full overflow-hidden bg-slate-900">
      {shouldShowImage && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-10 max-w-4xl mx-auto w-full z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-slate-300 hover:text-white flex items-center text-sm font-medium transition-colors w-fit bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          חזרה
        </button>
        <div className="flex gap-2 mb-4">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs font-bold text-teal-300 bg-teal-900/50 px-2 py-1 rounded backdrop-blur-md border border-teal-500/30 hover:bg-teal-800/70 hover:text-teal-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heebo drop-shadow-lg">
          {article.title}
        </h1>
        <div className="flex items-center text-slate-300 text-sm gap-6">
          <div className="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            <User className="w-4 h-4 ml-2 text-teal-400" />
            <span className="font-medium">{article.authorName}</span>
          </div>
          <div className="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            <Calendar className="w-4 h-4 ml-2 text-teal-400" />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
