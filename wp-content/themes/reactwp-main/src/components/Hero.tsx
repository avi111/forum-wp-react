import React, { ReactNode } from "react";

interface HeroProps {
  children?: ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ children }) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden min-h-[500px] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop"
          alt="Abstract Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-right space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 ml-2 animate-pulse"></span>
            הפורום הרשמי למחקר אקדמי בישראל
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight font-heebo">
            מדע. תודעה. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
              ריפוי.
            </span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-300 font-light leading-relaxed">
            הבית של קהילת המחקר הפסיכדלי בישראל. הפלטפורמה המובילה לחיבור בין
            חוקרים, שיתוף ידע וקידום רגולציה מבוססת מדע.
          </p>
          {children && <div className="pt-4">{children}</div>}
        </div>
        <div className="hidden md:block flex-1 relative animate-float">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <img
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
              alt="Research"
              className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </div>
  );
};