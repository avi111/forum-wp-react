import React from "react";
import { Researcher, getResearcherName } from "../types";
import { ArrowRight, MapPin } from "lucide-react";

export interface ResearcherCardProps {
  researcher: Researcher;
  onClick: (id: string) => void;
  onInstitutionClick?: (institution: string) => void;
  variant?: "default" | "carousel";
}

export const ResearcherCard: React.FC<ResearcherCardProps> = ({
  researcher,
  onClick,
  onInstitutionClick,
  variant = "default",
}) => {
  const handleInstitutionClick = (e: React.MouseEvent) => {
    if (onInstitutionClick) {
      e.stopPropagation();
      onInstitutionClick(researcher.institution);
    }
  };

  if (variant === "carousel") {
    return (
      <div
        dir="rtl"
        className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group-card cursor-pointer"
        onClick={() => onClick(researcher.id)}
      >
        <div className="h-48 overflow-hidden relative">
          <img
            src={researcher.imageUrl}
            alt={getResearcherName(researcher)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-slate-900 truncate">
            {getResearcherName(researcher)}
          </h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
            צפה בפרופיל <ArrowRight className="w-3 h-3 mr-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="h-28 bg-gradient-to-l from-indigo-900 to-slate-800 relative">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>
      <div className="px-6 relative pb-6">
        <div className="relative -top-12 mb-[-30px]">
          <img
            src={researcher.imageUrl}
            alt={getResearcherName(researcher)}
            className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover bg-white"
          />
        </div>

        <div className="pt-2">
          <h3
            className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
            onClick={() => onClick(researcher.id)}
          >
            {getResearcherName(researcher)}
          </h3>

          <div
            className={`flex items-center text-slate-500 text-sm mb-4 bg-slate-50 p-2 rounded-lg inline-flex ${onInstitutionClick ? "cursor-pointer hover:bg-slate-100 transition-colors" : ""}`}
            onClick={handleInstitutionClick}
          >
            <MapPin className="w-4 h-4 ml-1" />
            <span className={onInstitutionClick ? "hover:underline" : ""}>
              {researcher.institution}
            </span>
          </div>

          <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
            {researcher.bio}
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-2 py-1 rounded">
            חבר פורום
          </span>
          <button
            onClick={() => onClick(researcher.id)}
            className="text-indigo-600 text-sm font-medium hover:underline cursor-pointer"
          >
            צפה בפרופיל מלא
          </button>
        </div>
      </div>
    </div>
  );
};
