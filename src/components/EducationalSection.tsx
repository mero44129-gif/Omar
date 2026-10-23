import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Youtube, Linkedin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { content } = useContent();

  const socialChannels = [
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@youcanoa',
      url: content.socials.youtube,
      icon: Youtube,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      description: t.education.youtubeDesc,
      actionLabel: t.education.visitChannel
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@coach.omarelgafary',
      url: content.socials.tiktok,
      // Custom TikTok SVG icon
      icon: () => (
        <svg className="w-5 h-5 fill-current text-[#25F4EE]" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: 'text-[#25F4EE]',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      description: t.education.tiktokDesc,
      actionLabel: t.education.visitChannel
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'omar-fathy-782820422',
      url: content.socials.linkedin,
      icon: Linkedin,
      color: 'text-sky-500',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20',
      description: t.education.linkedinDesc,
      actionLabel: t.education.viewProfile
    }
  ];

  return (
    <section id="education" className="py-20 md:py-28 bg-[#080808]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 text-left rtl:text-right">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            {t.education.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.education.heading}
          </h2>
          <p className="text-base text-slate-300">
            {t.education.subheading}
          </p>
        </div>

        {/* 3 Columns for Verified Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.id}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/10 bg-[#121212] hover:border-[#D4AF37]/40 transition-all hover:shadow-xl hover:shadow-white/[0.02]"
              >
                <div>
                  {/* Channel Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${channel.bgColor} ${channel.borderColor} border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'حساب موثق' : 'Verified'}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {channel.name}
                  </h3>
                  <div className="text-xs font-mono text-[#D4AF37] mb-3">
                    {channel.handle}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {channel.description}
                  </p>
                </div>

                {/* External link action */}
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full py-3 px-4 rounded-md border border-white/10 bg-white/5 text-xs font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <span>{channel.actionLabel}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Verification banner */}
        <div className="mt-8 p-4 rounded-lg border border-white/5 bg-[#101010] flex items-center justify-between flex-wrap gap-4 text-xs text-slate-400">
          <span>{t.education.officialHandles}</span>
          <span className="text-[#D4AF37]">Coach Omar Elgafary · Media Hub</span>
        </div>

      </div>
    </section>
  );
};
