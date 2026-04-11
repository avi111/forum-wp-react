import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="page-layout">
      {/* You can add common layout elements here, like header, footer, sidebar */}
      <main>{children}</main>
    </div>
  );
};
