import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecruitmentItem } from '../hooks/useAppQueries'; // Import the new hook
import { PageLayout } from '../templates/PageLayout'; // Assuming you have a PageLayout component

export const RecruitmentItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recruitmentItem, isLoading, isError, error } = useRecruitmentItem(id || '');

  if (isLoading) {
    return <PageLayout><div className="container mx-auto p-4 text-center">טוען פריט גיוס...</div></PageLayout>;
  }

  if (isError) {
    return <PageLayout><div className="container mx-auto p-4 text-center text-red-500">שגיאה בטעינת פריט הגיוס: {error?.message}</div></PageLayout>;
  }

  if (!recruitmentItem) {
    return <PageLayout><div className="container mx-auto p-4 text-center">פריט גיוס לא נמצא.</div></PageLayout>;
  }

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{recruitmentItem.title}</h1>
        <p className="text-gray-600 mb-4">{recruitmentItem.excerpt}</p>
        <div
          className="prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: recruitmentItem.fullContent }}
        />
      </div>
    </PageLayout>
  );
};
