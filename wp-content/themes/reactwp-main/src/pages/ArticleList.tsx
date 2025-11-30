import React from "react";
import { Article } from "../types";
import { UserCircle } from "lucide-react";

interface ArticleListProps {
  articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const editorialArticles = articles.filter((a) => a.isEditorial);
  const researcherArticles = articles.filter((a) => !a.isEditorial);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          מאמרים ופרסומים
        </h2>
        <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      {/* Editorial / Featured Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="w-2 h-8 bg-indigo-600 rounded ml-3"></span>
          מערכת הפורום
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {editorialArticles.map((article) => (
            <div
              key={article.id}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-lg h-[400px] flex flex-col justify-end"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
              />
              <div className="relative z-10 p-8 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
                <div className="flex gap-2 mb-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold text-teal-300 bg-teal-900/50 px-2 py-1 rounded backdrop-blur-md"
                    >
                      {tag}
                    </span>
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
          ))}
        </div>
      </div>

      {/* Researcher Articles Section */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="w-2 h-8 bg-teal-500 rounded ml-3"></span>
          ממחקרים חדשים בקהילה
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {researcherArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {article.tags[0]}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-sm text-slate-500">
                  <UserCircle className="w-4 h-4" />
                  <span>{article.authorName}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 hover:text-indigo-600 cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                  {article.excerpt}
                </p>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                  <span>{article.date}</span>
                  <button className="text-indigo-600 font-medium hover:underline">
                    קרא עוד
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
