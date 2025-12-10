import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { Bell, Calendar, Link as LinkIcon, Share2 } from "lucide-react";
import { InfoPage } from "../components/InfoPage";
import { useToast } from "../context/ToastContext";

export const NewsPage: React.FC = () => {
  const { newsItems, getNewsFromServer } = useApp();
  const { hash } = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    if (newsItems.length === 0) {
      void getNewsFromServer();
    }
  }, [getNewsFromServer, newsItems.length]);

  useEffect(() => {
    if (hash && newsItems.length > 0) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("bg-indigo-50", "transition-colors");
          setTimeout(() => element.classList.remove("bg-indigo-50"), 2000);
        }, 100);
      }
    }
  }, [hash, newsItems]);

  const handleShare = async (item: {
    id: string;
    title: string;
    content?: string;
  }) => {
    const url = `${window.location.origin}/news#news-${item.id}`;
    const shareData = {
      title: item.title,
      text: item.content || item.title,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(url);
      showToast("הקישור הועתק ללוח");
    }
  };

  return (
    <InfoPage title="חדשות ועדכונים" icon={Bell}>
      <div className="space-y-8 group/list">
        {newsItems.map((item) => (
          <div
            key={item.id}
            id={`news-${item.id}`}
            className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative"
          >
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {item.title}
            </h3>

            <div className="text-slate-600 leading-relaxed mb-4">
              {item.content || "ללא תוכן נוסף."}
            </div>

            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={() => handleShare(item)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-teal-100 hover:text-teal-600 transition-all opacity-0 group-hover/list:opacity-100"
                title="שתף"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href={`/news#news-${item.id}`}
                onClick={async (e) => {
                  e.preventDefault();
                  const element = document.getElementById(`news-${item.id}`);
                  element?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                  window.history.pushState(null, "", `#news-${item.id}`);
                  await navigator.clipboard.writeText(window.location.href);
                  showToast("הקישור הועתק");
                }}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-all opacity-0 group-hover/list:opacity-100"
                title="העתק קישור"
              >
                <LinkIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}

        {newsItems.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            לא נמצאו ידיעות.
          </div>
        )}
      </div>
    </InfoPage>
  );
};
