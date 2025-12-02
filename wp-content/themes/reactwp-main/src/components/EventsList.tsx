import React from "react";
import { CalendarEvent } from "../types";
import { Calendar, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface EventsListProps {
  events: CalendarEvent[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const EventsList: React.FC<EventsListProps> = ({
  events,
  total,
  currentPage,
  itemsPerPage,
  onPageChange,
  isLoading,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  const goToPage = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (events.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
        <p className="text-slate-500">לא נמצאו אירועים</p>
      </div>
    );
  }

  return (
    <div
      className={`space-y-6 not-prose relative ${isLoading ? "opacity-70" : ""}`}
    >
      {isLoading && events.length === 0 && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col sm:flex-row gap-6 bg-white border border-slate-100 p-6 rounded-xl shadow-sm items-center hover:shadow-md transition-shadow animate-fade-in"
          >
            <div className="text-center min-w-[100px] border-l border-slate-200 pl-6">
              <div className="text-3xl font-bold text-indigo-600">
                {event.day}
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase">
                {event.month}
              </div>
            </div>
            <div className="flex-1">
              <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-indigo-50 text-indigo-700 mb-2">
                {event.type}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {event.title}
              </h3>
              <p className="text-slate-600 text-sm">{event.location}</p>
            </div>
            <button className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 mr-auto whitespace-nowrap transition-colors">
              הרשמה
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-slate-100">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={isLoading}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                  currentPage === page
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      )}

      {isLoading && events.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 rounded-xl">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      )}
    </div>
  );
};