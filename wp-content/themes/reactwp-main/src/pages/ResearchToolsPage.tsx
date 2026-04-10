import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, ClipboardList, Loader2 } from "lucide-react";
import { useAllQuestionnaires } from "../hooks/useAppQueries"; // Will create this hook

export const ResearchToolsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: questionnaires, isLoading, isError } = useAllQuestionnaires(); // Use the new hook

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          שגיאה בטעינת שאלוני המחקר
        </h2>
        <p className="text-red-500 mb-6">
          אירעה שגיאה בעת טעינת הנתונים. אנא נסה שוב מאוחר יותר.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-100 rounded-full">
            <ClipboardList className="w-8 h-8 text-purple-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">כלי מחקר</h1>
        </div>

        {questionnaires && questionnaires.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionnaires.map((questionnaire) => (
              <Link
                key={questionnaire.id}
                to={`/questionnaire/${questionnaire.id}`}
                className="block bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:border-purple-200 hover:shadow-md transition-all"
              >
                {questionnaire.imageUrl && (
                  <img
                    src={questionnaire.imageUrl}
                    alt={questionnaire.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="font-bold text-xl text-slate-800 mb-2 hover:text-purple-600 transition-colors">
                  {questionnaire.title}
                </h2>
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
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg bg-white">
            <ClipboardList className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">
              אין שאלוני מחקר זמינים כרגע.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
