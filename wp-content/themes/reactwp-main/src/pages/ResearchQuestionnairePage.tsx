import React from 'react';
import { useParams } from 'react-router-dom';

export const ResearchQuestionnairePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Research Questionnaire Page</h1>
      <p>Displaying questionnaire with ID: {id}</p>
      {/* Add your content for the Research Questionnaire page here */}
    </div>
  );
};
