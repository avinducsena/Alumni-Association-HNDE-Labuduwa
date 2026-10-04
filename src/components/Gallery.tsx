import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { AlumniReview } from '../types/alumni';

interface GalleryProps {
  reviews: AlumniReview[];
  onUploadClick: () => void;
}

interface GalleryPhotoItem {
  url: string;
  author: string;
  batch: string;
  date: string;
}

export const Gallery: React.FC<GalleryProps> = ({ reviews, onUploadClick }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Extract all photo URLs from approved reviews and initial gallery assets
  const allPhotos: GalleryPhotoItem[] = [];

  // Default atmospheric event assets
  const defaultAssets: GalleryPhotoItem[] = [
    {
      url: "/src/assets/images/hero_alumni_gathering_1790962047030.jpg",
      author: "HNDE Alumni Association",
      batch: "Annual Gala Assembly",
      date: "Event Preview"
    },
    {
      url: "/src/assets/images/ramadia_ranmal_resort_1790962126484.jpg",
      author: "Event Venue",
      batch: "Ramadia Ranmal Moratuwa",
      date: "01 Nov 2026"
    },
    {
      url: "/src/assets/images/alumni_engineering_lab_1790962145561.jpg",
      author: "ATI Labuduwa Workshops",
      batch: "Engineering Roots",
      date: "Akmeemana, Galle"
    },
    {
      url: "/src/assets/images/alumni_networking_event_1790962165660.jpg",
      author: "Alumni Gathering",
      batch: "Professional Network",
      date: "Alumni Brotherhood"
    }
  ];

  // Append user-submitted photos from reviews
  reviews.forEach((r) => {
    if (r.photos && r.photos.length > 0) {
      r.photos.forEach((url) => {
        allPhotos.push({
          url: url,
          author: r.name,
          batch: r.batch,
          date: r.timestamp.split(' ')[0]
        });
      });
    }
  });

  const displayList = allPhotos.length > 0 ? [...allPhotos, ...defaultAssets] : defaultAssets;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + displayList.length) % displayList.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % displayList.length);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#0c0507] via-[#150306] to-[#0c0507]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#350910]/60 border border-[#dfb15b]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb15b]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#fce5a3]">
              Visual Heritage
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf9f2]">
            Alumni Memories
          </h2>
          <p className="text-xs sm:text-sm text-[#e7dece]/70 mt-2">
            Moments, camaraderie, and milestones captured across 11 batches of HNDE Labuduwa.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent mx-auto mt-4" />
        </div>

        {/* Gallery Grid */}
        {displayList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayList.map((item, index) => (
              <div
                key={index}
                onClick={() => setActivePhotoIndex(index)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#1c0409] border border-[#dfb15b]/20 hover:border-[#dfb15b]/60 transition-all duration-300 shadow-xl ${
                  index % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <img
                  src={item.url}
                  alt={`Alumni memory by ${item.author}`}
                  loading="lazy"
                  className="w-full h-64 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[220px]"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#fcf9f2]">
                        {item.author}
                      </p>
                      <p className="text-[11px] text-[#dfb15b]">
                        {item.batch} · {item.date}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 text-[#dfb15b]">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16 px-4 bg-[#170307] border border-dashed border-[#dfb15b]/30 rounded-3xl">
            <Camera className="w-12 h-12 text-[#dfb15b]/40 mx-auto mb-3" />
            <h4 className="font-serif-display text-xl font-bold text-[#fcf9f2] mb-1">
              No memories have been uploaded yet.
            </h4>
            <p className="text-xs sm:text-sm text-[#e7dece]/70 mb-6">
              Be the first to share a memory from your batch.
            </p>
            <button
              onClick={onUploadClick}
              className="px-6 py-3 rounded-xl bg-[#dfb15b] hover:bg-[#fce5a3] text-[#1a080d] text-xs font-bold tracking-wide transition-all shadow"
            >
              Upload Event Photo
            </button>
          </div>
        )}

        {/* Upload Memory CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onUploadClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#350910] hover:bg-[#4a0e17] text-[#fce5a3] border border-[#dfb15b]/30 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
          >
            <Camera className="w-4 h-4 text-[#dfb15b]" />
            <span>Contribute Your Photographs to the Memory Wall</span>
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={displayList[activePhotoIndex].url}
              alt={displayList[activePhotoIndex].author}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <p className="font-serif-display text-base font-bold text-[#fcf9f2]">
                {displayList[activePhotoIndex].author}
              </p>
              <p className="text-xs text-[#dfb15b]">
                {displayList[activePhotoIndex].batch} · {displayList[activePhotoIndex].date}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
