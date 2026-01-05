import React from "react";
import { Researcher, UserStatus } from "../types";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.tsx";

export interface FooterProps {
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
    openNewsletterModal,
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
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white text-center">
            <p className="font-bold text-sm mb-2">רוצה להישאר מעודכן?</p>
            <button
              onClick={openNewsletterModal}
              className="bg-white/20 hover:bg-white/30 w-full py-1.5 rounded-lg text-xs font-bold transition-colors"
            >
              הרשמה לניוזלטר
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
