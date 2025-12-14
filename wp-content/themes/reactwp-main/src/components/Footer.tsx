import React from "react";
import { Researcher, UserStatus } from "../types";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.tsx";

interface FooterProps {
  currentUser: Researcher | null;
  onSimulateApproval?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentUser,
  onSimulateApproval,
}) => {
  const navigate = useNavigate();
  const {
    site: { site_description, site_name },
  } = useApp();
  const handleLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
        <div>
          <h4 className="text-white font-bold text-lg mb-4">{site_name}</h4>
          <p className="text-sm leading-relaxed max-w-xs">{site_description}</p>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-4">קישורים מהירים</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => handleLinkClick("/researchers")}
                className="hover:text-teal-400"
              >
                אינדקס חוקרים
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/training")}
                className="hover:text-teal-400"
              >
                הכשרות
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/articles")}
                className="hover:text-teal-400"
              >
                מאמרים
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-4">הרשמה לניוזלטר</h4>
          <div className="flex gap-2 justify-center md:justify-start">
            <input
              type="email"
              placeholder="הכנס אימייל..."
              className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm text-white w-full max-w-[200px]"
            />
            <button className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
              הרשמה
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs opacity-50 flex justify-between items-center flex-col md:flex-row">
        <p>&copy; 2025 {site_name}.</p>

        {/* Dev Tool Trigger for user flow testing */}
        {currentUser &&
          currentUser.status === UserStatus.PENDING &&
          onSimulateApproval && (
            <button
              onClick={onSimulateApproval}
              className="mt-4 md:mt-0 bg-amber-900/50 text-amber-500 px-3 py-1 rounded border border-amber-800/50 hover:bg-amber-900 transition-colors"
            >
              🛠️ DEV: Simulate Admin Approval (Thaw User)
            </button>
          )}
      </div>
    </footer>
  );
};
