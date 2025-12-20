
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Hash } from "lucide-react";

interface TagDatum {
  tag: string;
  count: number;
}

interface TagCloudProps {
  tagsData: TagDatum[];
}

export const TagCloud: React.FC<TagCloudProps> = ({ tagsData }) => {
  const sizedTags = useMemo(() => {
    // Ensure sorted and limited to top 30 if larger set is provided
    const limited = [...tagsData]
      .sort((a, b) => b.count - a.count)
      .slice(0, 30);

    if (limited.length === 0) return [] as Array<{
      tag: string;
      sizeClass: string;
      opacityClass: string;
    }>;

    const maxCount = limited[0].count;
    const minCount = limited[limited.length - 1].count;

    return limited.map(({ tag, count }) => {
      let sizeClass = "text-sm";
      let opacityClass = "opacity-70";

      const range = maxCount - minCount;
      const normalized = range === 0 ? 0.5 : (count - minCount) / range;

      if (normalized > 0.8) {
        sizeClass = "text-2xl font-bold";
        opacityClass = "opacity-100";
      } else if (normalized > 0.6) {
        sizeClass = "text-xl font-bold";
        opacityClass = "opacity-90";
      } else if (normalized > 0.4) {
        sizeClass = "text-lg font-medium";
        opacityClass = "opacity-80";
      } else if (normalized > 0.2) {
        sizeClass = "text-base font-medium";
        opacityClass = "opacity-80";
      }

      return { tag, sizeClass, opacityClass };
    });
  }, [tagsData]);

  if (sizedTags.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-16 relative overflow-hidden">
        {/* Decorative Background Icon */}
        <Hash className="absolute -top-4 -left-4 w-32 h-32 text-slate-50 transform rotate-12" />
        
        <div className="relative z-10 text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                <Hash className="w-5 h-5 text-teal-500" />
                נושאים פופולריים
            </h3>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 leading-loose max-w-4xl mx-auto">
                {sizedTags.map(({ tag, sizeClass, opacityClass }) => (
                <Link
                    key={tag}
                    to={`/tags/${encodeURIComponent(tag)}`}
                    className={`
                    ${sizeClass} ${opacityClass}
                    text-slate-600 hover:text-teal-600 hover:opacity-100 hover:scale-110
                    transition-all duration-300 ease-out cursor-pointer inline-block
                    `}
                >
                    {tag}
                </Link>
                ))}
            </div>
        </div>
    </div>
  );
};
