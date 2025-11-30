import React from "react";
import { InfoPage } from "../components/InfoPage";
import { Calendar } from "lucide-react";

export const Meetings: React.FC = () => {
  return (
    <InfoPage title="מפגשי הפורום" icon={Calendar}>
      <p className="text-xl mb-8">
        אנו מקיימים מפגשים חודשיים לחברי הפורום, המהווים קרקע פורייה לדיון מדעי,
        הצגת מקרי בוחן ויצירת שיתופי פעולה.
      </p>
      <div className="space-y-4 not-prose">
        <div className="flex flex-col sm:flex-row gap-6 bg-white border border-slate-100 p-6 rounded-xl shadow-sm items-center">
          <div className="text-center min-w-[100px] border-l border-slate-200 pl-6">
            <div className="text-3xl font-bold text-indigo-600">15</div>
            <div className="text-sm font-bold text-slate-400 uppercase">
              יוני 2024
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              אינטגרציה פסיכדלית בקליניקה הציבורית
            </h3>
            <p className="text-slate-600 text-sm">
              פאנל מומחים בהנחיית ד&#34;ר קרן צור. דיון על האתגרים בהטמעת
              טיפולים חדשניים במערכת הבריאות הציבורית.
            </p>
          </div>
          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 mr-auto whitespace-nowrap">
            הרשמה
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 bg-white border border-slate-100 p-6 rounded-xl shadow-sm items-center">
          <div className="text-center min-w-[100px] border-l border-slate-200 pl-6">
            <div className="text-3xl font-bold text-indigo-600">20</div>
            <div className="text-sm font-bold text-slate-400 uppercase">
              יולי 2024
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              הרצאת אורח: פרופ&#39; דויד נאט
            </h3>
            <p className="text-slate-600 text-sm">
              שידור חי מלונדון. סקירה של המחקרים האחרונים מאימפריאל קולג&#39;.
            </p>
          </div>
          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 mr-auto whitespace-nowrap">
            הרשמה לזום
          </button>
        </div>
      </div>
    </InfoPage>
  );
};
