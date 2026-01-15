import { Filter, MapPin, Search, X, Layers } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { getResearcherName } from "../types";
import { useResearchersFilter } from "../hooks/useResearchersFilter.ts";

export const ResearchersFilter = () => {
  const {
    filteredResearchers,
    setCurrentPage,
    setSearchTerm,
    searchTerm,
    clearFilters,
    institutions,
    specializations,
    subSpecializations,
    selectedInstitution,
    selectedSpecialization,
    selectedSubSpecialization,
    setSelectedSpecialization,
    setSelectedSubSpecialization,
    setSelectedInstitution,
  } = useResearchersFilter();
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectSuggestion = (name: string) => {
    setSearchTerm(name);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mb-12 space-y-4">
      {/* Search Bar */}
      <div className="flex justify-center relative z-20">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="חיפוש חוקר לפי שם, מוסד או התמחות..."
            className="w-full p-4 pr-12 pl-10 border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-lg transition-all"
          />
          <Search className="absolute top-4 right-4 text-slate-400 w-6 h-6" />

          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="absolute top-4 left-4 text-slate-300 hover:text-slate-500"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {isFocused && searchTerm && filteredResearchers.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in z-30">
              <div className="max-h-60 overflow-y-auto">
                {filteredResearchers.slice(0, 6).map((r) => (
                  <button
                    key={`suggestion-${r.id}`}
                    onClick={() => handleSelectSuggestion(getResearcherName(r))}
                    className="w-full text-right px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors flex justify-between items-center group"
                  >
                    <span className="font-medium text-slate-700 group-hover:text-teal-600">
                      {getResearcherName(r)}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                      {r.specialization}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap">
        <div className="relative">
          <select
            value={selectedSpecialization}
            onChange={(e) => {
              setSelectedSpecialization(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pr-8 pl-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer min-w-[200px]"
          >
            <option value="">כל ההתמחויות</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <Filter className="absolute top-2.5 right-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedSubSpecialization}
            onChange={(e) => {
              setSelectedSubSpecialization(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pr-8 pl-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer min-w-[200px]"
          >
            <option value="">כל תתי ההתמחויות</option>
            {subSpecializations.map((subSpec) => (
              <option key={subSpec} value={subSpec}>
                {subSpec}
              </option>
            ))}
          </select>
          <Layers className="absolute top-2.5 right-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedInstitution}
            onChange={(e) => {
              setSelectedInstitution(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pr-8 pl-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer min-w-[200px]"
          >
            <option value="">כל המוסדות</option>
            {institutions.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </select>
          <MapPin className="absolute top-2.5 right-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {(selectedSpecialization || selectedSubSpecialization || selectedInstitution || searchTerm) && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-500 hover:text-red-700 font-medium underline"
          >
            נקה הכל
          </button>
        )}
      </div>
    </div>
  );
};
