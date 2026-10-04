import React from 'react';
import { Calendar, MapPin, ArrowRight, Star, Sparkles, MessageSquareQuote } from 'lucide-react';
import { TicketBadge } from './TicketBadge';

interface HeroProps {
  onRateClick: () => void;
  onReviewsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRateClick, onReviewsClick }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Image with Layered Burgundy/Dark Scrim */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/src/assets/images/hero_alumni_gathering_1790962047030.jpg"
          alt="HNDE Labuduwa Alumni Gathering"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Deep Burgundy & Radial Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0507]/90 via-[#23050a]/85 to-[#0c0507]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dfb15b]/10 via-transparent to-transparent" />
      </div>

      {/* Decorative Grid Lines / Engineering Aesthetic */}
      <div 
        className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(223, 177, 91, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-6xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Subtle Tagline Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#350910]/70 border border-[#dfb15b]/30 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#dfb15b]" />
          <span className="text-xs uppercase tracking-widest font-semibold text-[#fce5a3]">
            Reconnect · Network · Build a Brighter Tomorrow
          </span>
        </div>

        {/* Brand Headline Lockup */}
        <div className="space-y-1 mb-4">
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#fcf9f2] drop-shadow-sm">
            HNDE LABUDUWA
          </h1>
          <p className="font-serif-display text-lg sm:text-2xl lg:text-3xl font-semibold tracking-widest text-[#dfb15b]">
            ALUMNI ASSOCIATION
          </p>
        </div>

        {/* Main Emotional Message */}
        <p className="text-2xl sm:text-3xl lg:text-4xl font-serif-display italic font-medium text-[#fce5a3] max-w-3xl mx-auto mt-2 mb-4">
          "Same Roots. Brighter Futures."
        </p>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-[#e7dece] max-w-2xl mx-auto leading-relaxed font-light mb-8">
          Reconnect with the people, memories, and experiences that shaped our engineering journey. 
          Celebrating 11 batches of excellence, industry leadership, and shared brotherhood.
        </p>

        {/* Event Quick Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#e7dece] bg-[#1a0408]/80 border border-[#dfb15b]/25 rounded-xl px-5 py-3 mb-10 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#dfb15b]" />
            <span className="font-medium text-[#fcf9f2]">Sunday, 01 November 2026</span>
          </div>
          <span className="hidden sm:inline text-[#dfb15b]/40">|</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#dfb15b]">10:00 AM – 4:00 PM</span>
          </div>
          <span className="hidden sm:inline text-[#dfb15b]/40">|</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#dfb15b]" />
            <span>Ramadia Ranmal Holiday Resort, Moratuwa</span>
          </div>
        </div>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12">
          <button
            onClick={onRateClick}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold tracking-wider text-[#1a080d] bg-gradient-to-r from-[#fce5a3] via-[#dfb15b] to-[#c59a3f] rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#dfb15b]/20 flex items-center justify-center gap-2"
          >
            <Star className="w-4 h-4 fill-[#1a080d]" />
            <span>SHARE YOUR EXPERIENCE</span>
          </button>

          <button
            onClick={onReviewsClick}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold tracking-wide text-[#fcf9f2] bg-[#350910]/70 hover:bg-[#4a0e17] border border-[#dfb15b]/40 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm hover:border-[#dfb15b]"
          >
            <MessageSquareQuote className="w-4 h-4 text-[#dfb15b]" />
            <span>VIEW ALUMNI REVIEWS</span>
          </button>
        </div>

        {/* Event Ticket Visual Element */}
        <div className="w-full mt-2">
          <TicketBadge onActionClick={onRateClick} />
        </div>
      </div>
    </section>
  );
};
