import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Check, Eye, EyeOff, FileText, Upload, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import { t } from "../services/stringService";
import { useTemplate } from "../hooks/useAppQueries";
import { ContentNotFound } from "../components/ContentNotFound";
import { Captcha } from "../components/Captcha";

const BylawsModal: FC<{
  onClose: () => void;
  onConfirm: () => void;
}> = ({ onClose, onConfirm }) => {
  const { data: content, isLoading } = useTemplate("bylaws-modal");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-slide-up">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <h3 className="text-xl font-bold text-slate-900">
            {t("bylawsmodal_title")}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto leading-relaxed text-slate-600">
          {isLoading && <p>טוען תקנון...</p>}
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            !isLoading && <ContentNotFound />
          )}
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            {t("bylawsmodal_confirm_button")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const JoinForm: FC = () => {
  const { onJoin, settings, currentUser } = useApp();
  const { showToast } = useToast();
  const [showBylaws, setShowBylaws] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState("");
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

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

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
      showToast(t("joinform_passwords_not_match"));
      return;
    }
    if (!formData.agreedToBylaws) {
      showToast(t("joinform_bylaws_not_agreed"));
      return;
    }
    if (!captchaToken) {
      showToast("אנא אמת שאינך רובוט");
      return;
    }

    const finalInstitution =
      formData.institution === "other"
        ? formData.institutionOther
        : formData.institution;
    const finalSpec =
      formData.mainSpecialization === "other"
        ? formData.mainSpecializationOther
        : formData.mainSpecialization;

    const submissionData = {
      ...formData,
      institution: finalInstitution,
      specialization: finalSpec,
      "g-recaptcha-response": captchaToken,
    };

    onJoin(submissionData, () => {
      showToast(t("joinform_request_successful"));
      navigate("/dashboard");
    });
  };

  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-heebo">
              {t("joinform_title")}
            </h2>
            <p className="text-teal-200 mt-2 text-lg">
              {t("joinform_subtitle")}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                {t("joinform_section1_title")}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("joinform_username_label")}
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
                  {t("joinform_email_label")}
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
                  {t("joinform_password_label")}
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
                  {t("joinform_confirm_password_label")}
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

          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                {t("joinform_section2_title")}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("joinform_firstname_label")}
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
                  {t("joinform_lastname_label")}
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
                  {t("joinform_idnumber_label")}
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
                  {t("joinform_phone_label")}
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
                  {t("joinform_gender_label")}
                </label>
                <select
                  name="gender"
                  className="input-field"
                  onChange={handleInputChange}
                >
                  <option value="">
                    {t("joinform_gender_select_placeholder")}
                  </option>
                  {(settings.genders || []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("joinform_title_label")}
                </label>
                <select
                  name="title"
                  required
                  className="input-field"
                  onChange={handleInputChange}
                >
                  <option value="">
                    {t("joinform_title_select_placeholder")}
                  </option>
                  {(settings.titles || []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                {t("joinform_section3_title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("joinform_institution_label")}
                </label>
                <select
                  name="institution"
                  required
                  className="input-field mb-2"
                  onChange={handleInputChange}
                >
                  <option value="">
                    {t("joinform_institution_select_placeholder")}
                  </option>
                  {(settings.institutions || []).map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))}
                  <option value="other">
                    {t("joinform_institution_other")}
                  </option>
                </select>
                {formData.institution === "other" && (
                  <input
                    type="text"
                    name="institutionOther"
                    placeholder={t("joinform_institution_other_placeholder")}
                    className="input-field bg-slate-50"
                    onChange={handleInputChange}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("joinform_faculty_label")}
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
                  {t("joinform_main_specialization_label")}
                </label>
                <select
                  name="mainSpecialization"
                  className="input-field mb-2"
                  onChange={handleInputChange}
                >
                  <option value="">
                    {t("joinform_main_specialization_select_placeholder")}
                  </option>
                  {(settings.mainSpecializations || []).map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                  <option value="other">
                    {t("joinform_main_specialization_other")}
                  </option>
                </select>
                {formData.mainSpecialization === "other" && (
                  <input
                    type="text"
                    name="mainSpecializationOther"
                    placeholder={t(
                      "joinform_main_specialization_other_placeholder",
                    )}
                    className="input-field bg-slate-50"
                    onChange={handleInputChange}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  {t("joinform_sub_specialization_label")}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {(settings.subSpecializations || []).map((sub) => (
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
                        {t("joinform_sub_specialization_other_label")}
                      </span>
                      <input
                        type="text"
                        name="subSpecializationOther"
                        className="input-field text-sm py-1"
                        placeholder={t(
                          "joinform_sub_specialization_other_placeholder",
                        )}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("joinform_student_year_label")}
                </label>
                <select
                  name="studentYear"
                  className="input-field w-full md:w-1/3"
                  onChange={handleInputChange}
                >
                  <option value="">
                    {t("joinform_student_year_select_placeholder")}
                  </option>
                  {(settings.studentYears || []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                {t("joinform_section4_title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-700 mb-1">
                  {t("joinform_verification_doc_title")}
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  {t("joinform_verification_doc_subtitle")}
                </p>
                <label className="cursor-pointer bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm inline-flex items-center">
                  <Upload className="w-4 h-4 ml-2" />
                  {t("joinform_select_file")}
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
                  {t("joinform_intent_letter_title")}
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  {t("joinform_intent_letter_subtitle")}
                </p>
                <label className="cursor-pointer bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm inline-flex items-center">
                  <Upload className="w-4 h-4 ml-2" />
                  {t("joinform_select_file")}
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
                  {t("joinform_agreed_to_bylaws_prefix")}
                  <button
                    type="button"
                    onClick={() => setShowBylaws(true)}
                    className="text-indigo-600 font-bold underline mx-1 hover:text-indigo-800"
                  >
                    {t("joinform_bylaws_link")}
                  </button>
                  {t("joinform_agreed_to_bylaws_suffix")}
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
                  {t("joinform_newsletter_agreement")}
                </span>
              </label>
            </div>
          </section>

          <Captcha onVerify={setCaptchaToken} />

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all transform hover:-translate-y-0.5"
            >
              {t("joinform_submit_button")}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              {t("joinform_submit_notice")}
            </p>
          </div>
        </form>
      </div>

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

      {showBylaws && (
        <BylawsModal
          onClose={() => setShowBylaws(false)}
          onConfirm={() => {
            setFormData((prev) => ({ ...prev, agreedToBylaws: true }));
            setShowBylaws(false);
          }}
        />
      )}
    </div>
  );
};
