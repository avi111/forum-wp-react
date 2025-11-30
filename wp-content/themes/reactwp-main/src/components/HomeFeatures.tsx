import React from "react";
import { BookOpen, Calendar, Users } from "lucide-react";

export const HomeFeatures: React.FC = () => {
  return (
    <div className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
          <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <BookOpen className="w-8 h-8 text-teal-600" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-slate-900">מאגר ידע</h3>
          <p className="text-slate-600 leading-relaxed">
            גישה למאמרים מדעיים, סקירות ספרות ומחקרים עדכניים מהארץ ומהעולם
            בתחום הפסיכדלי.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-slate-900">
            קהילה מקצועית
          </h3>
          <p className="text-slate-600 leading-relaxed">
            אינדקס חוקרים מקיף המאפשר יצירת שיתופי פעולה בין אקדמיה, קליניקה
            ומחקר.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-slate-900">
            כנסים והכשרות
          </h3>
          <p className="text-slate-600 leading-relaxed">
            לוח אירועים עדכני של כנסים בינלאומיים, ימי עיון, וובינרים וקורסי
            הכשרה מקצועיים.
          </p>
        </div>
      </div>
    </div>
  );
};
