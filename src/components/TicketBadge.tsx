import React from 'react';
import { Calendar, Clock, MapPin, Award, CheckCircle2 } from 'lucide-react';

interface TicketBadgeProps {
  className?: string;
  onActionClick?: () => void;
}

export const TicketBadge: React.FC<TicketBadgeProps> = ({ className = '', onActionClick }) => {
  return (
    <div className={`relative max-w-xl mx-auto ${className}`}>
      {/* Decorative Gold Glow Backdrop */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#dfb15b]/20 via-[#c59a3f]/40 to-[#dfb15b]/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 -z-10" />

      {/* Ticket Container */}
      <div className="relative flex flex-col md:flex-row bg-gradient-to-br from-[#2a060d] via-[#1a0408] to-[#120205] border border-[#dfb15b]/40 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left / Main Stub */}
        <div className="flex-1 p-6 sm:p-7 relative">
          
          {/* Perforated Notches on boundary (Desktop & Mobile) */}
          <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0c0507] border border-[#dfb15b]/40 z-20" />
          
          <div className="flex items-center justify-between pb-3 border-b border-[#dfb15b]/20">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#dfb15b]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#fce5a3]">
                Official Event Pass
              </span>
            </div>
            <span className="text-xs text-[#dfb15b]/80 font-mono tracking-wider">
              NO. 2026-HNDE
            </span>
          </div>

          <div className="mt-4">
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold tracking-wide text-[#fcf9f2]">
              HNDE ALUMNI EVENT 2026
            </h3>
            <p className="text-xs sm:text-sm text-[#dfb15b] font-medium tracking-wide mt-1">
              Alumni Get-Together & Professional Networking
            </p>
          </div>

          {/* Key Information Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/5 text-xs text-[#e7dece]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#dfb15b] shrink-0" />
              <span>Sunday, 01 Nov 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#dfb15b] shrink-0" />
              <span>10:00 AM – 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="w-4 h-4 text-[#dfb15b] shrink-0" />
              <span className="truncate">Ramadia Ranmal Holiday Resort, Moratuwa</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#dfb15b]/15 text-[11px] text-[#e7dece]/70">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb15b]" />
              11 Batches · One Family
            </span>
            <span className="font-serif-display italic text-[#dfb15b]/90">
              "Same Roots. Brighter Futures."
            </span>
          </div>
        </div>

        {/* Perforated Vertical Divider */}
        <div className="relative flex md:flex-col items-center justify-between border-t md:border-t-0 md:border-l border-dashed border-[#dfb15b]/30 bg-[#160205] px-6 py-5 md:py-6 md:w-44 shrink-0 text-center">
          
          <div className="text-left md:text-center">
            <span className="text-[10px] tracking-widest uppercase text-[#dfb15b] block font-mono">
              ADMIT ONE
            </span>
            <span className="text-xs font-serif-display font-bold text-[#fcf9f2] block mt-0.5">
              ENTRY / ALUMNI EXPERIENCE
            </span>
          </div>

          {/* Barcode Mock Visual */}
          <div className="my-2 py-1 px-2 bg-black/40 rounded border border-[#dfb15b]/20 flex flex-col items-center justify-center">
            <div className="flex items-end gap-1 h-7 opacity-80">
              <div className="w-0.5 h-full bg-[#dfb15b]"></div>
              <div className="w-1 h-5/6 bg-[#dfb15b]"></div>
              <div className="w-0.5 h-full bg-[#dfb15b]"></div>
              <div className="w-1.5 h-4/6 bg-[#dfb15b]"></div>
              <div className="w-0.5 h-full bg-[#dfb15b]"></div>
              <div className="w-1 h-full bg-[#dfb15b]"></div>
              <div className="w-0.5 h-3/6 bg-[#dfb15b]"></div>
              <div className="w-1 h-full bg-[#dfb15b]"></div>
              <div className="w-1.5 h-5/6 bg-[#dfb15b]"></div>
              <div className="w-0.5 h-full bg-[#dfb15b]"></div>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-[#dfb15b]/70 mt-1">
              *HNDE-2026*
            </span>
          </div>

          {onActionClick && (
            <button
              onClick={onActionClick}
              className="text-[11px] font-bold px-3 py-1.5 bg-[#dfb15b] hover:bg-[#fce5a3] text-[#1a080d] rounded transition-colors whitespace-nowrap"
            >
              RATE EXPERIENCE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
