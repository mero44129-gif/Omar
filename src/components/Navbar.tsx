import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onAdminClick?: () => void;
  isAdminView?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminClick, isAdminView }) => {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { content } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#transformations', label: t.nav.transformations },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080808]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="/"
          className="group flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#121212] text-[#D4AF37] font-bold text-sm tracking-widest shadow-inner">
            OE
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#F3E5AB] transition-colors">
            {content.brandName}
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Language Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md border border-white/10 bg-[#141414] text-slate-200 hover:border-[#D4AF37]/50 hover:text-white transition-all whitespace-nowrap"
            title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className={language !== 'ar' ? 'font-arabic text-sm' : ''}>
              {language === 'ar' ? 'EN' : 'العربية'}
            </span>
          </button>

          {/* Admin link button if in admin mode or switch */}
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className={`hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-md border transition-all whitespace-nowrap ${
                isAdminView
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#F3E5AB]'
                  : 'border-white/10 bg-[#141414] text-slate-300 hover:text-white hover:border-white/30'
              }`}
            >
              <span>{isAdminView ? (language === 'ar' ? 'الموقع العام' : 'Public Site') : t.nav.admin}</span>
            </button>
          )}

          {/* Primary CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/10 whitespace-nowrap shrink-0"
          >
            <span>{t.nav.cta}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md border border-white/10 bg-[#141414]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d0d0d] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-[#D4AF37] py-1 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            {onAdminClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminClick();
                }}
                className="text-left py-2 text-sm text-[#D4AF37] font-semibold"
              >
                {isAdminView ? (language === 'ar' ? 'الموقع العام' : 'Public Site') : t.nav.admin}
              </button>
            )}
          </nav>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 py-3 text-center text-xs font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
