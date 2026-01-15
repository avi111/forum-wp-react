import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResearcherCard } from "./ResearcherCard";
import { useResearchersFilter } from "../hooks/useResearchersFilter";

export const ResearcherIndex: React.FC = () => {
  const {
    filteredResearchers,
    currentResearchers,
    totalPages,
    clearFilters,
    setCurrentPage,
    currentPage,
    setSelectedSpecialization,
    setSelectedInstitution,
  } = useResearchersFilter();

  const navigate = useNavigate();

  const handleResearcherClick = (id: string) => {
    navigate(`/researchers/${id}`);
  };

  const handleSpecializationClick = (specialization: string) => {
    setSelectedSpecialization(specialization);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInstitutionClick = (institution: string) => {
    setSelectedInstitution(institution);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return filteredResearchers.length > 0 ? (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentResearchers.map((researcher) => (
          <ResearcherCard
            key={researcher.id}
            researcher={researcher}
            onClick={handleResearcherClick}
            onSpecializationClick={handleSpecializationClick}
            onInstitutionClick={handleInstitutionClick}
          />
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}
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
  );
};
