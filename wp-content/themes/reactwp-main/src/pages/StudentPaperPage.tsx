import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Eye, FileDown, Loader2 } from "lucide-react";
import { useApp } from "../context/AppContext"; // Assuming useApp will provide student papers
import { decodeHtml } from "../utils/decodeHtml";

export const StudentPaperPage: React.FC = () => {
  const { studentPapers, getStudentPapersFromServer } = useApp(); // Assuming these exist or will be added
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!studentPapers || studentPapers.length === 0) {
      setIsLoading(true);
      getStudentPapersFromServer().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getStudentPapersFromServer, studentPapers]);

  const paper = studentPapers?.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          מאמר הסטודנט לא נמצא
        </h2>
        <p className="text-slate-500 mb-6">יתכן שהקישור שגוי או שהמאמר הוסר.</p>
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
      {/* Hero / Header - Simplified for student paper */}
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-800 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold leading-tight mb-3">
            {decodeHtml(paper.title)}
          </h1>
          {paper.studentName && (
            <p className="text-teal-100 text-lg">מאת: {paper.studentName}</p>
          )}
          {paper.institution && (
            <p className="text-teal-100 text-md">{paper.institution}</p>
          )}
          {paper.year && (
            <p className="text-teal-100 text-md">שנה: {paper.year}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-12">
          {paper.excerpt && (
            <div className="text-xl text-slate-600 leading-relaxed font-serif mb-8 border-b border-slate-100 pb-8 font-medium">
              {decodeHtml(paper.excerpt)}
            </div>
          )}
          <article
            className="prose prose-slate prose-lg max-w-none text-slate-800 leading-loose"
            dangerouslySetInnerHTML={{ __html: paper.content }}
          />

          {/* PDF Preview Section */}
          {paper.pdfUrl && (
            <div className="mt-8">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 ml-2 text-indigo-600" />
                תצוגה מקדימה
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-500">
                  {decodeHtml(paper.title)}
                </div>
                <iframe
                  src={`${paper.pdfUrl}#toolbar=0`}
                  className="w-full h-[600px]"
                  title={decodeHtml(paper.title)}
                />
              </div>
              <a
                href={paper.pdfUrl}
                download
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <FileDown className="w-4 h-4 ml-2" />
                הורד מאמר
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
