import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Training } from "../types";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  MapPin,
  Users,
} from "lucide-react";

interface TrainingPageProps {
  trainings: Training[];
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ trainings }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const training = trainings.find((t) => t.id === id);

  if (!training) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          ההכשרה לא נמצאה
        </h2>
        <button
          onClick={() => navigate("/training")}
          className="text-teal-600 font-bold hover:underline flex items-center"
        >
          <ArrowRight className="w-4 h-4 ml-1" />
          חזרה לרשימת ההכשרות
        </button>
      </div>
    );
  }

  const getThemeColor = () => {
    switch (training.colorTheme) {
      case "indigo":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "purple":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-teal-600 bg-teal-50 border-teal-200";
    }
  };

  const themeClass = getThemeColor();

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white relative py-16">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        {training.imageUrl && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={training.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate("/training")}
            className="mb-8 text-slate-400 hover:text-white flex items-center text-sm font-medium transition-colors w-fit"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה להכשרות
          </button>

          <div className="max-w-4xl">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${themeClass} bg-opacity-90`}
            >
              {training.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-heebo mb-6 leading-tight">
              {training.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-slate-300 text-sm md:text-base">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 ml-2 text-teal-400" />
                {training.date}
              </div>
              {training.location && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 ml-2 text-teal-400" />
                  {training.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 ml-2 text-teal-600" />
              אודות ההכשרה
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
              {training.fullDescription || training.description}
            </div>
          </div>

          {/* Syllabus */}
          {training.syllabus && training.syllabus.length > 0 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                סילבוס ותכני הקורס
              </h2>
              <div className="space-y-4">
                {training.syllabus.map((module, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-slate-800 flex justify-between items-center">
                      <span>{module.title}</span>
                      <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">
                        יחידה {idx + 1}
                      </span>
                    </div>
                    <div className="p-5">
                      <ul className="space-y-2">
                        {module.topics.map((topic, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-slate-600"
                          >
                            <CheckCircle className="w-4 h-4 ml-2 text-teal-500 mt-0.5 shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100 sticky top-24">
            <div className="mb-6">
              <span className="text-slate-500 text-sm block mb-1">
                עלות ההכשרה
              </span>
              <div className="text-3xl font-bold text-slate-900">
                {training.price || "ללא עלות"}
              </div>
            </div>

            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-teal-900/20 transition-all transform hover:-translate-y-0.5 mb-4 text-lg">
              הרשמה לקורס
            </button>

            <p className="text-xs text-center text-slate-500">
              מספר המקומות מוגבל. ההרשמה מותנית באישור ועדת קבלה.
            </p>
          </div>

          {/* Instructors */}
          {training.instructors && training.instructors.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Users className="w-4 h-4 ml-2 text-indigo-600" />
                צוות המרצים
              </h3>
              <ul className="space-y-3">
                {training.instructors.map((instructor, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                      {instructor.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {instructor}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
