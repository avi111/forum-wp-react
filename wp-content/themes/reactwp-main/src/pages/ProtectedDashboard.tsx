
import React from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { useApp } from "../context/AppContext";

export const ProtectedDashboard: React.FC = () => {
  const { currentUser } = useApp();

  if (currentUser) {
    return <Dashboard />;
  }

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          התחברות נדרשת
        </h3>
        <p className="text-slate-500">
          יש להירשם או להתחבר על מנת לצפות באזור האישי.
        </p>
        <Link
          to="/join"
          className="mt-4 inline-block text-teal-600 font-bold hover:underline"
        >
          להרשמה לחץ כאן
        </Link>
      </div>
    </div>
  );
};
