import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, FileDown, Paperclip } from "lucide-react";
import { Article } from "../types";

export interface ArticleContentProps {
  article: Article;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const navigate = useNavigate();
  const pdfAttachments =
    article.attachments?.filter((a) => a.type === "pdf") || [];

  return (
    <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-12">
        <div className="text-xl text-slate-600 leading-relaxed font-serif mb-8 border-b border-slate-100 pb-8 font-medium">
          {article.excerpt}
        </div>
        <div
          className="prose prose-slate prose-lg max-w-none text-slate-800 leading-loose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Attachments Section */}
        {article.attachments && article.attachments.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <Paperclip className="w-5 h-5 ml-2 text-teal-600" />
              קבצים להורדה
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {article.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <div className="bg-red-100 p-2 rounded-lg ml-4">
                    <span className="text-xs font-bold text-red-700 uppercase">
                      {file.type}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-bold text-slate-800 text-sm truncate"
                      title={file.name}
                    >
                      {file.name}
                    </h4>
                    {file.size && (
                      <span className="text-xs text-slate-500">{file.size}</span>
                    )}
                  </div>
                  <a
                    href={file.url}
                    download
                    className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                    title="הורד קובץ"
                  >
                    <FileDown className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PDF Preview Section */}
        {pdfAttachments.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 ml-2 text-indigo-600" />
              תצוגה מקדימה
            </h4>
            <div className="space-y-6">
              {pdfAttachments.map((pdf, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden"
                >
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-500">
                    {pdf.name}
                  </div>
                  <iframe
                    src={`${pdf.url}#toolbar=0`}
                    className="w-full h-[600px]"
                    title={pdf.name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            פורסם בתאריך: {article.date}
          </div>
          <button
            onClick={() => navigate("/articles")}
            className="text-teal-600 font-bold hover:text-teal-700 transition-colors"
          >
            קרא מאמרים נוספים
          </button>
        </div>
      </div>
    </div>
  );
};
