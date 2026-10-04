import React from 'react';
import { ALL_BATCHES, BatchNumber } from '../types/alumni';
import { Sparkles, Users } from 'lucide-react';

interface BatchSectionProps {
  selectedBatch: string;
  onSelectBatch: (batch: string) => void;
  batchReviewCounts: Record<string, number>;
}

export const BatchSection: React.FC<BatchSectionProps> = ({
  selectedBatch,
  onSelectBatch,
  batchReviewCounts
}) => {
  return (
    <section id="batches" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0c0507]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#350910]/60 border border-[#dfb15b]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb15b]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#fce5a3]">
              Unified Heritage
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf9f2]">
            11 Batches. One Community.
          </h2>
          <p className="text-base sm:text-lg font-serif-display italic text-[#dfb15b] mt-2">
            "Different batches. Different journeys. One HNDE family."
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent mx-auto mt-4" />
        </div>

        {/* Big Impact Counter Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 text-center">
          <div className="p-6 rounded-2xl bg-[#1c0409] border border-[#dfb15b]/20">
            <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fcf9f2] block tabular-nums">
              11
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#dfb15b] mt-1 block">
              Batches United
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#1c0409] border border-[#dfb15b]/20">
            <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fcf9f2] block">
              3
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#dfb15b] mt-1 block">
              Disciplines
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#1c0409] border border-[#dfb15b]/20">
            <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fcf9f2] block">
              1
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#dfb15b] mt-1 block">
              Grand Gathering
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#1c0409] border border-[#dfb15b]/20">
            <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fcf9f2] block">
              100%
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#dfb15b] mt-1 block">
              Alumni Brotherhood
            </span>
          </div>
        </div>

        {/* Visual Batch Selector Cards */}
        <div className="bg-[#170307] border border-[#dfb15b]/25 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div>
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#fcf9f2]">
                Explore By Batch
              </h3>
              <p className="text-xs text-[#e7dece]/70">
                Click any batch to filter alumni reviews and memories below
              </p>
            </div>
            
            <button
              onClick={() => onSelectBatch('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                selectedBatch === 'All'
                  ? 'bg-[#dfb15b] text-[#1a080d] shadow'
                  : 'bg-[#2a060d] text-[#e7dece] hover:text-[#dfb15b] border border-white/10'
              }`}
            >
              Show All Batches
            </button>
          </div>

          {/* Interactive Batch Timeline Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ALL_BATCHES.map((batch: BatchNumber) => {
              const isSelected = selectedBatch === batch;
              const count = batchReviewCounts[batch] || 0;
              return (
                <button
                  key={batch}
                  onClick={() => onSelectBatch(batch)}
                  className={`group relative p-4 rounded-xl text-left transition-all duration-300 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#4a0e17] to-[#25050c] border-[#dfb15b] shadow-lg shadow-[#dfb15b]/15 scale-[1.02]'
                      : 'bg-[#120205] border-[#dfb15b]/15 hover:border-[#dfb15b]/50 hover:bg-[#20040a]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono tracking-wider ${
                      isSelected ? 'text-[#fce5a3]' : 'text-[#dfb15b]/80'
                    }`}>
                      ATI LABUDUWA
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfb15b]" />
                  </div>

                  <div className="my-2">
                    <span className={`font-serif-display text-base sm:text-lg font-bold block ${
                      isSelected ? 'text-[#fcf9f2]' : 'text-[#f4efe8] group-hover:text-[#dfb15b]'
                    }`}>
                      {batch}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#e7dece]/60 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#dfb15b]" />
                      <span className="tabular-nums">{count} {count === 1 ? 'review' : 'reviews'}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
