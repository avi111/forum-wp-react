import React, { useState } from "react";
import { NewsItem } from "../types";
import { Bell, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface NewsTickerProps {
  news: NewsItem[];
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ news }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const navigate = useNavigate();

  const handleNewsClick = (item: NewsItem) => {
    setSelectedNews(item);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const handleReadMore = () => {
    if (selectedNews) {
      navigate(`/news#news-${selectedNews.id}`);
      closeModal();
    }
  };

  return (
    <>
      <div className="bg-indigo-900 text-white h-10 overflow-hidden flex items-center relative z-50 border-b border-indigo-800">
        <div className="bg-indigo-800 h-full px-4 flex items-center z-10 shadow-lg">
          <Bell className="w-4 h-4 text-teal-400 ml-2 animate-pulse" />
          <span className="font-bold text-xs whitespace-nowrap">
            חדשות הפורום:
          </span>
        </div>

        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center absolute left-0 right-0">
            {[...news, ...news, ...news].map((item, idx) => (
              <span
                key={`${item.id}-${idx}`}
                className="inline-flex items-center mx-8 text-sm text-indigo-100"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-2"></span>
                <span className="ml-2 font-medium">{item.date}</span>
                <span
                  onClick={() => handleNewsClick(item)}
                  className="hover:text-teal-300 cursor-pointer transition-colors"
                >
                  {item.title}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedNews.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 leading-relaxed text-slate-600 space-y-4">
              <p>{selectedNews.content || "ללא תוכן נוסף."}</p>
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleReadMore}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  קרא עוד ושתף...
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
