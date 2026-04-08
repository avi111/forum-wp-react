import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`bg-indigo-900 py-16 px-4 sm:px-6 lg:px-8 text-center text-white ${className}`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
          {title}
        </h1>
        {description && (
          <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
