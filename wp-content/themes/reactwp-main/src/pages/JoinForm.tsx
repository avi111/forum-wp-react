import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Check, Eye, EyeOff, FileText, Upload, Users, X } from "lucide-react";
import { Researcher } from "../types";
import {
  INSTITUTIONS,
  MAIN_SPECIALIZATIONS,
  SUB_SPECIALIZATIONS,
} from "../consts";

import { useNavigate } from "react-router-dom";
import { OnJoin } from "../routes";

interface JoinFormProps {
  onSubmit: OnJoin;
}

export const JoinForm: FC<JoinFormProps> = ({ onSubmit }) => {
  const [showBylaws, setShowBylaws] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    idNumber: "",
    gender: "",
    phone: "",
    title: "",
    institution: "",
    institutionOther: "",
    faculty: "",
    mainSpecialization: "",
    mainSpecializationOther: "",
    subSpecializations: [] as string[],
    subSpecializationOther: "",
    studentYear: "",
    agreedToBylaws: false,
    newsletter: false,
    verificationDoc: null as File | null,
    intentLetter: null as File | null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleMultiSelectChange = (value: string) => {
    setFormData((prev) => {
      const current = prev.subSpecializations;
      if (current.includes(value)) {
        return {
          ...prev,
          subSpecializations: current.filter((item) => item !== value),
        };
      } else {
        return { ...prev, subSpecializations: [...current, value] };
      }
    });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [fieldName]: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }
    if (!formData.agreedToBylaws) {
      alert("יש לאשר את תקנון האגודה");
      return;
    }

    // Normalize data (handle 'Other' fields)
    const finalInstitution =
      formData.institution === "other"
        ? formData.institutionOther
        : formData.institution;
    const finalSpec =
      formData.mainSpecialization === "other"
        ? formData.mainSpecializationOther
        : formData.mainSpecialization;

    const submissionData: Omit<Researcher, "id" | "bio" | "status"> = {
      ...formData,
      institution: finalInstitution,
      specialization: finalSpec,
    };

    onSubmit(submissionData, () => navigate("/dashboard"));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-heebo">
              בקשת הצטרפות לחברות
            </h2>
            <p className="text-teal-200 mt-2 text-lg">
              הפורום הישראלי למחקר פסיכדלי
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
          {/* Section 1: User Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h3 className="text-xl font-bold text-slate-800">פרטי חשבון</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  שם משתמש
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  כתובת דוא&#34;ל (*)
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  סיסמה (*)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="input-field pr-10"
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  אישור סיסמה (*)
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Personal Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h3 className="text-xl font-bold text-slate-800">פרטים אישיים</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  שם פרטי (*)
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  שם משפחה (*)
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  מספר תעודת זהות (*)
                </label>
                <input
                  type="text"
                  name="idNumber"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  מספר טלפון נייד (*)
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  מין
                </label>
                <select
                  name="gender"
                  className="input-field"
                  onChange={handleInputChange}
                >
                  <option value="">בחר...</option>
                  <option value="male">זכר</option>
                  <option value="female">נקבה</option>
                  <option value="other">אחר</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  תואר (*)
                </label>
                <select
                  name="title"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                >
                  <option value="">בחר...</option>
                  <option value="prof">פרופ&#39;</option>
                  <option value="md">דפרופ&#34;ר לרפואה (MD)</option>
                  <option value="phd">PhD מחקרי</option>
                  <option value="mr">מר</option>
                  <option value="ms">גב&#39;</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Academic Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                פרטים אקדמיים ומקצועיים
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  מוסד אקדמי / מכון מחקר (*)
                </label>
                <select
                  name="institution"
                  required
                  className="input-field mb-2"
                  onChange={handleInputChange}
                >
                  <option value="">בחר מוסד...</option>
                  {INSTITUTIONS.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))}
                  <option value="other">אחר</option>
                </select>
                {formData.institution === "other" && (
                  <input
                    type="text"
                    name="institutionOther"
                    placeholder="נא פרט שם מוסד..."
                    className="input-field bg-slate-50"
                    onChange={handleInputChange}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  פקולטה / חוג (*)
                </label>
                <input
                  type="text"
                  name="faculty"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  תחום התמחות עיקרי
                </label>
                <select
                  name="mainSpecialization"
                  className="input-field mb-2"
                  onChange={handleInputChange}
                >
                  <option value="">בחר תחום...</option>
                  {MAIN_SPECIALIZATIONS.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                  <option value="other">אחר</option>
                </select>
                {formData.mainSpecialization === "other" && (
                  <input
                    type="text"
                    name="mainSpecializationOther"
                    placeholder="נא פרט..."
                    className="input-field bg-slate-50"
                    onChange={handleInputChange}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  תת-התמחות (ניתן לבחור מספר אפשרויות)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {SUB_SPECIALIZATIONS.map((sub) => (
                    <label
                      key={sub}
                      className="flex items-start space-x-3 space-x-reverse cursor-pointer p-2 hover:bg-white rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-teal-600 rounded focus:ring-teal-500 border-gray-300"
                        checked={formData.subSpecializations.includes(sub)}
                        onChange={() => handleMultiSelectChange(sub)}
                      />
                      <span className="text-sm text-slate-700">{sub}</span>
                    </label>
                  ))}
                  <div className="md:col-span-2 mt-2 pt-2 border-t border-slate-200">
                    <label className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-sm font-bold text-slate-700 ml-2">
                        אחר:
                      </span>
                      <input
                        type="text"
                        name="subSpecializationOther"
                        className="input-field text-sm py-1"
                        placeholder="פרט תחום נוסף..."
                        onChange={(e) => {
                          // Logic handling for 'other' in multi-select is complex, keeping simple text state for now
                          // Ideally this would add to the array on blur
                          handleInputChange(e);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  שנת לימודים (אם סטודנט)
                </label>
                <select
                  name="studentYear"
                  className="input-field w-full md:w-1/3"
                  onChange={handleInputChange}
                >
                  <option value="">לא רלוונטי</option>
                  <option value="1">שנה א&#34;</option>
                  <option value="2">שנה ב&#34;</option>
                  <option value="3">שנה ג&#34;</option>
                  <option value="advanced">תארים מתקדמים</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 4: Documents */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                מסמכים נדרשים
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-700 mb-1">
                  מסמך אימות זהות/אקדמי (*)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  תעודת סטודנט / סגל / אישור מוסד
                </p>
                <label className="cursor-pointer bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm inline-flex items-center">
                  <Upload className="w-4 h-4 ml-2" />
                  בחר קובץ
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "verificationDoc")}
                  />
                </label>
                {formData.verificationDoc && (
                  <div className="mt-2 text-sm text-teal-600 flex items-center justify-center">
                    <Check className="w-4 h-4 ml-1" />{" "}
                    {formData.verificationDoc.name}
                  </div>
                )}
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-700 mb-1">
                  מכתב הצטרפות / הצהרת כוונות (*)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  קובץ PDF או Word קצר
                </p>
                <label className="cursor-pointer bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm inline-flex items-center">
                  <Upload className="w-4 h-4 ml-2" />
                  בחר קובץ
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "intentLetter")}
                  />
                </label>
                {formData.intentLetter && (
                  <div className="mt-2 text-sm text-teal-600 flex items-center justify-center">
                    <Check className="w-4 h-4 ml-1" />{" "}
                    {formData.intentLetter.name}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 5: Agreements */}
          <section className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="agreedToBylaws"
                  checked={formData.agreedToBylaws}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                />
                <span className="mr-3 text-sm text-slate-700">
                  אני מאשר/ת את
                  <button
                    type="button"
                    onClick={() => setShowBylaws(true)}
                    className="text-indigo-600 font-bold underline mx-1 hover:text-indigo-800"
                  >
                    תקנון האגודה
                  </button>
                  ומסכים/ה לכל תנאיו (*)
                </span>
              </label>

              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 text-teal-600 rounded focus:ring-teal-500 border-gray-300"
                />
                <span className="mr-3 text-sm text-slate-700">
                  אני מסכים/ה לקבלת דיוור, עדכונים והזמנות לאירועים במייל (ניתן
                  להסרה בכל עת)
                </span>
              </label>
            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all transform hover:-translate-y-0.5"
            >
              שליחת בקשת הצטרפות
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              לחיצה על שליחה מהווה הסכמה לתנאי השימוש ומדיניות הפרטיות של האתר.
            </p>
          </div>
        </form>
      </div>

      {/* Styles for cleaner JSX */}
      <style>{`
          .input-field {
              width: 100%;
              padding: 0.75rem 1rem;
              border: 1px solid #e2e8f0;
              border-radius: 0.5rem;
              outline: none;
              transition: all 0.2s;
          }
          .input-field:focus {
              border-color: #6366f1;
              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }
      `}</style>

      {/* Bylaws Modal */}
      {showBylaws && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-slide-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-900">
                תקנון האגודה והפורום
              </h3>
              <button
                onClick={() => setShowBylaws(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto leading-relaxed text-slate-600 space-y-4">
              <div className="flex gap-4">
                <span className="font-bold text-indigo-600">1.</span>
                <p>
                  <strong className="text-slate-900">סודיות ואתיקה:</strong> כל
                  המידע המשותף בפורום זה נועד לדיון אקדמי/מחקרי בלבד. חל איסור
                  מוחלט על הפצה או שימוש במידע רגיש מחוץ למסגרת הפורום ללא אישור
                  מפורש מראש.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-indigo-600">2.</span>
                <p>
                  <strong className="text-slate-900">אימות זהות:</strong> חברות
                  בפורום מותנית באימות רקע אקדמי/מקצועי בלבד. צוות הניהול שומר
                  לעצמו את הזכות לסרב או לבטל חברות של משתמשים שאינם עומדים
                  בקריטריונים אלו.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-indigo-600">3.</span>
                <p>
                  <strong className="text-slate-900">שימוש הוגן:</strong> אין
                  לפרסם תוכן המפר זכויות יוצרים או קניין רוחני.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-indigo-600">4.</span>
                <p>
                  <strong className="text-slate-900">אכיפה:</strong> חברים שיפרו
                  את התקנון עלולים להיחסם מהפורום באופן מיידי וללא אזהרה מוקדמת.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
              <button
                onClick={() => {
                  setFormData((prev) => ({ ...prev, agreedToBylaws: true }));
                  setShowBylaws(false);
                }}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
              >
                קראתי ואני מאשר/ת
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
