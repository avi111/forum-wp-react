import React, { MouseEvent, TouchEvent, useRef, useState } from "react";
import { Researcher } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResearcherCard } from "./ResearcherCard";

export interface ResearcherCarouselProps {
  researchers: Researcher[];
}

export const ResearcherCarousel: React.FC<ResearcherCarouselProps> = ({
  researchers,
}) => {
  const navigate = useNavigate();
  const VISIBLE_ITEMS = 4;

  const [currentIndex, setCurrentIndex] = useState(VISIBLE_ITEMS);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clonesStart = researchers.slice(0, VISIBLE_ITEMS);
  const clonesEnd = researchers.slice(-VISIBLE_ITEMS);
  const extendedList = [...clonesEnd, ...researchers, ...clonesStart];

  const totalRealItems = researchers.length;

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= totalRealItems + VISIBLE_ITEMS) {
      setCurrentIndex(VISIBLE_ITEMS);
    } else if (currentIndex < VISIBLE_ITEMS) {
      setCurrentIndex(totalRealItems + VISIBLE_ITEMS - 1);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleDragStart = (x: number) => {
    setIsDragging(true);
    setStartX(x);
    setIsTransitioning(false);
  };

  const handleDragMove = (x: number) => {
    if (!isDragging) return;
    const diff = x - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = 50;

    if (translateX > threshold) {
      prevSlide();
    } else if (translateX < -threshold) {
      nextSlide();
    } else {
      setIsTransitioning(true);
    }
    setTranslateX(0);
  };

  const onMouseDown = (e: MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };
  const onTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  const handleResearcherClick = (id: string) => {
    navigate(`/researchers/${id}`);
  };

  const getItemWidthClass = () => "w-full sm:w-1/2 lg:w-1/4";

  return (
    <div className="w-full bg-slate-50 py-16 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 relative group">
        <div className="flex justify-between items-end mb-8 px-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">החוקרים שלנו</h2>
            <div className="w-16 h-1 bg-teal-500 rounded mt-2"></div>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-slate-300 hover:bg-white hover:shadow-md transition-all text-slate-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-slate-300 hover:bg-white hover:shadow-md transition-all text-slate-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden relative -mx-4 px-4 py-4"
          ref={containerRef}
          dir="ltr"
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / VISIBLE_ITEMS)}% + ${translateX}px))`,
              transition: isDragging ? "none" : "transform 500ms ease-out",
            }}
            onTransitionEnd={handleTransitionEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {extendedList.map((r, index) => (
              <div
                key={`${r.id}-${index}`}
                className={`flex-shrink-0 px-3 cursor-pointer ${getItemWidthClass()}`}
                onClick={(e) => {
                  if (Math.abs(translateX) > 5) e.preventDefault();
                }}
              >
                <ResearcherCard
                  researcher={r}
                  onClick={handleResearcherClick}
                  variant="carousel"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button
            onClick={prevSlide}
            className="p-3 bg-white shadow rounded-full text-slate-700 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 bg-white shadow rounded-full text-slate-700 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
            .w-full.sm\\:w-1\\/2.lg\\:w-1\\/4 { width: 25% !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
             .w-full.sm\\:w-1\\/2.lg\\:w-1\\/4 { width: 25% !important; }
        }
        @media (max-width: 639px) {
             .w-full.sm\\:w-1\\/2.lg\\:w-1\\/4 { width: 100% !important; } 
        }
      `}</style>
    </div>
  );
};
