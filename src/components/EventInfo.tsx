import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink, CalendarPlus } from 'lucide-react';

export const EventInfo: React.FC = () => {
  // Countdown to Sunday, Nov 1, 2026 10:00 AM Colombo Time (+05:30)
  const eventDate = new Date("2026-11-01T10:00:00+05:30").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("HNDE Alumni Event 2026 - Alumni Get-Together & Professional Networking");
    const details = encodeURIComponent("HNDE Labuduwa Alumni Association Reunion & Networking Event. 'Same Roots, Brighter Futures'. Reconnect with 11 batches!");
    const location = encodeURIComponent("Ramadia Ranmal Holiday Resort, Moratuwa, Sri Lanka");
    const dates = "20261101T043000Z/20261101T103000Z"; // 10:00 AM - 4:00 PM Sri Lanka (UTC+5:30)
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirections = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Ramadia+Ranmal+Holiday+Resort+Moratuwa+Sri+Lanka`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const infoCards = [
    {
      title: "DATE",
      value: "Sunday, 01 Nov 2026",
      subtitle: "Official Alumni Gathering",
      icon: Calendar,
      detail: "Save the date for the grand reunion."
    },
    {
      title: "TIME",
      value: "10:00 AM – 4:00 PM",
      subtitle: "Full Day Experience",
      icon: Clock,
      detail: "Registration, fellowship, lunch & networking."
    },
    {
      title: "VENUE",
      value: "Ramadia Ranmal Holiday Resort",
      subtitle: "Moratuwa, Sri Lanka",
      icon: MapPin,
      detail: "Lakeside resort atmosphere by Bolgoda Lake."
    },
    {
      title: "COMMUNITY",
      value: "11 Batches United",
      subtitle: "HNDE Labuduwa Family",
      icon: Users,
      detail: "Civil, Electrical & Mechanical engineers."
    }
  ];

  return (
    <section id="event-details" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#0c0507] via-[#170307] to-[#0c0507]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b] block mb-2">
            Mark Your Calendar
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf9f2]">
            HNDE Alumni Event 2026
          </h2>
          <p className="text-sm sm:text-base text-[#dfb15b] mt-2 font-medium">
            Alumni Get-Together & Professional Networking
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent mx-auto mt-4" />
        </div>

        {/* Live Countdown Box */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#20040a] via-[#350910] to-[#20040a] border border-[#dfb15b]/30 shadow-2xl text-center max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#dfb15b] font-semibold mb-6">
            Countdown to Grand Alumni Assembly
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#120205]/80 border border-[#dfb15b]/20">
              <span className="font-serif-display text-3xl sm:text-5xl font-bold text-[#fcf9f2] block tabular-nums">
                {timeLeft.days}
              </span>
              <span className="text-xs text-[#dfb15b] uppercase tracking-wider font-medium mt-1 block">
                Days
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#120205]/80 border border-[#dfb15b]/20">
              <span className="font-serif-display text-3xl sm:text-5xl font-bold text-[#fcf9f2] block tabular-nums">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-[#dfb15b] uppercase tracking-wider font-medium mt-1 block">
                Hours
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#120205]/80 border border-[#dfb15b]/20">
              <span className="font-serif-display text-3xl sm:text-5xl font-bold text-[#fcf9f2] block tabular-nums">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-[#dfb15b] uppercase tracking-wider font-medium mt-1 block">
                Minutes
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#120205]/80 border border-[#dfb15b]/20">
              <span className="font-serif-display text-3xl sm:text-5xl font-bold text-[#fcf9f2] block tabular-nums">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-[#dfb15b] uppercase tracking-wider font-medium mt-1 block">
                Seconds
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#dfb15b] hover:bg-[#fce5a3] text-[#1a080d] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Add to Google Calendar</span>
            </button>
            <button
              onClick={handleDirections}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#140306] hover:bg-[#20050a] text-[#dfb15b] border border-[#dfb15b]/40 text-xs sm:text-sm font-semibold tracking-wide transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>
        </div>

        {/* 4 Modern Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="p-6 rounded-2xl bg-[#1c0409] border border-[#dfb15b]/25 hover:border-[#dfb15b]/60 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono tracking-widest font-bold text-[#dfb15b]">
                      {card.title}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#350910] border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-[#fcf9f2] mb-1">
                    {card.value}
                  </h3>
                  <p className="text-xs text-[#dfb15b] font-medium mb-3">
                    {card.subtitle}
                  </p>
                </div>
                <p className="text-xs text-[#e7dece]/75 pt-3 border-t border-white/5">
                  {card.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Venue Spotlight Feature */}
        <div className="rounded-3xl overflow-hidden bg-[#1c0409] border border-[#dfb15b]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[300px]">
            <img
              src="/src/assets/images/ramadia_ranmal_resort_1790962126484.jpg"
              alt="Ramadia Ranmal Holiday Resort Moratuwa"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          </div>
          
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b]">
              Official Venue Partner
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fcf9f2]">
              Ramadia Ranmal Holiday Resort
            </h3>
            <p className="text-xs sm:text-sm text-[#dfb15b]">
              Bolgoda Lake Waterfront · Moratuwa, Sri Lanka
            </p>
            <p className="text-xs sm:text-sm text-[#e7dece]/85 leading-relaxed">
              Nestled along the serene waters of the Bolgoda Lake, Ramadia Ranmal provides an expansive banquet setting, lakeside breezes, and ample parking to host hundreds of fellow alumni from all 11 batches.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleDirections}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#350910] hover:bg-[#4a0e17] text-[#fce5a3] border border-[#dfb15b]/30 text-xs font-semibold transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#dfb15b]" />
                <span>View Venue Location</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
