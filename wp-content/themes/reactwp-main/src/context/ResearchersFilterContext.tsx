import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useApp } from "./AppContext.tsx";
import { getResearcherName, Researcher, UserStatus } from "../types.ts";
import { useSearchParams } from "react-router-dom";

export interface ResearchersFilterContextType {
  currentResearchers: Researcher[];
  subSpecializations: string[];
  institutions: string[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  filteredResearchers: Researcher[];
  clearFilters: () => void;
  setSearchTerm: (term: string) => void;
  searchTerm: string;
  selectedSpecialization: string;
  selectedSubSpecialization: string;
  selectedInstitution: string;
  setSelectedInstitution: (inst: string) => void;
  setSelectedSpecialization: (spec: string) => void;
  setSelectedSubSpecialization: (subSpec: string) => void;
}

export const ResearchersFilterContext = createContext<
  ResearchersFilterContextType | undefined
>(undefined);

export const ResearchersFilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { researchers, settings, getResearchersFromServer } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedSubSpecialization, setSelectedSubSpecialization] =
    useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");

  // Initialize filters from URL params
  useEffect(() => {
    const institutionParam = searchParams.get("institution");
    const specializationParam = searchParams.get("specialization");
    const subSpecializationParam = searchParams.get("subSpecialization");

    if (institutionParam) {
      setSelectedInstitution(institutionParam);
    }

    if (specializationParam) {
      setSelectedSpecialization(specializationParam);
    }

    if (subSpecializationParam) {
      setSelectedSubSpecialization(subSpecializationParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Fetch data only if it hasn't been fetched yet.
    if (researchers.length === 0) {
      setIsLoading(true);
      getResearchersFromServer().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getResearchersFromServer, researchers.length]);

  const itemsPerPage = settings.researcherIndexItemsPerPage || 12;

  const subSpecializations = useMemo(() => {
    const subSpecs = new Set<string>();
    researchers.forEach((r) => {
      if (r.subSpecializations && Array.isArray(r.subSpecializations)) {
        r.subSpecializations.forEach((s) => subSpecs.add(s));
      }
    });
    return Array.from(subSpecs).sort();
  }, [researchers]);

  const institutions = useMemo(() => {
    const insts = new Set<string>();
    researchers.forEach((r) => {
      if (r.institution) insts.add(r.institution);
    });
    return Array.from(insts).sort();
  }, [researchers]);

  const filteredResearchers = useMemo(() => {
    return researchers
      .filter((r) => {
        return !!r.institution;
      })
      .filter((r) => {
        const term = searchTerm.trim().toLowerCase();
        const isActive = r.status === UserStatus.ACTIVE;
        const fullName = getResearcherName(r).toLowerCase();

        const matchesSearch =
          term === "" ||
          fullName.includes(term) ||
          (r.institution?.toLowerCase() || "").includes(term);

        const matchesSubSpecialization = selectedSubSpecialization
          ? r.subSpecializations?.includes(selectedSubSpecialization)
          : true;

        const matchesInstitution = selectedInstitution
          ? r.institution === selectedInstitution
          : true;

        return (
          isActive &&
          matchesSearch &&
          matchesSubSpecialization &&
          matchesInstitution
        );
      });
  }, [
    searchTerm,
    selectedSpecialization,
    selectedSubSpecialization,
    selectedInstitution,
    researchers,
  ]);

  const totalPages = Math.ceil(filteredResearchers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResearchers = filteredResearchers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization("");
    setSelectedSubSpecialization("");
    setSelectedInstitution("");
    setCurrentPage(1);
    setSearchParams({}); // Clear URL params
  };

  const value = {
    currentResearchers,
    subSpecializations,
    institutions,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
    filteredResearchers,
    clearFilters,
    setSearchTerm,
    searchTerm,
    selectedSpecialization,
    selectedSubSpecialization,
    selectedInstitution,
    setSelectedInstitution,
    setSelectedSpecialization,
    setSelectedSubSpecialization,
  };

  return (
    <ResearchersFilterContext.Provider value={value}>
      {children}
    </ResearchersFilterContext.Provider>
  );
};
