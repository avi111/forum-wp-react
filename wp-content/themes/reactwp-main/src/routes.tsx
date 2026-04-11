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
import { ProtectedDashboard } from "./pages/ProtectedDashboard";
import { PageNotFound } from "./pages/PageNotFound";
import { TagPage } from "./pages/TagPage";
import { EventPage } from "./pages/EventPage";
import { NewsPage } from "./pages/NewsPage";
import { Bylaws } from "./pages/Bylaws";
import { StudentsArea } from "./pages/StudentsArea";
import { StudentPaperPage } from "./pages/StudentPaperPage";
import { StudentJobPage } from "./pages/StudentJobPage";
import { ResearchToolsPage } from "./pages/ResearchToolsPage";
import { ResearchQuestionnairePage } from "./pages/ResearchQuestionnairePage";
import { ImagingMethodPage } from "./pages/ImagingMethodPage";
import { RecruitmentItemPage } from "./pages/RecruitmentItemPage";
import { EditorialPage } from "./pages/EditorialPage";
import { ResearchArticlesPage } from "./pages/ResearchArticlesPage"; // Import ResearchArticlesPage

export const routeConfig = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/bylaws",
    element: <Bylaws />,
  },
  {
    path: "/news",
    element: <NewsPage />,
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
    path: "/articles", // General articles list, if still needed
    element: <ArticleList />,
  },
  {
    path: "/research-articles", // New path for research articles
    element: <ResearchArticlesPage />,
  },
  {
    path: "/editorial-articles", // New path for editorial articles
    element: <EditorialPage />,
  },
  {
    path: "/article/:id",
    element: <ArticlePage />,
  },
  {
    path: "/tags/:tag",
    element: <TagPage />,
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
    path: "/events/:id",
    element: <EventPage />,
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
    element: <ProtectedDashboard />,
  },
  {
    path: "/students",
    element: <StudentsArea />,
  },
  {
    path: "/student-papers/:id",
    element: <StudentPaperPage />,
  },
  {
    path: "/student-jobs/:id",
    element: <StudentJobPage />,
  },
  {
    path: "/research-tools",
    element: <ResearchToolsPage />,
  },
  {
    path: "/research-questionnaire/:id",
    element: <ResearchQuestionnairePage />,
  },
  {
    path: "/imaging-method/:id",
    element: <ImagingMethodPage />,
  },
  {
    path: "/recruitment-item/:id",
    element: <RecruitmentItemPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
