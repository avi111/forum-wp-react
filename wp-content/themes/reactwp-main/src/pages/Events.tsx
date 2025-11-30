import React from "react";
import { InfoPage } from "../components/InfoPage";
import { Calendar } from "lucide-react";
import { CalendarEvent } from "../types";

interface EventsProps {
  events: CalendarEvent[];
}

export const Events: React.FC<EventsProps> = ({ events }) => {
  return (
    <InfoPage title="אירועים וכנסים" icon={Calendar}>
      <p className="text-xl mb-8">
        אנו מקיימים מפגשים חודשיים לחברי הפורום, ימי עיון וכנסים המהווים קרקע
        פורייה לדיון מדעי, הצגת מקרי בוחן ויצירת שיתופי פעולה.
      </p>
      <div className="space-y-4 not-prose">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row gap-6 bg-white border border-slate-100 p-6 rounded-xl shadow-sm items-center hover:shadow-md transition-shadow"
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
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">לא נמצאו אירועים קרובים</p>
          </div>
        )}
      </div>
    </InfoPage>
  );
};
