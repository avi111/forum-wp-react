import React, { useState } from "react";
import { InfoPage } from "../components/InfoPage";
import { Mail, MapPin, Loader2, Send } from "lucide-react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import { ContactProps } from "../types.ts";

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactProps>({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      showToast("אנא מלא את כל השדות", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.sendContactMessage(formData);
      showToast("תודה רבה! ההודעה נשלחה בהצלחה");
      setFormData({ fullName: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
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
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="שם מלא"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="אימייל לחזרה"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="תוכן ההודעה"
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
