import React from "react";
import { InfoPage } from "../components/InfoPage";
import { Calendar } from "lucide-react";
import { Meeting } from "../types";
import { MeetingsList } from "../components/MeetingsList";

interface MeetingsProps {
  meetings: Meeting[];
}

export const Meetings: React.FC<MeetingsProps> = ({ meetings }) => {
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
