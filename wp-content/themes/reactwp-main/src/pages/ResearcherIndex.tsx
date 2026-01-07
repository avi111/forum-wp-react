import React from "react";
import { Loader2 } from "lucide-react";
import { ResearchersFilter } from "../components/ResearchersFilter.tsx";
import { ResearcherIndex as Index } from "../components/ResearcherIndex.tsx";
import { useResearchersFilter } from "../hooks/useResearchersFilter.ts";
import { ResearchersFilterProvider } from "../context/ResearchersFilterContext.tsx";

const ResearcherIndexContent: React.FC = () => {
  const { isLoading } = useResearchersFilter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          אינדקס חוקרים
        </h2>
        <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
        <p className="mt-4 text-xl text-slate-500">
          הכירו את המובילים בתחום המחקר הפסיכדלי בישראל
        </p>
      </div>

      {/* Search and Filters Container */}
      <ResearchersFilter />
      <Index />
    </div>
  );
};

export const ResearcherIndex: React.FC = () => {
  return (
    <ResearchersFilterProvider>
      <ResearcherIndexContent />
    </ResearchersFilterProvider>
  );
};
