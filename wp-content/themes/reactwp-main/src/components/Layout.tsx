import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { NewsTicker } from "./NewsTicker";
import { NAV_ITEMS } from "../mockData";
import { NewsItem, Researcher } from "../types";

interface LayoutProps {
  currentUser: Researcher | null;
  setCurrentUser: (user: Researcher | null) => void;
  newsItems: NewsItem[];
  onSimulateApproval: () => void;
}

export function Layout({
  currentUser,
  setCurrentUser,
  newsItems,
  onSimulateApproval,
}: LayoutProps) {
  const navigate = useNavigate();

  const onLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-slate-50 font-sans flex flex-col text-slate-900"
      dir="rtl"
    >
      <NewsTicker news={newsItems} />
      <Navbar
        isLoggedIn={!!currentUser}
        onLogout={onLogout}
        navItems={NAV_ITEMS}
        currentUser={currentUser}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer
        currentUser={currentUser}
        onSimulateApproval={onSimulateApproval}
      />
    </div>
  );
}
