import React from "react";
import { ContentNotFound } from "../components/ContentNotFound";
import { CTA } from "../components/CTA";
import { useTemplate } from "../hooks/useAppQueries";
import { Loader2 } from "lucide-react";

export const About: React.FC = () => {
  const {
    data: content,
    isLoading,
    isError,
  } = useTemplate("about");

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
    <div className="bg-slate-50 min-h-screen">
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <CTA />
    </div>
  );
};
