import React from 'react';
import { useParams } from 'react-router-dom';

export const RecruitmentItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Recruitment Item Page</h1>
      <p>Displaying recruitment item with ID: {id}</p>
      {/* Add your content for the Recruitment Item page here */}
    </div>
  );
};
