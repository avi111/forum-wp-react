
import React from "react";
import { InfoPage } from "../components/InfoPage";
import { Calendar } from "lucide-react";
import { MeetingsList } from "../components/MeetingsList";
import { useApp } from "../context/AppContext";

export const Meetings: React.FC = () => {
  const { meetings } = useApp();
  return (
    <InfoPage title="מפגשי הפורום" icon={Calendar}>
      <p className="text-xl mb-8">
        אנו מקיימים מפגשים חודשיים לחברי הפורום, המהווים קרקע פורייה לדיון מדעי,
        הצגת מקרי בוחן ויצירת שיתופי פעולה.
      </p>
      <MeetingsList meetings={meetings} />
    </InfoPage>
  );
};
