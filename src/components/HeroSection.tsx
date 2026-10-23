import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ArrowUpRight, MessageCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { content } = useContent();

  const directWhatsAppUrl = buildWhatsAppUrl(
    content.contact.whatsappNumber,
    content.contact.defaultMessage[language]
  );

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:py-24 lg:py-28 bg-[#080808]">
      {/* Background radial gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Column (Col 7) */}
          <div className="lg:col-span-7 space-y-8 text-left rtl:text-right">
            
            {/* Trust Kicker / Subtitle (Clean unboxed metadata) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>{content.heroBadge[language]}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              {content.heroHeadline[language]}
            </h1>

            {/* Subheadline prose */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {content.heroSubheadline[language]}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-[#D4AF37] via-[#DFBA4E] to-[#B8860B] text-black hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20 whitespace-nowrap"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </a>

              {/* Secondary CTA */}
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-md border border-white/20 bg-white/5 text-slate-200 hover:border-[#D4AF37]/60 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ChevronDown className="w-4 h-4" />
              </a>

              {/* Direct WhatsApp Quick Contact */}
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium rounded-md border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-400 transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.chatWhatsApp}</span>
              </a>
            </div>

            {/* Key Quality Indicators Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.hero.metric1Label}</div>
                <div className="text-base sm:text-xl font-bold text-white tracking-wide mt-0.5">{t.hero.metric1Val}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.hero.metric2Label}</div>
                <div className="text-base sm:text-xl font-bold text-[#F3E5AB] tracking-wide mt-0.5">{t.hero.metric2Val}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.hero.metric3Label}</div>
                <div className="text-base sm:text-xl font-bold text-white tracking-wide mt-0.5">{t.hero.metric3Val}</div>
              </div>
            </div>

          </div>

          {/* Media Column (Col 5) with supplied real portrait of Omar */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] shadow-2xl">
              
              {/* Actual real photo of Omar */}
              <img
                src={content.heroPortraitUrl}
                alt="Coach Omar Elgafary"
                className="w-full h-full object-cover object-top"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

              {/* Corner Watermark / Brand Accent */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-white/10 pt-4 bg-[#080808]/70 backdrop-blur-sm rounded-lg px-4 py-3">
                <div>
                  <div className="text-sm font-bold text-white tracking-wide">Coach Omar Elgafary</div>
                  <div className="text-xs text-[#D4AF37] font-medium">Certified Online Fitness Coach</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Coach</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
