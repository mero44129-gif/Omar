import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { buildWhatsAppUrl, buildInquiryMessage } from '../utils/whatsapp';
import { ServiceItem } from '../types/content';
import { MessageCircle, Send, Copy, Check, Sparkles, Clock, PhoneCall } from 'lucide-react';

interface ContactSectionProps {
  selectedService?: ServiceItem | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedService }) => {
  const { language, t, isRTL } = useLanguage();
  const { content } = useContent();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  // Sync selectedService prop if passed from ServicesSection
  useEffect(() => {
    if (selectedService) {
      setServiceId(selectedService.id);
    }
  }, [selectedService]);

  const currentService = content.services.find((s) => s.id === serviceId);
  const serviceTitle = currentService ? currentService.title[language] : '';

  // Generate live pre-filled message
  const generatedMessage = buildInquiryMessage({
    language,
    fullName,
    serviceTitle,
    fitnessGoal,
    fitnessLevel,
    customNotes: notes
  });

  const whatsAppUrl = buildWhatsAppUrl(content.contact.whatsappNumber, generatedMessage);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitFeedback(null);

    // Save lead to persistent storage in background
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName || 'Anonymous Visitor',
          phoneNumber: phoneNumber || content.contact.whatsappNumber,
          serviceId: serviceId || 'general-inquiry',
          fitnessGoal,
          fitnessLevel,
          notes
        })
      });
    } catch (err) {
      console.warn('Silent inquiry save skipped:', err);
    } finally {
      setIsSubmitting(false);
      // Open WhatsApp directly
      window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
      setSubmitFeedback(
        language === 'ar'
          ? 'جاري فتح محادثة الواتساب مع كوتش عمر...'
          : 'Opening WhatsApp chat with Coach Omar...'
      );
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left rtl:text-right">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            {t.contact.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.contact.heading}
          </h2>
          <p className="text-base text-slate-300">
            {t.contact.subheading}
          </p>
        </div>

        {/* 2-Column Split: Direct Contact Card + Interactive WhatsApp Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Confirmed WhatsApp Card & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Confirmed WhatsApp Callout Box */}
            <div className="p-6 sm:p-8 rounded-xl border border-emerald-500/30 bg-gradient-to-b from-[#102018] to-[#0c1410] space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                    {t.contact.whatsAppNumber}
                  </div>
                  <div className="text-2xl font-bold font-mono tracking-tight text-white mt-0.5" dir="ltr">
                    {content.contact.whatsappNumber}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {content.contact.availabilityNote[language]}
              </p>

              <a
                href={buildWhatsAppUrl(content.contact.whatsappNumber, content.contact.defaultMessage[language])}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.contact.openWhatsAppNow}</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="p-6 rounded-xl border border-white/5 bg-[#121212] space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {language === 'ar' ? 'استجابة سريعة ومباشرة' : 'Direct Coach Communication'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {language === 'ar'
                      ? 'جميع المحادثات تتم مباشرة مع كوتش عمر دون وسطاء.'
                      : 'All inquiries and consultations are answered personally by Coach Omar.'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <PhoneCall className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {language === 'ar' ? 'استشارة أولية مجانية' : 'Complimentary Assessment'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {language === 'ar'
                      ? 'نناقش هدفك الحالي ونحدد البرنامج الأنسب قبل سداد أي رسوم.'
                      : 'Discuss your goals and identify the ideal program fit before enrolling.'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Interactive WhatsApp Builder & Live Preview */}
          <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#121212] p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t.contact.builderTitle}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t.contact.builderSubtitle}
                </p>
              </div>
            </div>

            <form onSubmit={handleSendAndSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.yourName}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                {/* Target Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.selectService}
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="">{t.contact.chooseService}</option>
                    {content.services
                      .filter((s) => s.published)
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title[language]}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Goal */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.goal}
                  </label>
                  <input
                    type="text"
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    placeholder={t.contact.goalPlaceholder}
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.level}
                  </label>
                  <select
                    value={fitnessLevel}
                    onChange={(e) => setFitnessLevel(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="">{language === 'ar' ? 'حدد مستواك...' : 'Select level...'}</option>
                    <option value={language === 'ar' ? 'مبتدئ' : 'Beginner'}>{t.contact.levelBeginner}</option>
                    <option value={language === 'ar' ? 'متوسط' : 'Intermediate'}>{t.contact.levelIntermediate}</option>
                    <option value={language === 'ar' ? 'متقدم' : 'Advanced'}>{t.contact.levelAdvanced}</option>
                  </select>
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.contact.notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.contact.notesPlaceholder}
                  className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Live Preview Box */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-semibold text-[#D4AF37]">{t.contact.livePreview}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{t.contact.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.contact.copyMessage}</span>
                      </>
                    )}
                  </button>
                </div>
                <div
                  className="p-3.5 rounded-lg border border-white/10 bg-[#0d0d0d] font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {generatedMessage}
                </div>
              </div>

              {/* Submit / Open WhatsApp Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-gradient-to-r from-[#D4AF37] via-[#E2BE50] to-[#B8860B] text-black font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/10"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.sendWhatsAppDirect}</span>
                </button>
                {submitFeedback && (
                  <p className="text-xs text-emerald-400 text-center mt-2 font-medium">
                    {submitFeedback}
                  </p>
                )}
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
