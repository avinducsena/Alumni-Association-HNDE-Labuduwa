import React, { useState } from 'react';
import { Star, MessageSquareQuote, Filter, Sparkles } from 'lucide-react';
import { AlumniReview, ReviewStats, ALL_BATCHES } from '../types/alumni';
import { ReviewCarousel } from './ReviewCarousel';
import { ReviewModal } from './ReviewModal';

interface ReviewSectionProps {
  reviews: AlumniReview[];
  stats: ReviewStats;
  selectedBatch: string;
  onSelectBatch: (batch: string) => void;
  onRateClick: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  stats,
  selectedBatch,
  onSelectBatch,
  onRateClick
}) => {
  const [modalReview, setModalReview] = useState<AlumniReview | null>(null);

  // Filter reviews by selected batch
  const filteredReviews = selectedBatch === 'All'
    ? reviews
    : reviews.filter(r => r.batch === selectedBatch);

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0c0507]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b] block mb-2">
            Testimonials & Reflections
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf9f2]">
            What Our Alumni Say
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent mx-auto mt-4" />
        </div>

        {/* Dynamic Overall Rating Summary Card */}
        <div className="bg-[#1c0409] border border-[#dfb15b]/25 rounded-3xl p-6 sm:p-10 shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Score Block */}
            <div className="lg:col-span-5 text-center lg:text-left lg:border-r border-white/5 lg:pr-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b]">
                Overall Alumni Rating
              </span>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 my-2">
                <span className="font-serif-display text-5xl sm:text-6xl font-bold text-[#fcf9f2] tabular-nums">
                  {stats.total > 0 ? stats.average.toFixed(1) : '5.0'}
                </span>
                <span className="text-lg text-[#dfb15b] font-serif-display font-medium">
                  / 5.0
                </span>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#dfb15b] my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${
                      s <= Math.round(stats.average) ? 'fill-[#dfb15b]' : 'opacity-30'
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-[#e7dece]/70 mt-1">
                Based on <span className="font-semibold text-[#fcf9f2] tabular-nums">{stats.total}</span> alumni reviews
              </p>

              <button
                onClick={onRateClick}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#dfb15b] hover:bg-[#fce5a3] text-[#1a080d] text-xs font-bold tracking-wide transition-all shadow active:scale-95"
              >
                <Star className="w-3.5 h-3.5 fill-[#1a080d]" />
                <span>Rate the Association</span>
              </button>
            </div>

            {/* Right: Distribution Bars */}
            <div className="lg:col-span-7 space-y-2.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stats.distribution[stars as 1 | 2 | 3 | 4 | 5] || 0;
                const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

                return (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-10 text-right text-[#dfb15b] font-medium flex items-center justify-end gap-1">
                      <span>{stars}</span>
                      <Star className="w-3 h-3 fill-[#dfb15b]" />
                    </span>

                    {/* Bar track */}
                    <div className="flex-1 h-2.5 bg-[#120205] rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-[#dfb15b] to-[#c59a3f] rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="w-14 text-right text-[#e7dece]/60 font-mono tabular-nums">
                      {count} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Highlighted Review Carousel */}
        {reviews.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#dfb15b] font-semibold">
                Featured Highlights
              </span>
            </div>
            <ReviewCarousel reviews={reviews} onReadMore={setModalReview} />
          </div>
        )}

        {/* Batch Filter Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#fcf9f2] flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#dfb15b]" />
              <span>Explore Alumni Voices</span>
            </h3>
            <p className="text-xs text-[#e7dece]/60 mt-0.5">
              Showing {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'} for {selectedBatch === 'All' ? 'all 11 batches' : selectedBatch}
            </p>
          </div>

          {/* Batch Pills / Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 max-w-full">
            <button
              onClick={() => onSelectBatch('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedBatch === 'All'
                  ? 'bg-[#dfb15b] text-[#1a080d]'
                  : 'bg-[#1c0409] text-[#e7dece]/70 hover:text-[#dfb15b]'
              }`}
            >
              All Batches
            </button>
            {ALL_BATCHES.map((b) => (
              <button
                key={b}
                onClick={() => onSelectBatch(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedBatch === b
                    ? 'bg-[#dfb15b] text-[#1a080d]'
                    : 'bg-[#1c0409] text-[#e7dece]/70 hover:text-[#dfb15b]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((r) => (
              <div
                key={r.id}
                className="p-6 rounded-2xl bg-[#1c0409] border border-[#dfb15b]/20 hover:border-[#dfb15b]/50 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-[#dfb15b]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= r.rating ? 'fill-[#dfb15b]' : 'opacity-25'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#e7dece]/50 font-mono">
                      {r.timestamp.split(' ')[0]}
                    </span>
                  </div>

                  <blockquote className="text-xs sm:text-sm text-[#e7dece] leading-relaxed mb-4 italic font-light">
                    "{r.feedback.length > 150 ? r.feedback.slice(0, 150) + '...' : r.feedback}"
                  </blockquote>

                  {r.feedback.length > 150 && (
                    <button
                      onClick={() => setModalReview(r)}
                      className="text-xs text-[#dfb15b] font-medium underline mb-4 hover:text-[#fce5a3]"
                    >
                      Read full review
                    </button>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif-display text-sm font-bold text-[#fcf9f2]">
                      {r.name}
                    </h4>
                    <span className="text-[11px] text-[#dfb15b] font-medium">
                      {r.batch}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#350910] border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] text-xs font-bold font-serif-display">
                    {r.name.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-[#170307] border border-dashed border-[#dfb15b]/30 rounded-3xl">
            <MessageSquareQuote className="w-12 h-12 text-[#dfb15b]/40 mx-auto mb-3" />
            <h4 className="font-serif-display text-xl font-bold text-[#fcf9f2] mb-1">
              No alumni reviews yet.
            </h4>
            <p className="text-xs sm:text-sm text-[#e7dece]/70 mb-6">
              Be the first from {selectedBatch === 'All' ? 'your batch' : selectedBatch} to share your experience.
            </p>
            <button
              onClick={onRateClick}
              className="px-6 py-3 rounded-xl bg-[#dfb15b] hover:bg-[#fce5a3] text-[#1a080d] text-xs font-bold tracking-wide transition-all shadow"
            >
              Share Your Feedback
            </button>
          </div>
        )}

      </div>

      {/* Full Review Modal */}
      <ReviewModal
        review={modalReview}
        onClose={() => setModalReview(null)}
      />
    </section>
  );
};
