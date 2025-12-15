import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Eye,
  FileDown,
  Loader2,
  Paperclip,
  User,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const ArticlePage: React.FC = () => {
  const { articles, getArticlesFromServer } = useApp();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (articles.length === 0) {
      setIsLoading(true);
      getArticlesFromServer().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getArticlesFromServer, articles.length]);

  const article = articles.find((a) => a.id === id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          המאמר לא נמצא
        </h2>
        <p className="text-slate-500 mb-6">יתכן שהקישור שגוי או שהמאמר הוסר.</p>
        <button
          onClick={() => navigate("/articles")}
          className="text-teal-600 font-bold hover:underline flex items-center"
        >
          <ArrowRight className="w-4 h-4 ml-1" />
          חזרה לרשימת המאמרים
        </button>
      </div>
    );
  }

  const pdfAttachments =
    article.attachments?.filter((a) => a.type === "pdf") || [];

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Hero / Header */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-12">
          <div className="text-xl text-slate-600 leading-relaxed font-serif mb-8 border-b border-slate-100 pb-8 font-medium">
            {article.excerpt}
          </div>
          <div className="prose prose-slate prose-lg max-w-none text-slate-800 leading-loose">
            {/* Rendering content paragraphs */}
            {article.content.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            {/* Fallback for mock content */}
            {article.content === "..." && (
              <div className="text-slate-400 italic bg-slate-50 p-6 rounded-lg border border-dashed border-slate-200">
                <p>זהו טקסט דמה (Mock Data) עבור התצוגה.</p>
                <p>
                  במערכת אמיתית, כאן יופיע התוכן המלא של המאמר כפי שהוזן על ידי
                  החוקר או המערכת, כולל פסקאות, תמונות משובצות וקישורים למקורות.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            )}
          </div>

          {/* Attachments Section */}
          {article.attachments && article.attachments.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <Paperclip className="w-5 h-5 ml-2 text-teal-600" />
                קבצים להורדה
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {article.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-300 hover:shadow-md transition-all group"
                  >
                    <div className="bg-red-100 p-2 rounded-lg ml-4">
                      <span className="text-xs font-bold text-red-700 uppercase">
                        {file.type}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-bold text-slate-800 text-sm truncate"
                        title={file.name}
                      >
                        {file.name}
                      </h4>
                      {file.size && (
                        <span className="text-xs text-slate-500">
                          {file.size}
                        </span>
                      )}
                    </div>
                    <a
                      href={file.url}
                      download
                      className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                      title="הורד קובץ"
                    >
                      <FileDown className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PDF Preview Section */}
          {pdfAttachments.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 ml-2 text-indigo-600" />
                תצוגה מקדימה
              </h4>
              <div className="space-y-6">
                {pdfAttachments.map((pdf, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-500">
                      {pdf.name}
                    </div>
                    <iframe
                      src={`${pdf.url}#toolbar=0`}
                      className="w-full h-[600px]"
                      title={pdf.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              פורסם בתאריך: {article.date}
            </div>
            <button
              onClick={() => navigate("/articles")}
              className="text-teal-600 font-bold hover:text-teal-700 transition-colors"
            >
              קרא מאמרים נוספים
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
