import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSettings,
  useResearchers,
  useArticles,
  useEvents,
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
} from "../types";
import { Brain, Loader2 } from "lucide-react";
import { initStrings } from "../services/stringService";

interface AppContextType {
  settings: AppSettings;
  researchers: Researcher[];
  articles: Article[];
  events: CalendarEvent[];
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading: loadingSettings } = useSettings();
  const { data: researchers = [], isLoading: loadingRes } = useResearchers();
  const { data: articles = [], isLoading: loadingArticles } = useArticles();

  const homeEventsLimit = settings ? settings.eventsItemsPerPage * 3 : 10;
  const { data: eventsData, isLoading: loadingEvents } = useEvents(
    1,
    homeEventsLimit,
    "future",
  );
  const events = eventsData?.data || [];

  const { data: meetings = [], isLoading: loadingMeetings } = useMeetings();
  const { data: trainings = [], isLoading: loadingTrainings } = useTrainings();
  const { data: newsItems = [], isLoading: loadingNewsItems } = useNews();

  const [currentUser, setCurrentUser] = useState<Researcher | null>(null);

  // Initialize the string service once settings are loaded
  useEffect(() => {
    if (settings?.strings) {
      initStrings(settings.strings);
    }
  }, [settings]);

  const isLoading =
    loadingSettings ||
    loadingRes ||
    loadingArticles ||
    loadingNewsItems ||
    loadingEvents ||
    loadingMeetings ||
    loadingTrainings;

  const userArticles = currentUser
    ? articles.filter((a) => a.authorId === currentUser.id)
    : [];

  const onJoin: OnJoin = (
    data: Omit<Researcher, "id" | "bio" | "status">,
    callback,
  ) => {
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
        data.firstName + " " + data.lastName,
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

    queryClient.setQueryData(
      ["researchers"],
      (old: Researcher[] | undefined) => {
        return old ? [...old, newResearcher] : [newResearcher];
      },
    );

    setCurrentUser(newResearcher);
    callback();
  };

  const onUpdateUser = (updatedUser: Researcher) => {
    queryClient.setQueryData(
      ["researchers"],
      (old: Researcher[] | undefined) => {
        return old
          ? old.map((r) => (r.id === updatedUser.id ? updatedUser : r))
          : [];
      },
    );
    setCurrentUser(updatedUser);
  };

  const onAddArticle = (newArticle: Article) => {
    queryClient.setQueryData(["articles"], (old: Article[] | undefined) => {
      return old ? [newArticle, ...old] : [newArticle];
    });
  };

  const simulateAdminApproval = () => {
    if (currentUser && currentUser.status === UserStatus.PENDING) {
      const approvedUser = { ...currentUser, status: UserStatus.ACTIVE };
      onUpdateUser(approvedUser);
      alert("הודעת מערכת (Simulation):\nהמשתמש אושר בהצלחה על ידי המנהל.");
    } else {
      alert("אין משתמש ממתין כרגע, או שהמשתמש כבר פעיל.");
    }
  };

  if (isLoading || !settings) {
    return (
      <div
        className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white"
        dir="rtl"
      >
        <div className="relative mb-8">
          <Brain className="w-24 h-24 text-teal-500 animate-pulse" />
          <div className="absolute inset-0 bg-teal-500 blur-xl opacity-20 rounded-full"></div>
        </div>
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
          <h2 className="text-2xl font-heebo font-bold tracking-wide">
            טוען נתונים...
          </h2>
        </div>
        <p className="text-slate-400 mt-2 text-sm">
          מתחבר לשרת הפורום הישראלי
        </p>
      </div>
    );
  }

  const value = {
    settings,
    researchers,
    articles,
    events,
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
