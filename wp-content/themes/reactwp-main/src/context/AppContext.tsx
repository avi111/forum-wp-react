import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { QueryObserverResult, useQueryClient } from "@tanstack/react-query";
import {
  useSettings,
  useResearchers,
  useArticles,
  useMeetings,
  useTrainings,
  useNews,
} from "../hooks/useAppQueries";
import {
  AppSettings,
  Article,
  CalendarEvent,
  Meeting,
  NewsItem,
  Researcher,
  Training,
  UserStatus,
  OnJoin,
  PaginatedResponse,
  SiteOptions,
} from "../types";
import { Brain } from "lucide-react";
import { initStrings } from "../services/stringService";
import { useAPI } from "../services/api";
import { NewsletterModal } from "../components/NewsletterModal";

type Fetcher<T> = () => Promise<QueryObserverResult<T, Error>>;
type EventsFetcher = (
  page?: number,
  limit?: number,
  timeFilter?: "future" | "past" | "all",
) => Promise<QueryObserverResult<PaginatedResponse<CalendarEvent>, Error>>;

export type Wpcf7Status =
  | "mail_sent" // הצלחה
  | "validation_failed" // שגיאת ולסדציה (שדה חובה חסר, אימייל לא תקין וכו')
  | "aborted" // נכשל (למשל בעיות שרת)
  | "spam" // נחסם על ידי מסנני ספאם (כמו Recaptcha או Akismet)
  | "mail_failed"; // השרת לא הצליח לשלוח את המייל

// 2. מבנה של שגיאת שדה ספציפית (מופיע רק ב-validation_failed)
export interface Wpcf7InvalidField {
  into: string; // ה-Selector של השדה (למשל: "span.wpcf7-form-control-wrap.your-email")
  message: string; // הודעת השגיאה הספציפית לשדה
  idref: null | string;
  error_id: string; // מזהה השגיאה (למשל: "-ve-your-email")
}

export interface Wpcf7Response {
  contact_form_id: number;
  status: Wpcf7Status;
  message: string; // ההודעה הכללית למשתמש (למשל "Thank you for your message...")
  posted_data_hash: string;
  into: string; // ה-ID של הקונטיינר של הטופס
  invalid_fields: Wpcf7InvalidField[]; // מערך ריק במקרה של הצלחה
}

interface AppContextType {
  settings: AppSettings;
  researchers: Researcher[];
  articles: Article[];
  // Tags cloud data
  tagsData: { tag: string; count: number }[] | null;
  isTagsLoading: boolean;
  getTagsFromServer: () => Promise<void>;
  meetings: Meeting[];
  trainings: Training[];
  newsItems: NewsItem[];
  currentUser: Researcher | null;
  setCurrentUser: (user: Researcher | null) => void;
  onJoin: OnJoin;
  onUpdateUser: (user: Researcher) => void;
  onAddArticle: (article: Article) => void;
  userArticles: Article[];
  simulateAdminApproval: () => void;
  getResearchersFromServer: Fetcher<Researcher[]>;
  getArticlesFromServer: Fetcher<Article[]>;
  getEventsFromServer: EventsFetcher;
  getMeetingsFromServer: Fetcher<Meeting[]>;
  getTrainingsFromServer: Fetcher<Training[]>;
  getNewsFromServer: Fetcher<NewsItem[]>;
  site: SiteOptions;
  openNewsletterModal: () => void;
  subscribeToNewsletter: (
    email: string,
  ) => Promise<{ success: boolean; message: string }>;
  sendContactForm7: (
    formId: number,
    data: Record<string, string>,
  ) => Promise<Wpcf7Response>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const {
    fetchTags,
    fetchEvents,
    fetchCurrentUser,
    subscribeToNewsletter,
    sendContactForm7,
  } = useAPI();

  const { data: settings, isLoading: loadingSettings } = useSettings();

  const { data: researchers = [], refetch: refetchResearchers } =
    useResearchers();
  const { data: articles = [], refetch: refetchArticles } = useArticles();
  const { data: meetings = [], refetch: refetchMeetings } = useMeetings();
  const { data: trainings = [], refetch: refetchTrainings } = useTrainings();
  const { data: newsItems = [], refetch: refetchNews } = useNews();

  const [currentUser, setCurrentUser] = useState<Researcher | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [tagsData, setTagsData] = useState<
    { tag: string; count: number }[] | null
  >(null);
  const [isTagsLoading, setIsTagsLoading] = useState(false);

