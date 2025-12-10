import {
  INITIAL_ARTICLES,
  INITIAL_RESEARCHERS,
  MOCK_EVENTS,
  MOCK_MEETINGS,
  MOCK_NEWS,
  MOCK_SETTINGS,
  MOCK_TRAININGS,
  object,
} from "../mockData";
import {
  AppSettings,
  Article,
  CalendarEvent,
  ContactProps,
  Meeting,
  NewsItem,
  PaginatedResponse,
  Researcher,
  Training,
} from "../types";
import { useCallback } from "react";

export const getAdminAjaxUrl = () => {
  if (import.meta.env.DEV) {
    window.object = object;
  }
  const { site } = window.object || {};
  const { admin_ajax_url: adminAjaxUrl } = site || {};
  return adminAjaxUrl;
};

const SIMULATED_DELAY_MS = 1200;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_TEMPLATES: Record<string, string> = {
  "bylaws-modal": `
    <div class="space-y-4">
      <div class="flex gap-4">
        <span class="font-bold text-indigo-600">1.</span>
        <p>
          <strong class="text-slate-900">סודיות ואתיקה:</strong> 
          כל המידע המשותף בפורום זה נועד לדיון אקדמי/מחקרי בלבד. חל איסור מוחלט על הפצה או שימוש במידע רגיש מחוץ למסגרת הפורום ללא אישור מפורש מראש.
        </p>
      </div>
      <div class="flex gap-4">
        <span class="font-bold text-indigo-600">2.</span>
        <p>
          <strong class="text-slate-900">אימות זהות:</strong> 
          חברות בפורום מותנית באימות רקע אקדמי/מקצועי בלבד. צוות הניהול שומר לעצמו את הזכות לסרב או לבטל חברות של משתמשים שאינם עומדים בקריטריונים אלו.
        </p>
      </div>
      <div class="flex gap-4">
        <span class="font-bold text-indigo-600">3.</span>
        <p>
          <strong class="text-slate-900">שימוש הוגן:</strong> 
          אין לפרסם תוכן המפר זכויות יוצרים או קניין רוחני.
        </p>
      </div>
      <div class="flex gap-4">
        <span class="font-bold text-indigo-600">4.</span>
        <p>
          <strong class="text-slate-900">אכיפה:</strong> 
          חברים שיפרו את התקנון עלולים להיחסם מהפורום באופן מיידי וללא אזהרה מוקדמת.
        </p>
      </div>
    </div>
  `,
  about: `
    <!-- Header Section -->
    <div class="bg-slate-900 text-white relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-10"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-900/40"></div>
      <div class="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h1 class="text-4xl md:text-5xl font-bold font-heebo mb-6">אודות הפורום הישראלי למחקר פסיכדלי</h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">קהילה מדעית המוקדשת לקידום הידע, המחקר והטיפול בתחום הפסיכדלי בישראל, תוך שמירה על סטנדרטים אקדמיים ואתיים מחמירים.</p>
      </div>
    </div>
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-16 space-y-20">
      <!-- Mission Statement -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-bold mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ml-2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            החזון שלנו
          </div>
          <h2 class="text-3xl font-bold text-slate-900 mb-6">מדע פורץ דרך למען בריאות הנפש</h2>
          <div class="space-y-4 text-slate-600 leading-relaxed text-lg">
            <p>הפורום הישראלי למחקר פסיכדלי (IPRF) הוקם מתוך הבנה כי אנו עומדים בפני מהפכה בתחום בריאות הנפש. חומרים פסיכדליים, שנחקרו באינטנסיביות בשנות ה-50 וה-60, חוזרים לקדמת הבמה המדעית ומציגים פוטנציאל טיפולי יוצא דופן.</p>
            <p>מטרתנו היא לשמש כבית מקצועי לחוקרים, רופאים, מטפלים וסטודנטים. אנו פועלים ליצירת גשר בין המעבדה לקליניקה, ובין האקדמיה לציבור הרחב, כדי להבטיח שטיפולים אלו יוטמעו במערכת הבריאות בצורה בטוחה, אחראית ומבוססת ראיות.</p>
          </div>
        </div>
        <div class="relative">
          <div class="absolute inset-0 bg-teal-500 rounded-2xl transform rotate-3 opacity-10"></div>
          <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800" alt="Research Team" class="relative rounded-2xl shadow-xl border border-slate-200" />
        </div>
      </section>
      <!-- Core Pillars Grid -->
      <section>
        <h2 class="text-3xl font-bold text-slate-900 text-center mb-12">עמודי התווך של הפעילות</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M15.09 16.05a1 1 0 0 1-1.42 1.42l-2.12-2.12a1 1 0 0 1 0-1.42l2.12-2.12a1 1 0 0 1 1.42 1.42L14 14.05l1.09 1Z"></path><path d="M12 2a7.5 7.5 0 0 0-5.13 12.87l-2.12 2.13a1 1 0 0 0 0 1.42l2.12 2.12a1 1 0 0 0 1.42 0l2.12-2.12A7.5 7.5 0 1 0 12 2Z"></path><path d="M12 2v5"></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-3">מחקר וחדשנות</h3><p class="text-slate-600 text-sm">עידוד מחקרים קליניים ופרה-קליניים, שיתוף פעולה בין מוסדות אקדמיים, וגיוס מענקי מחקר לחוקרים צעירים.</p></div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-3">חינוך והכשרה</h3><p class="text-slate-600 text-sm">בניית תוכניות הכשרה למטפלים, ארגון כנסים אקדמיים, והנגשת ידע מדעי עדכני לקהל הרחב בשפה העברית.</p></div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-3">קהילה ורישות</h3><p class="text-slate-600 text-sm">יצירת פלטפורמה למפגש, דיון והחלפת רעיונות בין אנשי מקצוע מתחומים שונים: פסיכיאטריה, פסיכולוגיה, מדעי המוח ועוד.</p></div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-3">אתיקה ורגולציה</h3><p class="text-slate-600 text-sm">קידום שיח אתי סביב השימוש בחומרים משני תודעה וסיוע בגיבוש מדיניות ציבורית אחראית מול הרשויות.</p></div>
        </div>
      </section>
    </div>
  `,
  "home-features": `
    <div class="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
        <div class="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
          <div class="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-slate-900">מאגר ידע</h3>
          <p class="text-slate-600 leading-relaxed">גישה למאמרים מדעיים, סקירות ספרות ומחקרים עדכניים מהארץ ומהעולם בתחום הפסיכדלי.</p>
        </div>
        <div class="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
          <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-slate-900">קהילה מקצועית</h3>
          <p class="text-slate-600 leading-relaxed">אינדקס חוקרים מקיף המאפשר יצירת שיתופי פעולה בין אקדמיה, קליניקה ומחקר.</p>
        </div>
        <div class="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
          <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-slate-900">כנסים והכשרות</h3>
          <p class="text-slate-600 leading-relaxed">לוח אירועים עדכני של כנסים בינלאומיים, ימי עיון, וובינרים וקורסי הכשרה מקצועיים.</p>
        </div>
      </div>
    </div>
  `,
};

