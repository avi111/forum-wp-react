import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getResearcherName, UserStatus } from "../types";
import {
  ArrowRight,
  Building2,
  Calendar,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const ResearcherProfile: React.FC = () => {
  const { researchers, articles, getResearchersFromServer } = useApp();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (researchers.length === 0) {
      setIsLoading(true);
      getResearchersFromServer().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getResearchersFromServer, researchers.length]);

  const researcher = researchers.find((r) => r.id === id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!researcher) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          החוקר לא נמצא
        </h2>
        <p className="text-slate-500 mb-6">
          יתכן שהקישור שגוי או שהפרופיל הוסר.
        </p>
        <button
          onClick={() => navigate("/researchers")}
          className="text-teal-600 font-bold hover:underline flex items-center"
        >
          <ArrowRight className="w-4 h-4 ml-1" />
          חזרה לאינדקס החוקרים
        </button>
      </div>
    );
  }

  const fullName = getResearcherName(researcher);

  // Filter articles belonging to this researcher
  const researcherArticles = articles.filter(
    (a) => a.authorId === researcher.id,
  );

  const handleInstitutionClick = () => {
    navigate(`/researchers?institution=${encodeURIComponent(researcher.institution)}`);
  };

  const handleSpecializationClick = () => {
    navigate(`/researchers?specialization=${encodeURIComponent(researcher.specialization)}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Profile Header */}
      <div className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-teal-900/50"></div>

        <div className="max-w-5xl mx-auto px-4 pt-20 pb-24 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-slate-400 hover:text-white flex items-center text-sm font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="relative">
              <img
                src={researcher.imageUrl}
                alt={fullName}
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-2xl object-cover bg-white"
              />
              <div
                className={`absolute bottom-2 left-2 w-4 h-4 rounded-full border-2 border-white ${researcher.status === UserStatus.ACTIVE ? "bg-green-500" : "bg-amber-500"}`}
              ></div>
            </div>

            <div className="text-center md:text-right flex-1">
              <h1 className="text-3xl md:text-4xl font-bold font-heebo mb-2">
                {fullName}
              </h1>
              <p 
                className="text-teal-400 text-lg font-medium mb-1 cursor-pointer hover:text-teal-300 hover:underline transition-all inline-block"
                onClick={handleSpecializationClick}
              >
                {researcher.specialization}
              </p>
              <div 
                className="flex items-center justify-center md:justify-start text-slate-300 text-sm cursor-pointer hover:text-white hover:underline transition-all"
                onClick={handleInstitutionClick}
              >
                <Building2 className="w-4 h-4 ml-1.5" />
                {researcher.institution}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Contact & Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-50 pb-2">
                פרטי התקשרות
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-slate-600 text-sm">
                  <Mail className="w-4 h-4 ml-3 text-teal-500 shrink-0" />
                  <a
                    href={`mailto:${researcher.email}`}
                    className="hover:text-teal-600 truncate"
                  >
                    {researcher.email}
                  </a>
                </div>
                {researcher.phone && (
                  <div className="flex items-center text-slate-600 text-sm">
                    <Phone className="w-4 h-4 ml-3 text-teal-500 shrink-0" />
                    <span dir="ltr" className="text-right">
                      {researcher.phone}
                    </span>
                  </div>
                )}
                <div 
                  className="flex items-center text-slate-600 text-sm cursor-pointer hover:text-teal-600 hover:underline transition-colors"
                  onClick={handleInstitutionClick}
                >
                  <MapPin className="w-4 h-4 ml-3 text-teal-500 shrink-0" />
                  <span>{researcher.institution}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-50 pb-2">
                מידע אקדמי
              </h3>
              <div className="space-y-4">
                {researcher.faculty && (
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">
                      פקולטה / חוג
                    </span>
                    <span className="text-slate-800 font-medium">
                      {researcher.faculty}
                    </span>
                  </div>
                )}
                {researcher.studentYear &&
                  researcher.studentYear !== "advanced" && (
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">
                        שנת לימודים
                      </span>
                      <span className="text-slate-800 font-medium">
                        שנה {researcher.studentYear}
                      </span>
                    </div>
                  )}
                {researcher.subSpecializations &&
                  researcher.subSpecializations.length > 0 && (
                    <div>
                      <span className="text-xs text-slate-400 block mb-2">
                        תחומי עניין נוספים
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {researcher.subSpecializations.map((sub) => (
                          <span
                            key={sub}
                            className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  אודות החוקר
                </h2>
              </div>

              <div className="prose prose-slate max-w-none leading-relaxed text-slate-600">
                {researcher.bio ? (
                  researcher.bio
                    .split("\n")
                    .map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                ) : (
                  <p className="text-slate-400 italic">לא הוזנה ביוגרפיה.</p>
                )}
              </div>
            </div>

            {/* Researcher Articles */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  פרסומים אחרונים
                </h2>
              </div>

              {researcherArticles.length > 0 ? (
                <div className="space-y-4">
                  {researcherArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => navigate(`/article/${article.id}`)}
                      className="cursor-pointer border border-slate-100 rounded-lg p-4 hover:border-teal-100 hover:shadow-md transition-all bg-slate-50/30"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-slate-800 mb-2 hover:text-teal-600 transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                            {article.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                            <div className="flex gap-2">
                              {article.tags.map((tag) => (
                                <Link
                                  key={tag}
                                  to={`/tags/${encodeURIComponent(tag)}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100 hover:bg-teal-100 transition-colors"
                                >
                                  {tag}
                                </Link>
                              ))}
                            </div>
                            <div className="flex items-center text-xs text-slate-400">
                              <Calendar className="w-3 h-3 ml-1" />
                              {article.date}
                            </div>
                          </div>
                        </div>
                        {article.imageUrl && (
                          <div className="hidden sm:block shrink-0">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-24 h-24 object-cover rounded-lg shadow-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-slate-200 rounded-lg bg-slate-50">
                  <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-slate-500 text-sm">
                    טרם פורסמו מאמרים על ידי חוקר זה.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
