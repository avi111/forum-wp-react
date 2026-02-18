import React from "react";
import { InfoPage } from "../components/InfoPage";
import { Scale } from "lucide-react";
import { useTemplate } from "../hooks/useAppQueries";

export const Bylaws: React.FC = () => {
  const { data: templateContent, isLoading } = useTemplate("bylaws-modal");

  return (
    <InfoPage title="תקנון הפורום" icon={Scale}>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: templateContent || "" }}
        />
      )}
    </InfoPage>
  );
};
