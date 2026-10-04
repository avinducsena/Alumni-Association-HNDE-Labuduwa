import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageSquareQuote, Calendar } from 'lucide-react';
import { AlumniReview } from '../types/alumni';

interface ReviewCarouselProps {
  reviews: AlumniReview[];
  onReadMore: (review: AlumniReview) => void;
}

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews, onReadMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto rotation every 6 seconds, pause on hover
  useEffect(() => {
    if (reviews.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [reviews.length, isPaused]);

  if (reviews.length === 0) return null;

  const current = reviews[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Active Carousel Card */}
      <div className="bg-gradient-to-br from-[#20040a] via-[#170307] to-[#120205] border border-[#dfb15b]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300">
        
        {/* Quote watermark icon */}
        <MessageSquareQuote className="absolute top-6 right-6 w-16 h-16 text-[#dfb15b]/10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-5 h-5 ${
                  s <= current.rating ? 'fill-[#dfb15b] text-[#dfb15b]' : 'text-neutral-700'
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-[#dfb15b] font-mono font-bold">
              {current.rating}.0 / 5.0
            </span>
          </div>

          <span className="text-xs text-[#e7dece]/60 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#dfb15b]" />
            <span>{current.timestamp.split(' ')[0]}</span>
          </span>
        </div>

        {/* Review Quote text */}
        <blockquote className="text-base sm:text-xl text-[#fcf9f2] font-light leading-relaxed mb-6 italic">
          "{current.feedback.length > 220 ? current.feedback.slice(0, 220) + '...' : current.feedback}"
        </blockquote>

        {/* Read More Trigger if text is long */}
        {current.feedback.length > 220 && (
          <button
            onClick={() => onReadMore(current)}
            className="text-xs font-semibold text-[#dfb15b] hover:text-[#fce5a3] underline mb-6 block"
          >
            Read More
          </button>
        )}

        {/* Reviewer signature */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#350910] border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] font-bold text-sm font-serif-display">
              {current.name.charAt(0)}
            </div>
            <div>
              <p className="font-serif-display text-base font-bold text-[#fcf9f2]">
                {current.name}
              </p>
              <p className="text-xs text-[#dfb15b] font-medium">
                {current.batch}
              </p>
            </div>
          </div>

          {/* Carousel indicators & nav buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-[#140306] hover:bg-[#350910] border border-[#dfb15b]/20 text-[#e7dece] hover:text-[#dfb15b] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#dfb15b] px-1">
              {currentIndex + 1} / {reviews.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-[#140306] hover:bg-[#350910] border border-[#dfb15b]/20 text-[#e7dece] hover:text-[#dfb15b] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
