import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { EducationalSection } from './components/EducationalSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ServiceItem } from './types/content';

function MainLayout() {
  const { isLoading } = useContent();
  const { isRTL } = useLanguage();
  const [isAdminView, setIsAdminView] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/admin' || window.location.hash === '#admin';
    }
    return false;
  });

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Sync route on hashchange or popstate
  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminView(window.location.pathname === '/admin' || window.location.hash === '#admin');
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const toggleAdminView = () => {
    const nextState = !isAdminView;
    setIsAdminView(nextState);
    if (nextState) {
      window.history.pushState(null, '', '#admin');
    } else {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center space-y-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/50 bg-[#121212] text-[#D4AF37] font-bold text-xl shadow-lg">
          OE
        </div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] animate-pulse" />
        </div>
        <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
          Coach Omar Elgafary
        </p>
      </div>
    );
  }

  if (isAdminView) {
    return <AdminDashboard onExitAdmin={toggleAdminView} />;
  }

  return (
    <div className={`min-h-screen bg-[#080808] text-slate-100 flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      <Navbar onAdminClick={toggleAdminView} isAdminView={isAdminView} />
      
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection onSelectService={handleSelectService} />
        <GallerySection />
        <EducationalSection />
        <ContactSection selectedService={selectedService} />
      </main>

      <Footer onAdminClick={toggleAdminView} />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <ContentProvider>
        <LanguageProvider>
          <MainLayout />
        </LanguageProvider>
      </ContentProvider>
    </AdminAuthProvider>
  );
}
