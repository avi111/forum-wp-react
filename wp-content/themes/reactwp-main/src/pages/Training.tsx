import React from "react";
import { InfoPage } from "../components/InfoPage";
import { BookOpen } from "lucide-react";
import { Training as TrainingType } from "../types";
import { TrainingList } from "../components/TrainingList";

interface TrainingProps {
  trainings: TrainingType[];
}

export const Training: React.FC<TrainingProps> = ({ trainings }) => {
  return (
    <InfoPage title="הכשרות וקורסים" icon={BookOpen}>
      <p className="lead text-xl text-slate-600 mb-8">
        הפורום מרכז מידע אודות תוכניות הכשרה המוכרות על ידי משרד הבריאות,
        האוניברסיטאות והאיגודים המקצועיים.
      </p>
      <TrainingList trainings={trainings} />
    </InfoPage>
  );
};
