import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Briefcase, Link, Loader2, MapPin } from "lucide-react";
import { useApp } from "../context/AppContext"; // Assuming useApp will provide student jobs

export const StudentJobPage: React.FC = () => {
  const { studentJobs, getStudentJobsFromServer } = useApp(); // Assuming these exist or will be added
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!studentJobs || studentJobs.length === 0) {
      setIsLoading(true);
      getStudentJobsFromServer().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getStudentJobsFromServer, studentJobs]);

  const job = studentJobs?.find((j) => j.id === id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          הצעת העבודה לא נמצאה
        </h2>
        <p className="text-slate-500 mb-6">
          יתכן שהקישור שגוי או שההצעה הוסרה.
        </p>
        <button
          onClick={() => navigate("/students")} // Corrected path
          className="text-teal-600 font-bold hover:underline flex items-center"
        >
          <ArrowRight className="w-4 h-4 ml-1" />
          חזרה לאזור הסטודנטים
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Hero / Header - Simplified for student job */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold leading-tight mb-3">
            {job.title}
          </h1>
          {job.companyName && (
            <p className="text-indigo-100 text-lg">חברה: {job.companyName}</p>
          )}
          <div className="flex justify-center items-center gap-4 mt-2 text-indigo-100 text-md">
            {job.jobType && (
              <span className="flex items-center">
                <Briefcase className="w-4 h-4 ml-1" /> {job.jobType}
              </span>
            )}
            {job.location && (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 ml-1" /> {job.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-12">
          <article
            className="prose prose-slate prose-lg max-w-none text-slate-800 leading-loose"
            dangerouslySetInnerHTML={{ __html: job.content }}
          />

          {/* Apply Link Section */}
          {job.applyLink && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <Link className="w-5 h-5 ml-2 text-green-600" />
                להגשת מועמדות
              </h4>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ArrowRight className="w-5 h-5 ml-2" />
                הגש מועמדות עכשיו
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={() => navigate("/students")} // Corrected path
              className="text-teal-600 font-bold hover:text-teal-700 transition-colors"
            >
              חזרה לאזור הסטודנטים
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
