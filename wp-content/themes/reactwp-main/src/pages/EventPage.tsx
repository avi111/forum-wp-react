import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../hooks/useAppQueries";
import {
  ArrowRight,
  Calendar,
  Clock,
  Loader2,
  MapPin,
  Share2,
  Ticket,
  Users,
} from "lucide-react";

export const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useEvents({ limit: 100, timeFilter: "all" });
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    if (data?.data) {
      const found = data.data.find((e) => e.id === id);
      setEvent(found);
    }
  }, [data, id]);

  if (isLoading && !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!event && !isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          האירוע לא נמצא
        </h2>
        <button
          onClick={() => navigate("/events")}
          className="text-teal-600 font-bold hover:underline flex items-center"
        >
          <ArrowRight className="w-4 h-4 ml-1" />
          חזרה ללוח האירועים
        </button>
      </div>
    );
  }

  // Construct a default image if none provided, based on ID for consistency
  const bgImage =
    event.imageUrl ||
    `https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1200`;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={bgImage}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto w-full z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-slate-300 hover:text-white flex items-center text-sm font-medium transition-colors w-fit bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה
          </button>
          <div className="inline-block px-3 py-1 rounded bg-teal-500/20 border border-teal-500/30 backdrop-blur-md text-teal-300 text-xs font-bold mb-4 uppercase tracking-wider">
            {event.type}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heebo drop-shadow-lg">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-200 text-sm md:text-base">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 ml-2 text-teal-400" />
              <span className="font-medium">
                {event.day} {event.month} {event.date.split("-")[0]}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center">
                <MapPin className="w-5 h-5 ml-2 text-teal-400" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">
              אודות האירוע
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              {/* If fullContent exists (HTML), render it, otherwise use description */}
              {event.fullContent ? (
                <div dangerouslySetInnerHTML={{ __html: event.fullContent }} />
              ) : (
                <p>{event.description || "אין מידע נוסף על אירוע זה."}</p>
              )}
            </div>

            {/* Speakers / Participants Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 ml-2 text-indigo-600" />
                  דוברים ומשתתפים
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.speakers.map((speaker: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {speaker.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {speaker}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100 sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">פרטי אירוע</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <Clock className="w-5 h-5 ml-3 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">שעות פעילות</div>
                  <div className="font-medium text-slate-800">
                    {event.startTime ? `${event.startTime} - ${event.endTime || ''}` : 'לא צוין'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Ticket className="w-5 h-5 ml-3 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">מחיר כניסה</div>
                  <div className="font-bold text-teal-600 text-lg">
                    {event.price || 'חינם / לא צוין'}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 ml-3 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">מיקום</div>
                  <div className="font-medium text-slate-800">
                    {event.location}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (event.registrationLink && event.registrationLink !== "#") {
                    window.open(event.registrationLink, "_blank");
                } else {
                    alert("הרשמה לאירוע זה טרם נפתחה או שהסתיימה.");
                }
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-teal-900/20 transition-all transform hover:-translate-y-0.5 mb-3 text-lg flex items-center justify-center"
            >
              הרשמה לאירוע
            </button>
            
            <button className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium py-2 rounded-lg transition-colors flex items-center justify-center text-sm">
                <Share2 className="w-4 h-4 ml-2" />
                שיתוף
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
