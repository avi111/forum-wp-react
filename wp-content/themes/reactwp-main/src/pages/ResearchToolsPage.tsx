import React from "react";
import { Link } from "react-router-dom";
import { Brain, Calendar, ClipboardList, Loader2, Users } from "lucide-react";
import { useAllQuestionnaires } from "../hooks/useAppQueries";

// Mock data for Imaging Methods
const mockImagingMethods = [
  {
    id: "im1",
    title: "fMRI - דימות תהודה מגנטית תפקודי",
    excerpt: "הבנת פעילות מוחית בזמן אמת באמצעות זרימת דם.",
    imageUrl:
      "https://images.unsplash.com/photo-1621243804936-775306a8f2e3?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "im2",
    title: "EEG - אלקטרואנצפלוגרפיה",
    excerpt: "רישום פעילות חשמלית מוחית דרך הקרקפת.",
    imageUrl:
      "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "im3",
    title: "PET - טומוגרפיית פליטת פוזיטרונים",
    excerpt: "הדמיית תהליכים מטבוליים במוח באמצעות חומרים רדיואקטיביים.",
    imageUrl:
      "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=400",
  },
];

// Mock data for Participant Recruitment
const mockRecruitmentTools = [
  {
    id: "rec1",
    title: "פלטפורמת גיוס מתנדבים למחקר",
    excerpt: "מערכת לניהול וגיוס נחקרים פוטנציאליים למחקרים קליניים.",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "rec2",
    title: "הנחיות אתיות לגיוס אוכלוסיות פגיעות",
    excerpt: "מסמך מקיף המפרט את הכללים וההנחיות לגיוס אתי של נחקרים.",
    icon: <ClipboardList className="w-6 h-6 text-green-600" />,
  },
];

export const ResearchToolsPage: React.FC = () => {
  const { data: questionnaires, isLoading, isError } = useAllQuestionnaires();

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-800 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold leading-tight mb-3 font-heebo">
            כלי מחקר
          </h1>
          <p className="text-purple-100 text-lg">
            מאגר כלים ומשאבים לחוקרים בתחום הפסיכדלי
          </p>
        </div>
      </div>

      {/* Section 1: Research Questionnaires (White Stripe) */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 font-heebo flex items-center">
            <ClipboardList className="w-7 h-7 ml-3 text-purple-600" />
            שאלוני מחקר
          </h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : isError ? (
            <div className="text-center py-8 text-red-600">
              שגיאה בטעינת שאלוני המחקר.
            </div>
          ) : questionnaires && questionnaires.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questionnaires.map((questionnaire) => (
                <Link
                  key={questionnaire.id}
                  to={`/research-questionnaire/${questionnaire.id}`}
                  className="block bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:border-purple-200 hover:shadow-md transition-all"
                >
                  {questionnaire.imageUrl && (
                    <img
                      src={questionnaire.imageUrl}
                      alt={questionnaire.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-bold text-xl text-slate-800 mb-2 hover:text-purple-600 transition-colors">
                    {questionnaire.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                    {questionnaire.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-slate-400">
                    <Calendar className="w-3 h-3 ml-1" />
                    {questionnaire.date}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed border-slate-200 rounded-lg bg-slate-50">
              <ClipboardList className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">
                אין שאלוני מחקר זמינים כרגע.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Imaging Methods (Light Gray Stripe) */}
      <section className="w-full bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 font-heebo flex items-center">
            <Brain className="w-7 h-7 ml-3 text-indigo-600" />
            שיטות דימות
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockImagingMethods.map((method) => (
              <Link
                key={method.id}
                to={`/imaging-method/${method.id}`}
                className="block bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:border-indigo-200 hover:shadow-md transition-all"
              >
                {method.imageUrl && (
                  <img
                    src={method.imageUrl}
                    alt={method.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-bold text-xl text-slate-800 mb-2 hover:text-indigo-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {method.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Participant Recruitment (White Stripe) */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 font-heebo flex items-center">
            <Users className="w-7 h-7 ml-3 text-blue-600" />
            גיוס נחקרים
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockRecruitmentTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/recruitment-item/${tool.id}`}
                className="block bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:border-blue-200 hover:shadow-md transition-all flex items-start"
              >
                <div className="shrink-0 mt-1 ml-4">{tool.icon}</div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {tool.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
