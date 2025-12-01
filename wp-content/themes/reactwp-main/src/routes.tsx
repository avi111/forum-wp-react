import { Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { ResearcherIndex } from "./pages/ResearcherIndex";
import { ArticleList } from "./pages/ArticleList";
import { ArticlePage } from "./pages/ArticlePage";
import { JoinForm } from "./pages/JoinForm";
import { Training } from "./pages/Training";
import { TrainingPage } from "./pages/TrainingPage";
import { Events } from "./pages/Events";
import { Meetings } from "./pages/Meetings";
import { PastEvents } from "./pages/PastEvents";
import { Contact } from "./pages/Contact";
import { ResearcherProfile } from "./pages/ResearcherProfile";
import { Dashboard } from "./components/Dashboard";
import {
  Article,
  CalendarEvent,
  Meeting,
  Researcher,
  Training as TrainingType,
} from "./types";

export type OnJoin = (
  data: Omit<Researcher, "id" | "bio" | "status">,
  callback: () => void,
) => void;

interface RouteProps {
  researchers: Researcher[];
  articles: Article[];
  events: CalendarEvent[];
  meetings: Meeting[];
  trainings: TrainingType[];
  onJoin: OnJoin;
  currentUser: Researcher | null;
  onUpdateUser: (u: Researcher) => void;
  userArticles: Article[];
  onAddArticle: (a: Article) => void;
}

export const routeConfig = [
  {
    path: "/",
    index: true,
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
      <ResearcherProfile
        researchers={props.researchers}
        articles={props.articles}
      />
    ),
  },
  {
    path: "/articles",
    element: (props: RouteProps) => <ArticleList articles={props.articles} />,
  },
  {
    path: "/article/:id",
    element: (props: RouteProps) => <ArticlePage articles={props.articles} />,
  },
  {
    path: "/training",
    element: (props: RouteProps) => <Training trainings={props.trainings} />,
  },
  {
    path: "/training/:id",
    element: (props: RouteProps) => (
      <TrainingPage trainings={props.trainings} />
    ),
  },
  {
    path: "/events",
    element: () => <Events />,
  },
  {
    path: "/events/past",
    element: () => <PastEvents />,
  },
  {
    path: "/meetings",
    element: (props: RouteProps) => <Meetings meetings={props.meetings} />,
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
