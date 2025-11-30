import React from "react";
import { NewsItem } from "../types";
import { Bell } from "lucide-react";

interface NewsTickerProps {
  news: NewsItem[];
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ news }) => {
  return (
    <div className="bg-indigo-900 text-white h-10 overflow-hidden flex items-center relative z-50 border-b border-indigo-800">
      <div className="bg-indigo-800 h-full px-4 flex items-center z-10 shadow-lg">
        <Bell className="w-4 h-4 text-teal-400 ml-2 animate-pulse" />
        <span className="font-bold text-xs whitespace-nowrap">
          חדשות הפורום:
        </span>
      </div>

      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        {/* The scrolling container */}
        <div className="animate-marquee whitespace-nowrap flex items-center absolute left-0 right-0">
          {/* Duplicate list to ensure seamless loop if CSS allows, 
              but for simple marquee, a long list is usually enough. 
              We map twice to fill space. */}
          {[...news, ...news, ...news].map((item, idx) => (
            <span
              key={`${item.id}-${idx}`}
              className="inline-flex items-center mx-8 text-sm text-indigo-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-2"></span>
              <span className="ml-2 font-medium">{item.date}</span>
              <span className="hover:text-teal-300 cursor-pointer transition-colors">
                {item.title}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
