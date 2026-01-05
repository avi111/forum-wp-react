import React from "react";
import { LucideIcon } from "lucide-react";

export interface InfoPageProps {
  title: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}

export const InfoPage: React.FC<InfoPageProps> = ({
  title,
  icon: Icon,
  children,
}) => (
  <div className="max-w-4xl mx-auto py-16 px-4">
    <div className="text-center mb-12">
      <div className="inline-flex p-5 bg-indigo-50 rounded-2xl mb-6 shadow-sm transform rotate-3">
        <Icon className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-4xl font-bold text-slate-900">{title}</h2>
    </div>
    <div className="prose prose-lg prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
      {children}
    </div>
  </div>
);
