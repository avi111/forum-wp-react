import React from "react";
import { Article, CalendarEvent } from "../types";
import { ArrowLeft, Calendar, FileText, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeLatestUpdatesProps {
  editorialArticles: Article[];
  researcherArticles: Article[];
  events: CalendarEvent[];
}

export const HomeLatestUpdates: React.FC<HomeLatestUpdatesProps> = ({
  editorialArticles,
  researcherArticles,
  events,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 border-t border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Editorial Articles */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-indigo-50 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </span>
                <h3 className="font-bold text-xl text-slate-900">
                  מגזין הפורום
                </h3>
              </div>
              <button
                onClick={() => navigate("/articles")}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                לכל המאמרים
              </button>
            </div>

            <div className="space-y-6 flex-1">
              {editorialArticles.slice(0, 3).map((article) => (
                <div key={article.id} className="group cursor-pointer">
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

          {/* Column 2: Research Papers */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-teal-50 rounded-lg">
                  <FlaskConical className="w-5 h-5 text-teal-600" />
                </span>
                <h3 className="font-bold text-xl text-slate-900">
                  מחקרים חדשים
                </h3>
              </div>
              <button
                onClick={() => navigate("/researchers")}
                className="text-xs font-bold text-teal-600 hover:underline"
              >
                לאינדקס המלא
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {researcherArticles.slice(0, 4).map((article) => (
                <div
                  key={article.id}
                  className="block hover:bg-slate-50 p-3 rounded-lg -mx-2 transition-colors border-b border-slate-50 last:border-0"
                >
                  <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-teal-600 font-medium">
                      {article.authorName}
                    </span>
                    <span className="text-slate-400">{article.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/join")}
              className="mt-4 w-full py-2 text-sm text-slate-500 hover:text-teal-600 font-medium border border-slate-200 rounded-lg hover:border-teal-300 transition-colors flex items-center justify-center"
            >
              הגש מחקר לפרסום <ArrowLeft className="w-4 h-4 mr-1" />
            </button>
          </div>

          {/* Column 3: Events */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-purple-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </span>
                <h3 className="font-bold text-xl text-slate-900">
                  לוח אירועים
                </h3>
              </div>
              <button
                onClick={() => navigate("/events")}
                className="text-xs font-bold text-purple-600 hover:underline"
              >
                ללוח המלא
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {events.map((event) => (
                <div key={event.id} className="flex gap-4 items-start group">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center min-w-[60px] group-hover:border-purple-300 transition-colors">
                    <span className="block text-xl font-bold text-slate-900">
                      {event.day}
                    </span>
                    <span className="block text-xs font-medium text-slate-500 uppercase">
                      {event.month}
                    </span>
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 mb-1">
                      {event.type}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 group-hover:text-purple-700 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-500">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white text-center">
                <p className="font-bold text-sm mb-2">רוצה להישאר מעודכן?</p>
                <button className="bg-white/20 hover:bg-white/30 w-full py-1.5 rounded-lg text-xs font-bold transition-colors">
                  הרשמה לניוזלטר
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
