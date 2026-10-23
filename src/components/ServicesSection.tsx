import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, Check, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types/content';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { language, t, isRTL } = useLanguage();
  const { content } = useContent();

  const publishedServices = content.services
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#080808]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left rtl:text-right">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            {t.services.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.services.heading}
          </h2>
          <p className="text-base text-slate-300">
            {t.services.subheading}
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedServices.map((service, idx) => {
            const prefillMsg = service.whatsappPrefill
              ? service.whatsappPrefill[language]
              : `${content.contact.defaultMessage[language]} (${service.title[language]})`;
            const waUrl = buildWhatsAppUrl(content.contact.whatsappNumber, prefillMsg);

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-[#101010] p-6 sm:p-8 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/5"
              >
                <div>
                  {/* Image & Index Banner */}
                  <div className={`relative mb-6 w-full overflow-hidden rounded-lg border border-white/5 bg-[#181818] ${
                    idx === 0 ? 'h-[280px]' : idx === 1 || idx === 2 ? 'h-[350px]' : 'h-52'
                  }`}>
                    <img
                      src={service.imageUrl}
                      alt={service.title[language]}
                      style={
                        idx === 0
                          ? { height: '280px' }
                          : idx === 1 || idx === 2
                          ? { height: '350px' }
                          : undefined
                      }
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
                    
                    {/* Editorial Number */}
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded bg-[#080808]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#D4AF37]">
                      0{idx + 1}
                    </div>

                    {/* Price if enabled */}
                    {service.showPrice && service.price && (
                      <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1 rounded bg-[#D4AF37] text-black text-xs font-bold">
                        {service.price[language]}
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#F3E5AB] transition-colors">
                    {service.title[language]}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description[language]}
                  </p>

                  {/* Inclusions / Features */}
                  {service.features && service.features[language] && service.features[language].length > 0 && (
                    <div className="mb-6 space-y-2.5 pt-4 border-t border-white/5">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        {t.services.includedFeatures}
                      </div>
                      {service.features[language].map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions Block */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  {/* WhatsApp Quick Inquiry Button */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all text-xs font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.services.inquireWhatsApp}</span>
                  </a>

                  {/* Customize & Inquire in Form */}
                  <a
                    href="#contact"
                    onClick={() => onSelectService && onSelectService(service)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors py-2 font-medium"
                  >
                    <span>{language === 'ar' ? 'تخصيص الرسالة' : 'Customize Inquiry'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Discreet Pricing Notice (No fixed public prices by default) */}
        <div className="mt-10 p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400">
          {t.services.priceNotice}
        </div>

      </div>
    </section>
  );
};
