import React, { useState } from "react";
import { InfoPage } from "../components/InfoPage";
import { ArrowRight, Calendar } from "lucide-react";
import { EventsList } from "../components/EventsList";
import { useEvents } from "../hooks/useAppQueries";
import { useNavigate } from "react-router-dom";
import { EVENTS_ITEMS_PER_PAGE } from "../consts";

export const PastEvents: React.FC = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  // Fetch only past events
  const { data, isLoading } = useEvents(page, EVENTS_ITEMS_PER_PAGE, "past");

  const events = data?.data || [];
  const total = data?.total || 0;

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
        total={total}
        currentPage={page}
        itemsPerPage={EVENTS_ITEMS_PER_PAGE}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </InfoPage>
  );
};
