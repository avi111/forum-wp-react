import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ArrowRight, Tag, UserCircle, Calendar, FileText, Loader2 } from "lucide-react";
import { PaginationControls } from "../components/PaginationControls";
import { useArticlesByTag } from "../hooks/useAppQueries";

export const TagPage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const { settings } = useApp();
  const navigate = useNavigate();

  const decodedTag = useMemo(() => (tag ? decodeURIComponent(tag) : ""), [tag]);

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = settings.editorialItemsPerPage;

  // Server-side fetch by tag with pagination (both post types)
  const query = useArticlesByTag(page, limit, decodedTag);
  const articles = query.data?.data || [];
  const total = query.data?.total || 0;
  const totalPages = useMemo(() => (total > 0 ? Math.ceil(total / limit) : 0), [total, limit]);

  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  if (query.isLoading && articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-slate-900 text-white relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-teal-900 opacity-90"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <button
            onClick={() => navigate("/articles")}
            className="absolute top-0 right-4 md:right-0 text-slate-400 hover:text-white flex items-center text-sm font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה לכל המאמרים
          </button>

          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
            <Tag className="w-8 h-8 text-teal-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heebo mb-4">
            מאמרים בנושא: <span className="text-teal-400">{decodedTag}</span>
          </h1>
          <p className="text-slate-300 text-lg">
            נמצאו {total} מאמרים הקשורים לתגית זו
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {article.isEditorial && (
                      <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        מערכת
                      </span>
                    )}
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

                  {/* Tags within card */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className={`text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 ${t === decodedTag ? "ring-1 ring-teal-500 bg-teal-50 text-teal-700" : ""}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 ml-1" />
                      <span>{article.date}</span>
                    </div>
                    <span className="text-indigo-600 font-medium group-hover:underline">
                      קרא עוד
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700">
              לא נמצאו מאמרים
            </h3>
            <p className="text-slate-500 mt-2">
              לא קיימים מאמרים המקושרים לתגית &#34;{decodedTag}&#34; כרגע.
            </p>
            <button
              onClick={() => navigate("/articles")}
              className="mt-6 text-teal-600 font-bold hover:underline"
            >
              חזרה לרשימת המאמרים
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10">
            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
