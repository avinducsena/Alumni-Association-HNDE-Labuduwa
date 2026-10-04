import React from 'react';
import { ArrowUp, Heart, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Event 2026", href: "#event-details" },
    { name: "11 Batches", href: "#batches" },
    { name: "Reviews", href: "#reviews" },
    { name: "Memories", href: "#gallery" },
    { name: "Share Feedback", href: "#rate-us" }
  ];

  return (
    <footer className="bg-[#080204] border-t border-[#dfb15b]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#e7dece] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold tracking-wider text-[#fcf9f2]">
              HNDE LABUDUWA ALUMNI ASSOCIATION
            </h3>
            <p className="font-serif-display italic text-[#dfb15b] text-base">
              "Same Roots. Brighter Futures."
            </p>
            <p className="text-xs sm:text-sm text-[#e7dece]/70 max-w-md leading-relaxed">
              Bringing together 11 batches of Higher National Diploma in Engineering graduates from ATI Labuduwa, Galle. Reconnect, network, and build a brighter tomorrow.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-[#dfb15b] pt-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>ATI Labuduwa, Akmeemana, Galle, Sri Lanka</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(link.href);
                      target?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[#e7dece]/70 hover:text-[#dfb15b] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Summary Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b]">
              Alumni Event 2026
            </h4>
            <div className="p-4 rounded-xl bg-[#140306] border border-[#dfb15b]/20 text-xs space-y-1.5">
              <p className="font-semibold text-[#fcf9f2]">
                Sunday, 01 Nov 2026
              </p>
              <p className="text-[#dfb15b]">
                10:00 AM – 4:00 PM
              </p>
              <p className="text-[#e7dece]/70">
                Ramadia Ranmal Holiday Resort, Moratuwa
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e7dece]/60">
          <p>
            © {new Date().getFullYear()} HNDE Labuduwa Alumni Association. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a0408] border border-[#dfb15b]/20 text-[#dfb15b] hover:bg-[#350910] transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
