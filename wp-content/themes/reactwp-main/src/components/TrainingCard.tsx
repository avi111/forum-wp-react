import React from "react";
import { Training } from "../types";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrainingCardProps {
  training: Training;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
  const navigate = useNavigate();

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "teal":
        return {
          container: "hover:border-teal-300",
          category: "text-teal-600",
        };
      case "indigo":
        return {
          container: "hover:border-indigo-300",
          category: "text-indigo-600",
        };
      default:
        return {
          container: "hover:border-slate-300",
          category: "text-slate-600",
        };
    }
  };

  const theme = getThemeClasses(training.colorTheme);

  return (
    <div
      onClick={() => navigate(`/training/${training.id}`)}
      className={`border border-slate-200 p-6 rounded-xl bg-slate-50 transition-all cursor-pointer hover:shadow-md ${theme.container}`}
    >
      <div
        className={`text-xs font-bold uppercase tracking-wide mb-2 ${theme.category}`}
      >
        {training.category}
      </div>
      <h4 className="font-bold text-xl text-slate-900 mb-2">
        {training.title}
      </h4>
      <p className="text-slate-600 mb-4 line-clamp-3">{training.description}</p>
      <div className="text-sm text-slate-500 flex items-center justify-between mt-auto">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 ml-2" />
          {training.date}
        </div>
        <span className="text-indigo-600 font-bold text-sm hover:underline">
          לפרטים וסילבוס &larr;
        </span>
      </div>
    </div>
  );
};
