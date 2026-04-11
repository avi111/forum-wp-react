import React from "react";
import { Link, useParams } from "react-router-dom"; // Import Link
import { useRecruitmentItem } from "../hooks/useAppQueries"; // Import the new hook

export const RecruitmentItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: recruitmentItem,
    isLoading,
    isError,
    error,
  } = useRecruitmentItem(id || "");

  if (isLoading) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center">
            טוען פריט גיוס...
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center text-red-500">
            שגיאה בטעינת פריט הגיוס: {error?.message}
          </div>
        </main>
      </div>
    );
  }

  if (!recruitmentItem) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center">
            פריט גיוס לא נמצא.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <main>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{recruitmentItem.title}</h1>
            <Link
              to="/research-tools"
              className="text-indigo-600 hover:underline flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              חזרה לכלי מחקר
            </Link>
          </div>
          <p className="text-gray-600 mb-4">{recruitmentItem.excerpt}</p>
          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: recruitmentItem.fullContent }}
          />
        </div>
      </main>
    </div>
  );
};
