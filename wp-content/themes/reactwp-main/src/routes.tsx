
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
import { About } from "./pages/About";
import { ResearcherProfile } from "./pages/ResearcherProfile";
import { Dashboard } from "./components/Dashboard";
import { useApp } from "./context/AppContext";

function DashboardWrapper() {
  const { currentUser } = useApp();
  
  if (currentUser) {
    return <Dashboard />;
  }

  return (
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
  );
}

export const routeConfig = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/researchers",
    element: <ResearcherIndex />,
  },
  {
    path: "/researchers/:id",
    element: <ResearcherProfile />,
  },
  {
    path: "/articles",
    element: <ArticleList />,
  },
  {
    path: "/article/:id",
    element: <ArticlePage />,
  },
  {
    path: "/training",
    element: <Training />,
  },
  {
    path: "/training/:id",
    element: <TrainingPage />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/past",
    element: <PastEvents />,
  },
  {
    path: "/meetings",
    element: <Meetings />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/join",
    element: <JoinForm />,
  },
  {
    path: "/dashboard",
    element: <DashboardWrapper />,
  },
];
