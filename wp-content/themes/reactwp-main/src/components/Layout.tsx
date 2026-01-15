import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { NewsTicker } from "./NewsTicker";
import { NAV_ITEMS } from "../mockData";
import { useApp } from "../context/AppContext";

export function Layout() {
  const {
    currentUser,
    setCurrentUser,
    newsItems,
    getNewsFromServer,
    simulateAdminApproval,
    site,
    isModalOpen,
  } = useApp();

  const { pathname } = useLocation();

  // Fetch news when the layout mounts
  useEffect(() => {
    if (newsItems.length === 0) {
      getNewsFromServer();
    }
  }, [getNewsFromServer, newsItems.length]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onLogout = () => {
    // Clear the user from React's state
    setCurrentUser(null);
    // Redirect to the WordPress logout URL
    window.location.href = `${site.home_url}/wp-login.php?action=logout`;
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
      <main
        inert={!!isModalOpen}
        className={`flex-grow ${isModalOpen ? "pointer-events-none" : ""}`}
      >
        <Outlet />
      </main>
      <Footer
        currentUser={currentUser}
        onSimulateApproval={simulateAdminApproval}
      />
    </div>
  );
}
