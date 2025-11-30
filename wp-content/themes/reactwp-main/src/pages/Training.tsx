import React from "react";
import { InfoPage } from "../components/InfoPage";
import { BookOpen, Calendar } from "lucide-react";

export const Training: React.FC = () => {
  return (
    <InfoPage title="הכשרות וקורסים" icon={BookOpen}>
      <p className="lead text-xl text-slate-600 mb-8">
        הפורום מרכז מידע אודות תוכניות הכשרה המוכרות על ידי משרד הבריאות,
        האוניברסיטאות והאיגודים המקצועיים.
      </p>
      <div className="grid md:grid-cols-2 gap-8 not-prose">
        <div className="border border-slate-200 p-6 rounded-xl bg-slate-50 hover:border-teal-300 transition-colors">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wide mb-2">
            קורס קליני
          </div>
          <h4 className="font-bold text-xl text-slate-900 mb-2">
            הכשרה לטיפול ב-MDMA ל-PTSD
          </h4>
          <p className="text-slate-600 mb-4">
            קורס מקיף המשלב תיאוריה ופרקטיקה, המיועד לפסיכולוגים ופסיכיאטרים
            מומחים.
          </p>
          <div className="text-sm text-slate-500 flex items-center">
            <Calendar className="w-4 h-4 ml-2" />
            אוקטובר 2024 | אוניברסיטת תל אביב
          </div>
        </div>
        <div className="border border-slate-200 p-6 rounded-xl bg-slate-50 hover:border-teal-300 transition-colors">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">
            קורס מקוון
          </div>
          <h4 className="font-bold text-xl text-slate-900 mb-2">
            פרמקולוגיה של חומרים פסיכדליים
          </h4>
          <p className="text-slate-600 mb-4">
            הבנת מנגנוני הפעולה העצביים, אינטראקציות בין-תרופתיות ובטיחות
            בשימוש.
          </p>
          <div className="text-sm text-slate-500 flex items-center">
            <Calendar className="w-4 h-4 ml-2" />
            זמין לצפייה בכל עת
          </div>
        </div>
      </div>
    </InfoPage>
  );
};
