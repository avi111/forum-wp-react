import React from "react";
import { useParams } from "react-router-dom";
import { useQuestionnaire } from "../hooks/useAppQueries"; // Import the new hook

export const ResearchQuestionnairePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: questionnaire,
    isLoading,
    isError,
    error,
  } = useQuestionnaire(id || "");

  if (isLoading) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center">טוען שאלון...</div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center text-red-500">
            שגיאה בטעינת השאלון: {error?.message}
          </div>
        </main>
      </div>
    );
  }

  if (!questionnaire) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center">שאלון לא נמצא.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{questionnaire.title}</h1>
          <p className="text-gray-600 mb-4">{questionnaire.excerpt}</p>
          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: questionnaire.content }}
          />
        </div>
      </main>
    </div>
  );
};
