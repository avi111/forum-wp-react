import React, { useState } from "react";
import { X, Mail } from "lucide-react";
import { useAPI } from "../services/api.ts";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { subscribeToNewsletter } = useAPI();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await subscribeToNewsletter(email);
      if (response.success) {
        setMessage("תודה שנרשמת! אימייל אישור בדרך אליך.");
        setEmail("");
      } else {
        setMessage(response.message || "אירעה שגיאה. נסה שוב.");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setMessage("אירעה שגיאה בתקשורת עם השרת.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up text-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition"
        >
          <X size={20} />
        </button>

        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-teal-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          הרשמה לניוזלטר
        </h2>
        <p className="text-slate-500 mb-6">
          הצטרפו וקבלו עדכונים על מחקרים, אירועים והתפתחויות בתחום.
        </p>

        {!message ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="הכנס אימייל..."
              required
              className="bg-slate-100 border-slate-200 border rounded-lg px-4 py-3 text-sm text-slate-900 w-full focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors disabled:bg-slate-400"
            >
              {isLoading ? "שולח..." : "הרשמה"}
            </button>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
