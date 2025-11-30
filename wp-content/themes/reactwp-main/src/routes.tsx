import { Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { ResearcherIndex } from "./pages/ResearcherIndex";
import { ArticleList } from "./pages/ArticleList";
import { JoinForm } from "./pages/JoinForm";
import { Training } from "./pages/Training";
import { Events } from "./pages/Events";
import { Contact } from "./pages/Contact";
import { ResearcherProfile } from "./pages/ResearcherProfile";
import { Dashboard } from "./components/Dashboard";
import { Article, CalendarEvent, Researcher } from "./types";

interface RouteProps {
  researchers: Researcher[];
  articles: Article[];
  events: CalendarEvent[];
  onJoin: (data: Omit<Researcher, "id" | "bio" | "status">) => void;
  // Removed onResearcherClick from props as navigation is internal now
  currentUser: Researcher | null;
  onUpdateUser: (u: Researcher) => void;
  userArticles: Article[];
  onAddArticle: (a: Article) => void;
}

export const routeConfig = [
  {
    path: "/",
    element: (props: RouteProps) => (
      <Home
        researchers={props.researchers}
        articles={props.articles}
        events={props.events}
      />
    ),
  },
  {
    path: "/researchers",
    element: (props: RouteProps) => (
      <ResearcherIndex researchers={props.researchers} />
    ),
  },
  {
    path: "/researchers/:id",
    element: (props: RouteProps) => (
      <ResearcherProfile researchers={props.researchers} />
    ),
  },
  {
    path: "/articles",
    element: (props: RouteProps) => <ArticleList articles={props.articles} />,
  },
  {
    path: "/training",
    element: () => <Training />,
  },
  {
    path: "/events",
    element: (props: RouteProps) => <Events events={props.events} />,
  },
  {
    path: "/contact",
    element: () => <Contact />,
  },
  {
    path: "/join",
    element: (props: RouteProps) => <JoinForm onSubmit={props.onJoin} />,
  },
  {
    path: "/dashboard",
    element: (props: RouteProps) =>
      props.currentUser ? (
        <Dashboard
          currentUser={props.currentUser}
          onUpdateUser={props.onUpdateUser}
          userArticles={props.userArticles}
          onAddArticle={props.onAddArticle}
        />
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              התחברות נדרשת
            </h3>
            <p className="text-slate-500">
              יש להירשם או להתחבר על מנת לצפות באזור האישי.
            </p>
            <Link
              to="/join"
              className="mt-4 inline-block text-teal-600 font-bold hover:underline"
            >
              להרשמה לחץ כאן
            </Link>
          </div>
        </div>
      ),
  },
];
