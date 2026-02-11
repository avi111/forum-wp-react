import { InfoPage } from "../components/InfoPage";
import { Loader2, Mail } from "lucide-react";
import { useTemplate } from "../hooks/useAppQueries.ts";
import { ContentNotFound } from "../components/ContentNotFound.tsx";
import React from "react";

export const Contact: React.FC = () => {
  const { data: content, isLoading, isError } = useTemplate("contact");

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
    <InfoPage title="צור קשר" icon={Mail}>
      <div className="bg-slate-50 min-h-screen w-full">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </InfoPage>
  );
};
