import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

export const PageNotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-slate-50">
      <div className="text-center p-8">
        <div className="inline-block bg-red-100 p-4 rounded-full mb-4">
          <Frown className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          404 - עמוד לא נמצא
        </h1>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          מצטערים, לא מצאנו את העמוד שחיפשת. ייתכן שהקישור שבור או שהעמוד הוסר.
        </p>
        <Link
          to="/"
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
};
