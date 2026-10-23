import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Dumbbell, Target, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { content } = useContent();

  const principleIcons = [Dumbbell, Target, ShieldCheck];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#0d0d0d] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left rtl:text-right">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            {t.about.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {content.bioHeading[language]}
          </h2>
        </div>

        {/* 2-Column Split: Official Brand Poster & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual: Official Coach Omar Poster with dumbbell and monogram */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-black shadow-2xl group">
              <img
                src={content.brandPosterUrl}
                alt="Coach Omar Elgafary Official Brand Poster"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Official Monogram & Visual Identity
                </span>
              </div>
            </div>
          </div>

          {/* Biography Content & Coaching Principles */}
          <div className="lg:col-span-7 space-y-8 text-left rtl:text-right">
            <div className="p-6 sm:p-8 rounded-xl border border-white/10 bg-[#121212] space-y-4">
              <h3 className="text-xl font-bold text-white">
                {language === 'ar' ? 'فلسفة التدريب ومنهجية العمل' : 'Coaching Philosophy & Methodology'}
              </h3>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {content.bioBody[language]}
              </p>
            </div>

            {/* Principles list */}
            <div>
              <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
                {t.about.principlesTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {content.coachingPrinciples.map((principle, index) => {
                  const Icon = principleIcons[index % principleIcons.length];
                  return (
                    <div
                      key={principle.id}
                      className="p-5 rounded-lg border border-white/5 bg-[#141414] hover:border-[#D4AF37]/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-md bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1.5">
                        {principle.title[language]}
                      </h5>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {principle.description[language]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
