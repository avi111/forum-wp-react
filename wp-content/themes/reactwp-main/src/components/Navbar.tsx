import React, { useState } from "react";
import { NavItem, PageView, Researcher } from "../types";
import { Brain, LogOut, Menu, UserCircle, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  navItems: NavItem[];
  currentUser?: Researcher | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  onLogout,
  navItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { site } = useApp(); // Get site info from context

  const getPath = (view: PageView) => {
    switch (view) {
      case PageView.HOME:
        return "/";
      case PageView.RESEARCHERS:
        return "/researchers";
      case PageView.ARTICLES:
        return "/articles";
      case PageView.TRAINING:
        return "/training";
      case PageView.EVENTS:
        return "/events";
      case PageView.CONTACT:
        return "/contact";
      case PageView.JOIN:
        return "/join";
      case PageView.DASHBOARD:
        return site.site_url + "/wp-admin/";
      case PageView.MEETINGS:
        return "/meetings";
      case PageView.LOGIN:
        return "/login";
      default:
        return "/";
    }
  };

  const handleNavClick = (view: PageView) => {
    window.location.href = getPath(view);
    setIsOpen(false);
  };

  const isActive = (view: PageView) => {
    const path = getPath(view);
    if (path === "/") return location.pathname === "/";
    // For external links, don't show as active
    if (path.startsWith("http")) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick(PageView.HOME)}
          >
            <div className="relative">
              <Brain className="h-10 w-10 text-teal-400 ml-3 transition-transform group-hover:scale-110" />
              <div className="absolute -inset-1 bg-teal-500 blur opacity-20 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wide font-heebo leading-none">
                הפורום הישראלי
              </span>
              <span className="text-sm text-teal-400 font-light tracking-wider">
                למחקר פסיכדלי
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-1 space-x-reverse">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.view)
                      ? "bg-slate-800 text-teal-400 shadow-inner"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-3 space-x-reverse">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick(PageView.DASHBOARD)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(PageView.DASHBOARD)
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-900/50"
                      : "bg-slate-800 text-teal-400 hover:bg-slate-700"
                  }`}
                >
                  <UserCircle className="w-4 h-4 ml-2" />
                  אזור אישי
                </button>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-400 p-2 rounded-full hover:bg-slate-800 transition-colors"
                  title="התנתק"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavClick(PageView.JOIN)}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-teal-900/50 transition-all hover:scale-105 transform"
              >
                הצטרפות לחוקרים
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`block px-3 py-3 rounded-md text-base font-medium w-full text-right ${
                  isActive(item.view)
                    ? "bg-slate-900 text-teal-400"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-700 mt-4 pt-4">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => handleNavClick(PageView.DASHBOARD)}
                    className="flex items-center w-full text-right px-3 py-3 text-teal-400 font-medium hover:bg-slate-700 rounded-md"
                  >
                    <UserCircle className="ml-2 w-5 h-5" />
                    אזור אישי
                  </button>
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full text-right px-3 py-3 text-red-400 font-medium hover:bg-slate-700 rounded-md"
                  >
                    <LogOut className="ml-2 w-5 h-5" />
                    התנתק
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavClick(PageView.JOIN)}
                  className="w-full text-center bg-teal-600 text-white px-3 py-3 rounded-md text-base font-bold shadow-lg"
                >
                  הצטרפות לחוקרים
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
