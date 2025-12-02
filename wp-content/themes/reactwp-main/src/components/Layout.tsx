
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { NewsTicker } from "./NewsTicker";
import { NAV_ITEMS } from "../mockData";
import { useApp } from "../context/AppContext";

export function Layout() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, newsItems, simulateAdminApproval } = useApp();

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
        onSimulateApproval={simulateAdminApproval}
      />
    </div>
  );
}