type WpPostFetcher = <T>(
  action: string,
  data?: Record<string, never>,
) => Promise<T>;

export const useAPI = () => {
  const post: WpPostFetcher = useCallback(async (action, data = {}) => {
    const url = getAdminAjaxUrl();
    if (!url) {
      throw new Error("Admin AJAX URL is not configured.");
    }

    const formData = new FormData();
    formData.append("action", action);

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      try {
        return JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        throw new Error(`Failed to parse JSON response: ${responseText}`);
      }
    } catch (error) {
      console.error("WordPress request failed:", error);
      throw error;
    }
  }, []);

  const fetchTemplate = useCallback(
    async (templateName: string): Promise<string | null> => {
      await delay(800);
      return MOCK_TEMPLATES[templateName] || null;
    },
    [],
  );

  const fetchSettings = useCallback(async (): Promise<AppSettings> => {
    await delay(500);
    return { ...MOCK_SETTINGS };
  }, []);

  const fetchResearchers = useCallback(async (): Promise<Researcher[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...INITIAL_RESEARCHERS];
  }, []);

  const fetchArticles = useCallback(async (): Promise<Article[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...INITIAL_ARTICLES];
  }, []);

  const fetchNews = useCallback(async (): Promise<NewsItem[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...MOCK_NEWS];
  }, []);

  const fetchEvents = useCallback(
    async (
      page = 1,
      limit = 100,
      timeFilter: "future" | "past" | "all" = "all",
    ): Promise<PaginatedResponse<CalendarEvent>> => {
      await delay(SIMULATED_DELAY_MS);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      let filteredEvents = MOCK_EVENTS;
      if (timeFilter === "future") {
        filteredEvents = MOCK_EVENTS.filter(
          (event) => new Date(event.date) >= now,
        );
      } else if (timeFilter === "past") {
        filteredEvents = MOCK_EVENTS.filter(
          (event) => new Date(event.date) < now,
        );
      }
      if (timeFilter === "past") {
        filteredEvents.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      } else {
        filteredEvents.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      }
      const start = (page - 1) * limit;
      const end = start + limit;
      const data = filteredEvents.slice(start, end);
      return { data, total: filteredEvents.length };
    },
    [],
  );

  const fetchMeetings = useCallback(async (): Promise<Meeting[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...MOCK_MEETINGS];
  }, []);

  const fetchTrainings = useCallback(async (): Promise<Training[]> => {
    await delay(SIMULATED_DELAY_MS);
    return [...MOCK_TRAININGS];
  }, []);

  const sendContactMessage = useCallback(
    async (data: ContactProps): Promise<void> => {
      await delay(1500);
      console.log("Contact message sent:", data);
      return;
    },
    [],
  );

  return {
    post,
    fetchSettings,
    fetchTemplate,
    fetchResearchers,
    fetchArticles,
    fetchNews,
    fetchEvents,
    fetchMeetings,
    fetchTrainings,
    sendContactMessage,
  };
};
