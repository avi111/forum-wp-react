import React from 'react';
import { useParams } from 'react-router-dom';
import { useImagingMethod } from '../hooks/useAppQueries'; // Import the new hook
import { PageLayout } from '../templates/PageLayout'; // Assuming you have a PageLayout component

export const ImagingMethodPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: imagingMethod, isLoading, isError, error } = useImagingMethod(id || '');

  if (isLoading) {
    return <PageLayout><div className="container mx-auto p-4 text-center">טוען שיטת דימות...</div></PageLayout>;
  }

  if (isError) {
    return <PageLayout><div className="container mx-auto p-4 text-center text-red-500">שגיאה בטעינת שיטת הדימות: {error?.message}</div></PageLayout>;
  }

  if (!imagingMethod) {
    return <PageLayout><div className="container mx-auto p-4 text-center">שיטת דימות לא נמצאה.</div></PageLayout>;
  }

  return (
    <PageLayout>
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
    </PageLayout>
  );
};