  useEffect(() => {
    if (settings?.strings) {
      initStrings(settings.strings);
    }
  }, [settings]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      } finally {
        setIsAuthLoading(false);
      }
    };
    checkUser();
  }, [fetchCurrentUser]);

  const getResearchersFromServer = useCallback(
    () => refetchResearchers(),
    [refetchResearchers],
  );
  const getArticlesFromServer = useCallback(
    () => refetchArticles(),
    [refetchArticles],
  );
  const getMeetingsFromServer = useCallback(
    () => refetchMeetings(),
    [refetchMeetings],
  );
  const getTrainingsFromServer = useCallback(
    () => refetchTrainings(),
    [refetchTrainings],
  );
  const getNewsFromServer = useCallback(() => refetchNews(), [refetchNews]);

  const getEventsFromServer: EventsFetcher = useCallback(
    (page, limit, timeFilter) => {
      return queryClient.fetchQuery({
        queryKey: ["events", page, limit, timeFilter],
        queryFn: () => fetchEvents(page, limit, timeFilter),
      });
    },
    [queryClient, fetchEvents],
  );

  const userArticles = currentUser
    ? articles.filter((a) => a.authorId === currentUser.id)
    : [];

  const getTagsFromServer = useCallback(async () => {
    if (tagsData || isTagsLoading) return;
    setIsTagsLoading(true);
    try {
      const data = await fetchTags();
      setTagsData(data);
    } catch (e) {
      console.error("Failed to fetch tags:", e);
    } finally {
      setIsTagsLoading(false);
    }
  }, [tagsData, isTagsLoading, fetchTags]);

  const onJoin: OnJoin = useCallback(
    (data, callback) => {
      const titleStr =
        data.title && settings?.titleMap && settings.titleMap[data.title]
          ? settings.titleMap[data.title]
          : "";

      const newResearcher: Researcher = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        title: titleStr,
        email: data.email,
        institution: data.institution,
        specialization: data.specialization,
        bio: "",
        status: UserStatus.PENDING,
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          `${data.firstName} ${data.lastName}`,
        )}&background=random`,
        username: data.username,
        phone: data.phone,
        gender: data.gender,
        idNumber: data.idNumber,
        faculty: data.faculty,
        subSpecializations: data.subSpecializations,
        studentYear: data.studentYear,
        newsletter: data.newsletter,
      };

      queryClient.setQueryData(["researchers"], (old: Researcher[] = []) => [
        ...old,
        newResearcher,
      ]);
      setCurrentUser(newResearcher);
      callback();
    },
    [queryClient, settings],
  );

  const onUpdateUser = useCallback(
    (updatedUser: Researcher) => {
      queryClient.setQueryData(["researchers"], (old: Researcher[] = []) =>
        old.map((r) => (r.id === updatedUser.id ? updatedUser : r)),
      );
      setCurrentUser(updatedUser);
    },
    [queryClient],
  );

  const onAddArticle = useCallback(
    (newArticle: Article) => {
      queryClient.setQueryData(["articles"], (old: Article[] = []) => [
        newArticle,
        ...old,
      ]);
    },
    [queryClient],
  );

  const simulateAdminApproval = useCallback(() => {
    if (currentUser?.status === UserStatus.PENDING) {
      const approvedUser = { ...currentUser, status: UserStatus.ACTIVE };
      onUpdateUser(approvedUser);
      alert("הודעת מערכת (Simulation):\nהמשתמש אושר בהצלחה על ידי המנהל.");
    } else {
      alert("אין משתמש ממתין כרגע, או שהמשתמש כבר פעיל.");
    }
  }, [currentUser, onUpdateUser]);

  if (loadingSettings || !settings || isAuthLoading) {
    return (
      <div
        className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white"
        dir="rtl"
      >
        <Brain className="w-24 h-24 text-teal-500 animate-pulse" />
        <h2 className="text-2xl font-heebo font-bold tracking-wide mt-4">
          {isAuthLoading ? "מאמת משתמש..." : "טוען הגדרות..."}
        </h2>
      </div>
    );
  }

  const value: AppContextType = {
    settings,
    researchers,
    articles,
    tagsData,
    isTagsLoading,
    getTagsFromServer,
    meetings,
    trainings,
    newsItems,
    currentUser,
    setCurrentUser,
    onJoin,
    onUpdateUser,
    onAddArticle,
    userArticles,
    simulateAdminApproval,
    getResearchersFromServer,
    getArticlesFromServer,
    getEventsFromServer,
    getMeetingsFromServer,
    getTrainingsFromServer,
    getNewsFromServer,
    site: window.object.site,
    openNewsletterModal: () => setIsNewsletterOpen(true),
    subscribeToNewsletter,
    sendContactForm7,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
