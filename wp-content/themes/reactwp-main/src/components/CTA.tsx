import React from "react";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <section className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <Globe className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">הצטרפו לקהילת החוקרים</h2>
          <p className="text-indigo-100 text-lg">
            אם אתם חוקרים, רופאים או מטפלים העוסקים בתחום, אנו מזמינים אתכם
            לקחת חלק בפעילות הפורום ולהירשם לאינדקס אנשי המקצוע שלנו.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/join")}
              className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
            >
              הגשת בקשת הצטרפות
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-transparent border border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              צור קשר
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
