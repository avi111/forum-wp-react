import React, { useState } from "react";
import { Article, getResearcherName, Researcher, UserStatus } from "../types";
import { enhanceBio } from "../services/geminiService";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  Save,
  Sparkles,
  User,
} from "lucide-react";

interface DashboardProps {
  currentUser: Researcher;
  onUpdateUser: (user: Researcher) => void;
  userArticles: Article[];
  onAddArticle: (article: Article) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  onUpdateUser,
  userArticles,
  onAddArticle,
}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "articles">("profile");
  const [bioInput, setBioInput] = useState(currentUser.bio);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Article Form State
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleContent, setNewArticleContent] = useState("");

  const handleEnhanceBio = async () => {
    setIsEnhancing(true);
    const enhanced = await enhanceBio(
      bioInput,
      getResearcherName(currentUser),
      currentUser.specialization,
    );
    setBioInput(enhanced);
    setIsEnhancing(false);
  };

  const handleSaveProfile = () => {
    onUpdateUser({ ...currentUser, bio: bioInput });
    // In a real WP/Toolset site, this would trigger a CRED form submission
    alert("הפרופיל עודכן בהצלחה!");
  };

  const handleSaveArticle = () => {
    if (!newArticleTitle || !newArticleContent) return;

    const newArticle: Article = {
      id: Date.now().toString(),
      title: newArticleTitle,
      content: newArticleContent,
      excerpt: newArticleContent.substring(0, 120) + "...",
      authorId: currentUser.id,
      authorName: getResearcherName(currentUser),
      date: new Date().toLocaleDateString("he-IL"),
      isEditorial: false, // User submitted articles are not Editorial
      tags: ["מחקר", currentUser.specialization],
      imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`, // Placeholder for featured image
    };
    onAddArticle(newArticle);
    setIsAddingArticle(false);
    setNewArticleTitle("");
    setNewArticleContent("");
  };

  // --- STANDBY VIEW (Frozen Account) ---
  if (currentUser.status === UserStatus.PENDING) {
    return (
      <div className="max-w-2xl mx-auto mt-16 px-4">
        <div className="bg-amber-50 border-r-4 border-amber-500 rounded-lg shadow-lg p-8">
          <div className="flex items-start">
            <Clock className="w-10 h-10 text-amber-500 ml-4 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-3">
                חשבונך בהמתנה לאישור
              </h2>
              <p className="text-amber-800 leading-relaxed text-lg">
                תודה שנרשמת לפורום הישראלי למחקר פסיכדלי.
                <br />
                הפרטים שלך התקבלו ונמצאים כעת בבדיקה על ידי צוות האתר.
              </p>
              <div className="mt-6 bg-white/50 p-4 rounded text-sm text-amber-900/70">
                <strong>מה קורה עכשיו?</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>מנהל המערכת בודק את זכאותך.</li>
                  <li>
                    לאחר האישור (&#34;הפשרה&#34;), תקבל גישה מלאה לאזור האישי.
                  </li>
                  <li>תוכל לערוך את הביוגרפיה ולהגיש מאמרים לפרסום.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- ACTIVE DASHBOARD (WP Admin / Toolset Frontend) ---
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-72 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100 text-center">
              <div className="h-24 w-24 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4">
                {getResearcherName(currentUser).charAt(0)}
              </div>
              <h2 className="font-bold text-slate-900 text-lg">
                {getResearcherName(currentUser)}
              </h2>
              <p className="text-sm text-slate-500">
                {currentUser.specialization}
              </p>
              <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle2 className="w-3 h-3 ml-1" />
                חוקר מאושר
              </div>
            </div>
            <nav className="p-2 space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center p-3 rounded-lg transition-colors text-sm font-medium ${
                  activeTab === "profile"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <User className="w-5 h-5 ml-3" />
                עריכת פרופיל חוקר
              </button>
              <button
                onClick={() => setActiveTab("articles")}
                className={`w-full flex items-center p-3 rounded-lg transition-colors text-sm font-medium ${
                  activeTab === "articles"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <FileText className="w-5 h-5 ml-3" />
                ניהול מאמרים
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-6 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  עריכת פרטים אישיים
                </h2>
                <p className="text-slate-500 mt-1">
                  נהל את המידע שמוצג בכרטיס החוקר שלך באתר.
                </p>
              </div>

              <div className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      שם מלא
                    </label>
                    <input
                      type="text"
                      value={getResearcherName(currentUser)}
                      disabled
                      className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      אימייל
                    </label>
                    <input
                      type="email"
                      value={currentUser.email}
                      disabled
                      className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    מוסד אקדמי / קליניקה
                  </label>
                  <input
                    type="text"
                    value={currentUser.institution}
                    onChange={(e) =>
                      onUpdateUser({
                        ...currentUser,
                        institution: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                  />
                </div>

                <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-bold text-slate-800">
                      ביוגרפיה מקצועית
                    </label>
                    <button
                      onClick={handleEnhanceBio}
                      disabled={isEnhancing}
                      className="flex items-center text-xs font-medium text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-all shadow-sm"
                    >
                      <Sparkles
                        className={`w-3 h-3 ml-1.5 ${isEnhancing ? "animate-spin" : "text-indigo-500"}`}
                      />
                      {isEnhancing
                        ? "מייצר נוסח חדש..."
                        : "שפר ניסוח באמצעות AI"}
                    </button>
                  </div>
                  <textarea
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                    rows={6}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    placeholder="כתוב כאן על הרקע המקצועי שלך, תחומי המחקר והעשייה..."
                  />
                  <p className="text-xs text-slate-500 mt-2 flex items-center">
                    <AlertCircle className="w-3 h-3 ml-1" />
                    הביוגרפיה תופיע באינדקס החוקרים הציבורי.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-teal-900/20 transition-all hover:-translate-y-0.5"
                  >
                    <Save className="w-5 h-5 ml-2" />
                    שמור שינויים
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "articles" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 animate-fade-in">
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    ניהול מאמרים
                  </h2>
                  <p className="text-slate-500 mt-1">
                    פרסום מחקרים, דעות ומאמרים מקצועיים.
                  </p>
                </div>
                {!isAddingArticle && (
                  <button
                    onClick={() => setIsAddingArticle(true)}
                    className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-indigo-900/20 transition-all"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    מאמר חדש
                  </button>
                )}
              </div>

              {isAddingArticle ? (
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 animate-slide-up">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    עורך המאמרים
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        כותרת
                      </label>
                      <input
                        type="text"
                        value={newArticleTitle}
                        onChange={(e) => setNewArticleTitle(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="הכנס כותרת ראשית..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        תוכן המאמר
                      </label>
                      <textarea
                        value={newArticleContent}
                        onChange={(e) => setNewArticleContent(e.target.value)}
                        rows={12}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-serif"
                        placeholder="הכנס את תוכן המאמר כאן..."
                      />
                    </div>
                    <div className="flex space-x-3 space-x-reverse pt-4">
                      <button
                        onClick={handleSaveArticle}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 shadow"
                      >
                        פרסם באתר
                      </button>
                      <button
                        onClick={() => setIsAddingArticle(false)}
                        className="bg-white text-slate-600 border border-slate-300 px-6 py-2 rounded-lg font-medium hover:bg-slate-50"
                      >
                        ביטול
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {userArticles.length === 0 ? (
                    <div className="text-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900">
                        טרם פורסמו מאמרים
                      </h3>
                      <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                        זה הזמן לשתף את המחקר והידע שלך עם קהילת החוקרים בישראל.
                      </p>
                      <button
                        onClick={() => setIsAddingArticle(true)}
                        className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline"
                      >
                        לחץ כאן ליצירת מאמר ראשון
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {userArticles.map((article) => (
                        <div
                          key={article.id}
                          className="flex flex-col sm:flex-row bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow group"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-bold">
                                פורסם
                              </span>
                              <span className="text-slate-400 text-xs">
                                {article.date}
                              </span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                              {article.title}
                            </h3>
                            <p className="text-slate-600 text-sm line-clamp-2">
                              {article.excerpt}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:mr-6 flex items-center">
                            <button className="text-sm font-medium text-slate-400 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 px-4 py-2 rounded-lg transition-colors">
                              ערוך
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
