import React from 'react';
import { X, Star, Calendar, MessageSquare, Lightbulb, Users } from 'lucide-react';
import { AlumniReview } from '../types/alumni';

interface ReviewModalProps {
  review: AlumniReview | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-gradient-to-b from-[#20040a] to-[#120205] border border-[#dfb15b]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-black/40 hover:bg-black/70 text-[#e7dece] hover:text-[#dfb15b] transition-colors"
          aria-label="Close review modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Details */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <div className="w-12 h-12 rounded-xl bg-[#350910] border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] font-serif-display font-bold text-lg">
            {review.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-serif-display text-xl font-bold text-[#fcf9f2]">
              {review.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#dfb15b]">
              <span className="font-semibold">{review.batch}</span>
              <span>·</span>
              <span className="text-[#e7dece]/60">{review.timestamp.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-5 h-5 ${
                s <= review.rating ? 'fill-[#dfb15b] text-[#dfb15b]' : 'text-neutral-700'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-[#dfb15b] font-mono font-bold">
            {review.rating}.0 / 5.0
          </span>
        </div>

        {/* Full Feedback */}
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#dfb15b] flex items-center gap-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Alumni Experience</span>
            </h4>
            <p className="text-sm sm:text-base text-[#e7dece] leading-relaxed font-light whitespace-pre-wrap">
              "{review.feedback}"
            </p>
          </div>

          {review.improvements && (
            <div className="p-4 rounded-xl bg-[#140306] border border-[#dfb15b]/20 mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#dfb15b] flex items-center gap-1.5 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Suggestions for Improvement</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#e7dece]/80 leading-relaxed italic">
                "{review.improvements}"
              </p>
            </div>
          )}

          {/* Attached Photos */}
          {review.photos && review.photos.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#dfb15b] block mb-2">
                Shared Memories
              </span>
              <div className="grid grid-cols-2 gap-2">
                {review.photos.map((photoUrl, idx) => (
                  <img
                    key={idx}
                    src={photoUrl}
                    alt={`Memory by ${review.name}`}
                    className="w-full h-32 object-cover rounded-xl border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#350910] hover:bg-[#4a0e17] text-[#fce5a3] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
