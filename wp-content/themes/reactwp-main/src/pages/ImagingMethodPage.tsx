import React from 'react';
import { useParams } from 'react-router-dom';

export const ImagingMethodPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Imaging Method Page</h1>
      <p>Displaying imaging method with ID: {id}</p>
      {/* Add your content for the Imaging Method page here */}
    </div>
  );
};
