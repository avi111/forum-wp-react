
import React, { useState } from "react";
import { InfoPage } from "../components/InfoPage";
import { Calendar, History } from "lucide-react";
import { EventsList } from "../components/EventsList";
import { useEvents } from "../hooks/useAppQueries";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export const Events: React.FC = () => {
  const { settings } = useApp();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  // Fetch only future events
  const { data, isLoading } = useEvents(page, settings.eventsItemsPerPage, "future");

  const events = data?.data || [];
  const total = data?.total || 0;

  return (
    <InfoPage title="אירועים וכנסים" icon={Calendar}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <p className="text-xl text-slate-600 max-w-2xl">
          אנו מקיימים מפגשים חודשיים לחברי הפורום, ימי עיון וכנסים המהווים קרקע
          פורייה לדיון מדעי, הצגת מקרי בוחן ויצירת שיתופי פעולה.
        </p>
        <button
          onClick={() => navigate("/events/past")}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-medium px-4 py-2 rounded-lg border border-slate-200 hover:border-teal-300 transition-colors bg-white whitespace-nowrap"
        >
          <History className="w-4 h-4" />
          לארכיון אירועים
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 border-r-4 border-teal-500 pr-3">
          אירועים קרובים
        </h3>
      </div>

      <EventsList
        events={events}
        total={total}
        currentPage={page}
        itemsPerPage={settings.eventsItemsPerPage}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </InfoPage>
  );
};
