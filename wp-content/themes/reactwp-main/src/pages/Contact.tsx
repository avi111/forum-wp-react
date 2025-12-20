import React, { useState } from "react";
import { InfoPage } from "../components/InfoPage";
import { Mail, MapPin, Loader2, Send } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const { sendContactForm7 } = useApp();
  const FORM_ID = 48; // The ID of your Contact Form 7

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    "your-name": "",
    "your-email": "",
    "your-message": "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData["your-name"] || !formData["your-email"]) {
      showToast("אנא מלא את שדות החובה", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await sendContactForm7(FORM_ID, formData);

      if (response.status === "mail_sent") {
        showToast(response.message);
        setFormData({ "your-name": "", "your-email": "", "your-message": "" });
      } else {
        showToast(response.message || "אירעה שגיאה", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("אירעה שגיאה בשליחת ההודעה", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <InfoPage title="צור קשר" icon={Mail}>
      <div className="grid md:grid-cols-2 gap-12 not-prose">
        <div className="space-y-6">
          <p className="text-lg text-slate-600">
            אנחנו כאן לכל שאלה, הצעה או רעיון לשיתוף פעולה.
            <br />
            מלאו את הטופס ונחזור אליכם בהקדם האפשרי.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-slate-700">
              <Mail className="w-5 h-5 ml-3 text-teal-500" />
              <span>contact@iprf.org.il</span>
            </div>
            <div className="flex items-center text-slate-700">
              <MapPin className="w-5 h-5 ml-3 text-teal-500" />
              <span>רחוב המדע 10, פארק המדע רחובות</span>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative"
        >
          <input
            type="text"
            name="your-name"
            value={formData["your-name"]}
            onChange={handleChange}
            placeholder="שם מלא"
            required
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <input
            type="email"
            name="your-email"
            value={formData["your-email"]}
            onChange={handleChange}
            placeholder="אימייל לחזרה"
            required
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <textarea
            name="your-message"
            value={formData["your-message"]}
            onChange={handleChange}
            placeholder="תוכן ההודעה (אופציונאלי)"
            rows={4}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          ></textarea>
          <button
            disabled={isSubmitting}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                שולח...
              </>
            ) : (
              <>
                שליחת הודעה
                <Send className="w-4 h-4 mr-2" />
              </>
            )}
          </button>
        </form>
      </div>
    </InfoPage>
  );
};
