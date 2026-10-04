import React, { useState, useEffect } from 'react';
import { Menu, X, Star } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Event 2026", href: "#event-details" },
    { name: "11 Batches", href: "#batches" },
    { name: "Reviews", href: "#reviews" },
    { name: "Memories", href: "#gallery" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRateClick = () => {
    setIsOpen(false);
    const target = document.querySelector('#rate-us');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#150306]/95 backdrop-blur-md border-b border-[#dfb15b]/20 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Zone 1: Single text element Brand wordmark in display serif face */}
          <a
            href="#"
            className="font-serif-display text-lg sm:text-xl font-bold tracking-wider text-[#fce5a3] hover:text-[#dfb15b] transition-colors whitespace-nowrap"
          >
            HNDE LABUDUWA ALUMNI
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#e7dece]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-[#dfb15b] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#dfb15b] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRateClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-[#1a080d] bg-gradient-to-r from-[#fce5a3] via-[#dfb15b] to-[#c59a3f] rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#dfb15b]/10 whitespace-nowrap"
            >
              <Star className="w-4 h-4 fill-[#1a080d]" />
              <span>RATE US</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#e7dece] hover:text-[#dfb15b] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#150306]/98 border-b border-[#dfb15b]/20 px-6 py-6 transition-all shadow-2xl">
          <div className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[#e7dece] hover:text-[#dfb15b] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={handleRateClick}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 text-sm font-bold text-[#1a080d] bg-gradient-to-r from-[#fce5a3] to-[#dfb15b] rounded-lg shadow-md"
            >
              <Star className="w-4 h-4 fill-[#1a080d]" />
              <span>SHARE YOUR RATING</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
