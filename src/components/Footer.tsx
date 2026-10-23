import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Youtube, Linkedin, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const { language, t } = useLanguage();
  const { content } = useContent();

  return (
    <footer className="border-t border-white/10 bg-[#060606] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#121212] text-[#D4AF37] font-bold text-xs tracking-wider">
                OE
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                {content.brandName}
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {content.footerNotice[language]}
            </p>

            <div className="text-[11px] text-[#D4AF37] font-medium pt-1">
              {t.footer.onlineOnly}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {content.socials.youtube && (
                <a
                  href={content.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {content.socials.tiktok && (
                <a
                  href={content.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="TikTok Account"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              )}
              {content.socials.linkedin && (
                <a
                  href={content.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-white transition-colors">
                  {t.nav.transformations}
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">
                  {t.nav.education}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimers & Privacy Notice (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.footer.legalDisclaimer}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {content.disclaimer[language]}
            </p>

            <div className="pt-2 text-[11px] text-slate-500 leading-relaxed border-t border-white/5">
              <span className="font-semibold text-slate-400">{t.footer.privacyNotice}: </span>
              {content.privacyNotice[language]}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {content.brandName}. {t.footer.rights}
          </div>

          <div className="flex items-center gap-4">
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="flex items-center gap-1.5 text-slate-400 hover:text-[#D4AF37] transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>{t.nav.admin}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
