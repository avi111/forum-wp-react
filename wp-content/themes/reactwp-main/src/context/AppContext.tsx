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
  Meeting,
  NewsItem,
  Researcher,
  Training,
  UserStatus,
  OnJoin,
} from "../types";
import { Brain } from "lucide-react";
import { initStrings } from "../services/stringService";

type Fetcher<T> = () => Promise<QueryObserverResult<T, Error>>;

interface AppContextType {
  settings: AppSettings;
  researchers: Researcher[];
  articles: Article[];
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
  getMeetingsFromServer: Fetcher<Meeting[]>;
  getTrainingsFromServer: Fetcher<Training[]>;
  getNewsFromServer: Fetcher<NewsItem[]>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading: loadingSettings } = useSettings();

  const { data: researchers = [], refetch: refetchResearchers } =
    useResearchers();
  const { data: articles = [], refetch: refetchArticles } = useArticles();
  const { data: meetings = [], refetch: refetchMeetings } = useMeetings();
  const { data: trainings = [], refetch: refetchTrainings } = useTrainings();
  const { data: newsItems = [], refetch: refetchNews } = useNews();

  const [currentUser, setCurrentUser] = useState<Researcher | null>(null);

  useEffect(() => {
    if (settings?.strings) {
      initStrings(settings.strings);
    }
  }, [settings]);

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

  const userArticles = currentUser
    ? articles.filter((a) => a.authorId === currentUser.id)
    : [];

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

  if (loadingSettings || !settings) {
    return (
      <div
        className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white"
        dir="rtl"
      >
        <Brain className="w-24 h-24 text-teal-500 animate-pulse" />
        <h2 className="text-2xl font-heebo font-bold tracking-wide mt-4">
          טוען הגדרות...
        </h2>
      </div>
    );
  }

  const value: AppContextType = {
    settings,
    researchers,
    articles,
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
    getMeetingsFromServer,
    getTrainingsFromServer,
    getNewsFromServer,
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
