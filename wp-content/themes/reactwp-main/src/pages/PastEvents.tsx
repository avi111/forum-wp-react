import React, { useEffect } from "react";
import { InfoPage } from "../components/InfoPage";
import { ArrowRight, Calendar } from "lucide-react";
import { EventsList } from "../components/EventsList";
import { useEvents } from "../hooks/useAppQueries";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export const PastEvents: React.FC = () => {
  const { settings } = useApp();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    page,
    setPage,
    totalPages,
    setTimeFilter,
  } = useEvents({
    limit: settings.eventsItemsPerPage,
    timeFilter: "past",
  });

  useEffect(() => {
    setTimeFilter("past");
  }, [setTimeFilter]);

  const events = data?.data || [];

  return (
    <InfoPage title="ארכיון אירועים" icon={Calendar}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <p className="text-xl text-slate-600 max-w-2xl">
          היסטוריית הפעילות של הפורום: כנסים, הרצאות ומפגשים שהתקיימו בעבר.
        </p>
        <button
          onClick={() => navigate("/events")}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-medium px-4 py-2 rounded-lg border border-slate-200 hover:border-teal-300 transition-colors bg-white whitespace-nowrap"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לאירועים עתידיים
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 border-r-4 border-slate-400 pr-3">
          אירועים שהתקיימו
        </h3>
      </div>

      <EventsList
        events={events}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </InfoPage>
  );
};