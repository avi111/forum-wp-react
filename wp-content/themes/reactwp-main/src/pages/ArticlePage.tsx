import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { ArticleHeader } from "../components/ArticleHeader";
import { ArticleContent } from "../components/ArticleContent";

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

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Hero / Header */}
      <ArticleHeader article={article} showImage={false} />

      {/* Content */}
      <ArticleContent article={article} />
    </div>
  );
};
