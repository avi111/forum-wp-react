import React from "react";
import { ContentNotFound } from "./ContentNotFound";
import { useTemplate } from "../hooks/useAppQueries";

export const HomeFeatures: React.FC = () => {
  const {
    data: content,
    isLoading,
    isError,
  } = useTemplate("home-features");

  if (isLoading) {
    // Render a placeholder or nothing while loading to prevent layout shift
    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* You can add a spinner or skeleton loader here */}
        </div>
      </div>
    );
  }

  if (isError || !content) {
    return <ContentNotFound />;
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};