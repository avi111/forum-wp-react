import React, { useState } from "react";
import { useStudentJobs, useStudentPapers } from "../hooks/useAppQueries";
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  FileText,
  Loader2,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Link } from "react-router-dom"; // Import Link

export const StudentsArea: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"papers" | "jobs">("papers");
  const [papersPage] = useState(1);
  const [jobsPage] = useState(1);
  const limit = 10;

  const papersQuery = useStudentPapers(papersPage, limit);
  const jobsQuery = useStudentJobs(jobsPage, limit);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <PageHeader
        title="איזור סטודנטים"
        description="עבודות אקדמיות של סטודנטים והזדמנויות תעסוקה ומחקר בתחום."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex space-x-4 space-x-reverse mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("papers")}
            className={`pb-4 px-4 flex items-center font-medium transition-colors ${
              activeTab === "papers"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <FileText className="w-5 h-5 ml-2" />
            עבודות סטודנטים
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`pb-4 px-4 flex items-center font-medium transition-colors ${
              activeTab === "jobs"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Briefcase className="w-5 h-5 ml-2" />
            משרות והזדמנויות
          </button>
        </div>

        {activeTab === "papers" && (
          <div>
            {papersQuery.isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            ) : papersQuery.data?.data && papersQuery.data.data.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {papersQuery.data.data.map((paper) => (
                  <Link
                    to={`/student-papers/${paper.id}`} // Link to student paper detail page
                    key={paper.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-100 flex flex-col group"
                  >
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {paper.title}
                    </h3>
                    <div className="text-sm text-slate-500 mb-4 flex flex-col gap-1">
                      {paper.studentName && (
                        <span>
                          <strong>מאת:</strong> {paper.studentName}
                        </span>
                      )}
                      {paper.institution && (
                        <span>
                          <strong>מוסד:</strong> {paper.institution}
                        </span>
                      )}
                      {paper.degree && (
                        <span>
                          <strong>תואר:</strong> {paper.degree}
                        </span>
                      )}
                      {paper.year && (
                        <span>
                          <strong>שנה:</strong> {paper.year}
                        </span>
                      )}
                    </div>
                    {paper.excerpt && (
                      <div
                        className="text-slate-600 mb-6 flex-grow line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: paper.excerpt }}
                      />
                    )}
                    <div className="mt-auto inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                      <ArrowRight className="w-4 h-4 ml-2" />
                      קרא עוד
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500">
                אין עבודות סטודנטים להצגה כרגע.
              </div>
            )}
          </div>
        )}

        {activeTab === "jobs" && (
          <div>
            {jobsQuery.isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
              </div>
            ) : jobsQuery.data?.data && jobsQuery.data.data.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobsQuery.data.data.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-100 flex flex-col"
                  >
                    <Link
                      to={`/student-jobs/${job.id}`} // Link to student job detail page
                      className="flex flex-col flex-grow group"
                    >
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="text-sm text-slate-500 mb-4 flex flex-col gap-1">
                        {job.companyName && (
                          <span>
                            <strong>מוסד/חברה:</strong> {job.companyName}
                          </span>
                        )}
                        {job.jobType && (
                          <span>
                            <strong>סוג משרה:</strong> {job.jobType}
                          </span>
                        )}
                        {job.location && (
                          <span>
                            <strong>מיקום:</strong> {job.location}
                          </span>
                        )}
                      </div>
                      <div
                        className="text-slate-600 mb-6 flex-grow line-clamp-4"
                        dangerouslySetInnerHTML={{ __html: job.content }}
                      />
                      <div className="mt-auto inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                        <ArrowRight className="w-4 h-4 ml-2" />
                        קרא עוד
                      </div>
                    </Link>

                    {job.applyLink && (
                      <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full inline-flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        הגש מועמדות
                        <ExternalLink className="w-4 h-4 mr-2" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500">
                אין משרות להצגה כרגע.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
