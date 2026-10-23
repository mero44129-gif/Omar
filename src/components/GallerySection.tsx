import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { GalleryItem } from '../types/content';
import { Maximize2, X, ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { content } = useContent();
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const publishedItems = content.gallery
    .filter((g) => g.published)
    .sort((a, b) => a.order - b.order);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = publishedItems.findIndex((g) => g.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % publishedItems.length;
    setActiveItem(publishedItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = publishedItems.findIndex((g) => g.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + publishedItems.length) % publishedItems.length;
    setActiveItem(publishedItems[prevIndex]);
  };

  return (
    <section id="transformations" className="py-20 md:py-28 bg-[#0c0c0c] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left rtl:text-right">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            {t.gallery.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.gallery.heading}
          </h2>
          <p className="text-base text-slate-300">
            {t.gallery.subheading}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#141414] transition-all hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
            >
              {/* Image Frame: Natural ratio preserved with black letterboxing if needed */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.caption ? item.caption[language] : 'Transformation progression'}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Hover Overlay with expand icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between mb-2">
                  {item.timeframe && (
                    <span className="text-xs font-semibold text-[#D4AF37]">
                      {item.timeframe[language]}
                    </span>
                  )}
                  <span className="p-1.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                {item.caption && (
                  <p className="text-xs text-slate-200 line-clamp-2">
                    {item.caption[language]}
                  </p>
                )}
              </div>

              {/* Static lower card info for non-hover states */}
              <div className="p-4 border-t border-white/5 bg-[#121212]">
                <div className="text-xs font-semibold text-[#D4AF37] mb-1">
                  {item.timeframe ? item.timeframe[language] : (language === 'ar' ? 'تطور بدني موثق' : 'Documented Progression')}
                </div>
                {item.caption && (
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.caption[language]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ethical disclaimer reminder */}
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-400 justify-center">
          <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            {language === 'ar'
              ? 'الصور المنشورة تعكس التزام المتدربين الفعلي بالخطة. تختلف النتائج الفردية بحسب الالتزام والجينات.'
              : 'Photographs represent genuine client adherence to structured programming. Individual results vary with consistency and genetics.'}
          </span>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveItem(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label={t.gallery.closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev / Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              isRTL ? handleNext() : handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              isRTL ? handlePrev() : handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[75vh] overflow-hidden rounded-lg border border-white/20 bg-black shadow-2xl flex items-center justify-center">
              <img
                src={activeItem.imageUrl}
                alt="Enlarged progression view"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Captions */}
            {(activeItem.caption || activeItem.timeframe) && (
              <div className="mt-4 text-center max-w-xl px-4">
                {activeItem.timeframe && (
                  <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
                    {activeItem.timeframe[language]}
                  </div>
                )}
                {activeItem.caption && (
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeItem.caption[language]}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
