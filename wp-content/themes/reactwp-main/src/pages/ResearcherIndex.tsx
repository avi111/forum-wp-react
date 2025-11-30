import React, { useState } from "react";
import { getResearcherName, Researcher, UserStatus } from "../types";
import { MapPin, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResearcherIndexProps {
  researchers: Researcher[];
}

export const ResearcherIndex: React.FC<ResearcherIndexProps> = ({
  researchers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // Filter logic: Check name, institution, or specialization
  const filteredResearchers = researchers.filter((r) => {
    const term = searchTerm.toLowerCase();
    const isActive = r.status === UserStatus.ACTIVE;
    const matchesSearch =
      getResearcherName(r).toLowerCase().includes(term) ||
      r.institution.toLowerCase().includes(term) ||
      r.specialization.toLowerCase().includes(term);

    return isActive && matchesSearch;
  });

  const handleResearcherClick = (r: Researcher) => {
    navigate(`/researchers/${r.id}`);
  };

  const handleSelectSuggestion = (name: string) => {
    setSearchTerm(name);
    // No need to set focus false immediately, filtering happens via state
  };

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

      {/* Search Section with Autocomplete */}
      <div className="mb-12 flex justify-center relative z-20">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click on suggestion
            placeholder="חיפוש חוקר לפי שם, מוסד או התמחות..."
            className="w-full p-4 pr-12 pl-10 border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-lg transition-all"
          />
          <Search className="absolute top-4 right-4 text-slate-400 w-6 h-6" />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute top-4 left-4 text-slate-300 hover:text-slate-500"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {/* Autocomplete Dropdown */}
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

      {/* Results Grid */}
      {filteredResearchers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResearchers.map((researcher) => (
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
                    className="text-indigo-600 text-sm font-medium hover:underline"
                    onClick={() => handleResearcherClick(researcher)}
                  >
                    צפה בפרופיל מלא
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <Search className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700">לא נמצאו חוקרים</h3>
          <p className="text-slate-500">נסה לחפש מונח אחר או בדוק את האיות</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 text-teal-600 font-bold hover:underline"
          >
            נקה חיפוש
          </button>
        </div>
      )}
    </div>
  );
};
