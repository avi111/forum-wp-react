import React, { useEffect, useState } from "react";
import { InfoPage } from "../components/InfoPage";
import { BookOpen, Loader2 } from "lucide-react";
import { TrainingList } from "../components/TrainingList";
import { useApp } from "../context/AppContext";

export const Training: React.FC = () => {
  const { trainings, getTrainingsFromServer } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (trainings.length === 0) {
      setIsLoading(true);
      getTrainingsFromServer().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getTrainingsFromServer, trainings.length]);

  if (isLoading) {
    return (
      <InfoPage title="הכשרות וקורסים" icon={BookOpen}>
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
        </div>
      </InfoPage>
    );
  }

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
