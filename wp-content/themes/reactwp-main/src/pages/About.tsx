import React from "react";
import { BookOpen, Globe, Lightbulb, ShieldCheck, Target, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-slate-900 text-white relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-900/40"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heebo mb-6">
            אודות הפורום הישראלי למחקר פסיכדלי
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            קהילה מדעית המוקדשת לקידום הידע, המחקר והטיפול בתחום הפסיכדלי בישראל, תוך שמירה על סטנדרטים אקדמיים ואתיים מחמירים.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        
        {/* Mission Statement */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-bold mb-4">
              <Target className="w-4 h-4 ml-2" />
              החזון שלנו
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              מדע פורץ דרך למען בריאות הנפש
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>
                הפורום הישראלי למחקר פסיכדלי (IPRF) הוקם מתוך הבנה כי אנו עומדים בפני מהפכה בתחום בריאות הנפש. חומרים פסיכדליים, שנחקרו באינטנסיביות בשנות ה-50 וה-60, חוזרים לקדמת הבמה המדעית ומציגים פוטנציאל טיפולי יוצא דופן.
              </p>
              <p>
                מטרתנו היא לשמש כבית מקצועי לחוקרים, רופאים, מטפלים וסטודנטים. אנו פועלים ליצירת גשר בין המעבדה לקליניקה, ובין האקדמיה לציבור הרחב, כדי להבטיח שטיפולים אלו יוטמעו במערכת הבריאות בצורה בטוחה, אחראית ומבוססת ראיות.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500 rounded-2xl transform rotate-3 opacity-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800" 
              alt="Research Team" 
              className="relative rounded-2xl shadow-xl border border-slate-200"
            />
          </div>
        </section>

        {/* Core Pillars Grid */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            עמודי התווך של הפעילות
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">מחקר וחדשנות</h3>
              <p className="text-slate-600 text-sm">
                עידוד מחקרים קליניים ופרה-קליניים, שיתוף פעולה בין מוסדות אקדמיים, וגיוס מענקי מחקר לחוקרים צעירים.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">חינוך והכשרה</h3>
              <p className="text-slate-600 text-sm">
                בניית תוכניות הכשרה למטפלים, ארגון כנסים אקדמיים, והנגשת ידע מדעי עדכני לקהל הרחב בשפה העברית.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">קהילה ורישות</h3>
              <p className="text-slate-600 text-sm">
                יצירת פלטפורמה למפגש, דיון והחלפת רעיונות בין אנשי מקצוע מתחומים שונים: פסיכיאטריה, פסיכולוגיה, מדעי המוח ועוד.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">אתיקה ורגולציה</h3>
              <p className="text-slate-600 text-sm">
                קידום שיח אתי סביב השימוש בחומרים משני תודעה וסיוע בגיבוש מדיניות ציבורית אחראית מול הרשויות.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <Globe className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">הצטרפו לקהילת החוקרים</h2>
            <p className="text-indigo-100 text-lg">
              אם אתם חוקרים, רופאים או מטפלים העוסקים בתחום, אנו מזמינים אתכם לקחת חלק בפעילות הפורום ולהירשם לאינדקס אנשי המקצוע שלנו.
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
    </div>
  );
};