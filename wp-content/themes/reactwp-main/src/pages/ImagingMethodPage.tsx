import React from "react";
import { Link, useParams } from "react-router-dom"; // Import Link
import { useImagingMethod } from "../hooks/useAppQueries"; // Import the new hook
import { decodeHtml } from "../utils/decodeHtml";

export const ImagingMethodPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: imagingMethod,
    isLoading,
    isError,
    error,
  } = useImagingMethod(id || "");

  if (isLoading) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center">
            טוען שיטת דימות...
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
            שגיאה בטעינת שיטת הדימות: {error?.message}
          </div>
        </main>
      </div>
    );
  }

  if (!imagingMethod) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center">
            שיטת דימות לא נמצאה.
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
            <h1 className="text-3xl font-bold">
              {decodeHtml(imagingMethod.title)}
            </h1>
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
          {imagingMethod.imageUrl && (
            <img
              src={imagingMethod.imageUrl}
              alt={decodeHtml(imagingMethod.title)}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <p
            className="text-gray-600 mb-4"
            dangerouslySetInnerHTML={{ __html: imagingMethod.excerpt }}
          />
          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: imagingMethod.fullContent }}
          />
        </div>
      </main>
    </div>
  );
};
