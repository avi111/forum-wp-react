import React from "react";
import { InfoPage } from "../components/InfoPage";
import { Mail, MapPin } from "lucide-react";

export const Contact: React.FC = () => {
  return (
    <InfoPage title="צור קשר" icon={Mail}>
      <div className="grid md:grid-cols-2 gap-12 not-prose">
        <div className="space-y-6">
          <p className="text-lg text-slate-600">
            אנחנו כאן לכל שאלה, הצעה או רעיון לשיתוף פעולה.
            <br />
            מלאו את הטופס ונחזור אליכם בהקדם האפשרי.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-slate-700">
              <Mail className="w-5 h-5 ml-3 text-teal-500" />
              <span>contact@iprf.org.il</span>
            </div>
            <div className="flex items-center text-slate-700">
              <MapPin className="w-5 h-5 ml-3 text-teal-500" />
              <span>רחוב המדע 10, פארק המדע רחובות</span>
            </div>
          </div>
        </div>
        <form className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <input
            type="text"
            placeholder="שם מלא"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <input
            type="email"
            placeholder="אימייל לחזרה"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <textarea
            placeholder="תוכן ההודעה"
            rows={4}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          ></textarea>
          <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
            שליחת הודעה
          </button>
        </form>
      </div>
    </InfoPage>
  );
};
