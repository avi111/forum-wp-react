import React from "react";
import { CheckCircle, X, XCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";

export const Toast = () => {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${
          toast.type === "success"
            ? "bg-white border-teal-100"
            : "bg-white border-red-100"
        }`}
      >
        {toast.type === "success" ? (
          <div className="bg-teal-100 p-2 rounded-full text-teal-600">
            <CheckCircle size={20} />
          </div>
        ) : (
          <div className="bg-red-100 p-2 rounded-full text-red-600">
            <XCircle size={20} />
          </div>
        )}
        <div>
          <h4
            className={`font-bold ${toast.type === "success" ? "text-teal-900" : "text-red-900"}`}
          >
            {toast.message}
          </h4>
        </div>
        <button
          onClick={hideToast}
          className="mr-4 text-slate-400 hover:text-slate-600"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
