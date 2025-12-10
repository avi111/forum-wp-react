import React from "react";
import { CalendarEvent } from "../types";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeEventsProps {
  events: CalendarEvent[];
}

export const HomeEvents: React.FC<HomeEventsProps> = ({ events }) => {
  const navigate = useNavigate();

  const futureEvents = events.slice(0, 3);

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-purple-50 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
          </span>
          <h3 className="font-bold text-xl text-slate-900">אירועים עתידיים</h3>
        </div>
        <button
          onClick={() => navigate("/events")}
          className="text-xs font-bold text-purple-600 hover:underline"
        >
          ללוח המלא
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {futureEvents.length > 0 ? (
          futureEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className="flex gap-4 items-start group cursor-pointer p-2 -m-2 rounded-lg hover:bg-slate-50"
            >
              <div className="bg-slate-100 border border-slate-200 rounded-lg p-2 text-center min-w-[60px] group-hover:border-purple-300 transition-colors">
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
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 text-sm">
            לא נמצאו אירועים עתידיים
          </div>
        )}
      </div>
      <div className="mt-auto pt-4">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white text-center">
          <p className="font-bold text-sm mb-2">רוצה להישאר מעודכן?</p>
          <button
            onClick={() => navigate("/join")}
            className="bg-white/20 hover:bg-white/30 w-full py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            הרשמה לניוזלטר
          </button>
        </div>
      </div>
    </div>
  );
};
