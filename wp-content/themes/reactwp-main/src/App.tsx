import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { NewsTicker } from "./components/NewsTicker";
import { routeConfig } from "./routes";
import { Article, Researcher, UserStatus } from "./types";
import { NAV_ITEMS } from "./mockData";
import { Brain, Loader2 } from "lucide-react";
import {
  useArticles,
  useEvents,
  useNews,
  useResearchers,
} from "./hooks/useAppQueries";

export default function App() {
  const queryClient = useQueryClient();

  // Fetch data using React Query hooks
  const { data: researchers = [], isLoading: loadingRes } = useResearchers();
  const { data: articles = [], isLoading: loadingArticles } = useArticles();
  const { data: events = [], isLoading: loadingEvents } = useEvents();
  const { data: newsItems = [], isLoading: loadingNewsItems } = useNews();

  // App State
  const [currentUser, setCurrentUser] = useState<Researcher | null>(null);

  const isLoading =
    loadingRes || loadingArticles || loadingNewsItems || loadingEvents;

  const onJoin = (data: Omit<Researcher, "id" | "bio" | "status">) => {
    const titleMap: Record<string, string> = {
      prof: "פרופ'",
      md: 'ד"ר',
      phd: 'ד"ר',
      mr: "מר",
      ms: "גב'",
    };

    const titleStr =
      data.title && titleMap[data.title] ? titleMap[data.title] : "";

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
      imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.firstName + " " + data.lastName)}&background=random`,

      username: data.username,
      phone: data.phone,
      gender: data.gender,
      idNumber: data.idNumber,
      faculty: data.faculty,
      subSpecializations: data.subSpecializations,
      studentYear: data.studentYear,
      newsletter: data.newsletter,
    };

    // Optimistically update the cache without waiting for a re-fetch (since we don't have a backend)
    queryClient.setQueryData(
      ["researchers"],
      (old: Researcher[] | undefined) => {
        return old ? [...old, newResearcher] : [newResearcher];
      },
    );

    setCurrentUser(newResearcher);

    window.location.hash = "#/dashboard";
  };

  const onUpdateUser = (updatedUser: Researcher) => {
    // Update cache
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
    // Update cache
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

  if (isLoading) {
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
        <p className="text-slate-400 mt-2 text-sm">מתחבר לשרת הפורום הישראלי</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-slate-50 font-sans flex flex-col text-slate-900"
        dir="rtl"
      >
        <NewsTicker news={newsItems} />

        <Navbar
          isLoggedIn={!!currentUser}
          onLogout={() => {
            setCurrentUser(null);
            window.location.hash = "#/";
          }}
          navItems={NAV_ITEMS}
          currentUser={currentUser}
        />

        <main className="flex-grow">
          <Routes>
            {routeConfig.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element({
                  articles,
                  currentUser,
                  events,
                  onAddArticle,
                  onJoin,
                  onUpdateUser,
                  researchers,
                  userArticles: [],
                })}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer
          currentUser={currentUser}
          onSimulateApproval={simulateAdminApproval}
        />
      </div>
    </BrowserRouter>
  );
}
