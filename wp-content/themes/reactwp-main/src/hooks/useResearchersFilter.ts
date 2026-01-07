import { useContext } from "react";
import { ResearchersFilterContext } from "../context/ResearchersFilterContext.tsx";

export const useResearchersFilter = () => {
  const context = useContext(ResearchersFilterContext);
  if (context === undefined) {
    throw new Error("useResearchersFilter must be used within a ResearchersFilterProvider");
  }
  return context;
};
