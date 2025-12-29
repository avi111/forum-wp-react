import React, { useState, useEffect, useMemo } from "react";
import { getResearcherName, UserStatus } from "../types";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Search,
  X,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export const ResearcherIndex: React.FC = () => {
  const { researchers, settings, getResearchersFromServer } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data only if it hasn't been fetched yet.
    if (researchers.length === 0) {
      setIsLoading(true);
      getResearchersFromServer().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getResearchersFromServer, researchers.length]);

  const itemsPerPage = settings.researcherIndexItemsPerPage;

  // Extract unique specializations and institutions for filters
  const specializations = useMemo(() => {
    const specs = new Set<string>();
    researchers.forEach((r) => {
      if (r.specialization) specs.add(r.specialization);
    });
    return Array.from(specs).sort();
  }, [researchers]);

  const institutions = useMemo(() => {
    const insts = new Set<string>();
    researchers.forEach((r) => {
      if (r.institution) insts.add(r.institution);
    });
    return Array.from(insts).sort();
  }, [researchers]);

  const filteredResearchers = researchers.filter((r) => {
    const term = searchTerm.toLowerCase();
    const isActive = r.status === UserStatus.ACTIVE;
    const fullName = getResearcherName(r).toLowerCase();

    const matchesSearch =
      fullName.includes(term) ||
      r.institution.toLowerCase().includes(term) ||
      r.specialization.toLowerCase().includes(term);

    const matchesSpecialization = selectedSpecialization
      ? r.specialization === selectedSpecialization
      : true;
    const matchesInstitution = selectedInstitution
      ? r.institution === selectedInstitution
      : true;

    return isActive && matchesSearch && matchesSpecialization && matchesInstitution;
  });

  const totalPages = Math.ceil(filteredResearchers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResearchers = filteredResearchers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleResearcherClick = (id: string) => {
    navigate(`/researchers/${id}`);
  };

  const handleSelectSuggestion = (name: string) => {
    setSearchTerm(name);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization("");
    setSelectedInstitution("");
    setCurrentPage(1);
  };

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
                      onClick={() =>
                        handleSelectSuggestion(getResearcherName(r))
                      }
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
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
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

          {(selectedSpecialization || selectedInstitution || searchTerm) && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 font-medium underline"
            >
              נקה הכל
            </button>
          )}
        </div>
      </div>

      {filteredResearchers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentResearchers.map((researcher) => (
              <div
                key={researcher.id}
                className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
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
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {getResearcherName(researcher)}
                    </h3>
                    <p className="text-teal-600 font-medium text-sm mb-3 uppercase tracking-wide">
                      {researcher.specialization}
                    </p>

                    <div className="flex items-center text-slate-500 text-sm mb-4 bg-slate-50 p-2 rounded-lg inline-flex">
                      <MapPin className="w-4 h-4 ml-1" />
                      {researcher.institution}
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
                      onClick={() => handleResearcherClick(researcher.id)}
                      className="text-indigo-600 text-sm font-medium hover:underline cursor-pointer"
                    >
                      צפה בפרופיל מלא
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                        currentPage === page
                          ? "bg-teal-600 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <Search className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700">לא נמצאו חוקרים</h3>
          <p className="text-slate-500">נסה לחפש מונח אחר או בדוק את האיות</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-teal-600 font-bold hover:underline"
          >
            נקה חיפוש וסינון
          </button>
        </div>
      )}
    </div>
  );
};
