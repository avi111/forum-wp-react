import React from 'react';
import { useParams } from 'react-router-dom';
import { useImagingMethod } from '../hooks/useAppQueries'; // Import the new hook

export const ImagingMethodPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: imagingMethod, isLoading, isError, error } = useImagingMethod(id || '');

  if (isLoading) {
    return (
      <div className="page-layout">
        <main>
          <div className="container mx-auto p-4 text-center">טוען שיטת דימות...</div>
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
          <div className="container mx-auto p-4 text-center">שיטת דימות לא נמצאה.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{imagingMethod.title}</h1>
          {imagingMethod.imageUrl && (
            <img src={imagingMethod.imageUrl} alt={imagingMethod.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          )}
          <p className="text-gray-600 mb-4">{imagingMethod.excerpt}</p>
          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: imagingMethod.fullContent }}
          />
        </div>
      </main>
    </div>
  );
};
