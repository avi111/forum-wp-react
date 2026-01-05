import React from "react";
import { Training } from "../types";
import { TrainingCard } from "./TrainingCard";

export interface TrainingListProps {
  trainings: Training[];
}

export const TrainingList: React.FC<TrainingListProps> = ({ trainings }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 not-prose">
      {trainings.map((training) => (
        <TrainingCard key={training.id} training={training} />
      ))}
    </div>
  );
};
