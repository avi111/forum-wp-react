import { FC, useEffect, useState } from "react";
import { Loader2, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { t } from "../services/stringService";
import { useTemplate } from "../hooks/useAppQueries";
import { ContentNotFound } from "../components/ContentNotFound";

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
  const { currentUser } = useApp();
  const [showBylaws, setShowBylaws] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  const { data: content, isLoading, isError } = useTemplate("join");

  if (currentUser) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
      </div>
    );
  }

  if (isError || !content) {
    return <ContentNotFound />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
      <section className="flex flex-col items-center">
        <div className="p-8 text-center relative overflow-hidden w-full">
          <div className="inline-flex p-5 bg-indigo-50 rounded-2xl mb-6 shadow-sm transform rotate-3">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold font-heebo">
            {t("joinform_title")}
          </h2>
          <p className="mt-2 text-lg">{t("joinform_subtitle")}</p>
        </div>
        <div className="bg-slate-50 min-h-screen w-full">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        {showBylaws && (
          <BylawsModal
            onClose={() => setShowBylaws(false)}
            onConfirm={() => {
              setShowBylaws(false);
            }}
          />
        )}
      </section>
    </div>
  );
};
