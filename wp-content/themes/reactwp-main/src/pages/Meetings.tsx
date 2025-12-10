import React, { useEffect, useState } from "react";
import { InfoPage } from "../components/InfoPage";
import { Calendar, Loader2 } from "lucide-react";
import { MeetingsList } from "../components/MeetingsList";
import { useApp } from "../context/AppContext";

export const Meetings: React.FC = () => {
  const { meetings, getMeetingsFromServer } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (meetings.length === 0) {
      setIsLoading(true);
      getMeetingsFromServer().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getMeetingsFromServer, meetings.length]);

  return (
    <InfoPage title="מפגשי הפורום" icon={Calendar}>
      <p className="text-xl mb-8">
        אנו מקיימים מפגשים חודשיים לחברי הפורום, המהווים קרקע פורייה לדיון מדעי,
        הצגת מקרי בוחן ויצירת שיתופי פעולה.
      </p>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      ) : (
        <MeetingsList meetings={meetings} />
      )}
    </InfoPage>
  );
};
