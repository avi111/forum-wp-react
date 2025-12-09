import React, { useEffect } from "react";
import { InfoPage } from "../components/InfoPage";
import { Calendar, History } from "lucide-react";
import { EventsList } from "../components/EventsList";
import { useEvents } from "../hooks/useAppQueries";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export const Events: React.FC = () => {
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
    timeFilter: "future",
  });

  // Ensure the filter is set to 'future' when the component mounts
  useEffect(() => {
    setTimeFilter("future");
  }, [setTimeFilter]);

  const events = data?.data || [];

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
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </InfoPage>
  );
};
