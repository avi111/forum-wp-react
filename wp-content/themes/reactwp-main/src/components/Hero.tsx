import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  memo,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { useTemplate } from "../hooks/useAppQueries";
import { ContentNotFound } from "./ContentNotFound";

export interface HeroProps {
  children?: ReactNode;
}

// Using React.memo to prevent re-rendering of the HTML container when the parent updates.
// This ensures that the DOM nodes created by dangerouslySetInnerHTML are preserved,
// preventing the Portal content from being wiped out during re-renders.
const HtmlContainer = memo(
  forwardRef<HTMLDivElement, { content: string }>(({ content }, ref) => {
    return <div ref={ref} dangerouslySetInnerHTML={{ __html: content }} />;
  }),
);

export const Hero: React.FC<HeroProps> = ({ children }) => {
  const { data: content, isLoading, isError } = useTemplate("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const [mountNode, setMountNode] = useState<Element | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const node = containerRef.current.querySelector(
        "#hero-children-placeholder",
      );
      setMountNode(node);
    }
  }, [content]);

  if (isLoading) {
    return (
      <div className="relative bg-slate-900 text-white overflow-hidden min-h-[500px] flex items-center">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12">
          {/* Skeleton loader or simple loading state */}
        </div>
      </div>
    );
  }

  if (isError || !content) {
    return <ContentNotFound />;
  }

  return (
    <div className="hero-wrapper relative">
      <HtmlContainer ref={containerRef} content={content} />
      {mountNode &&
        children &&
        createPortal(<div className="pt-4">{children}</div>, mountNode)}
    </div>
  );
};
