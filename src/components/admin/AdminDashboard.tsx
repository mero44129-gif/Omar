import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { SiteContent, ServiceItem, GalleryItem } from '../../types/content';
import {
  Save,
  LogOut,
  Eye,
  Plus,
  Trash2,
  Upload,
  ShieldCheck,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Layers,
  FileText,
  Image as ImageIcon,
  Phone,
  Share2,
  ShieldAlert,
  Inbox,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

interface AdminDashboardProps {
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExitAdmin }) => {
  const { content, updateContent, isSaving, saveSuccess, saveError } = useContent();
  const { isAuthenticated, login, logout, authConfig } = useAdminAuth();
  const { language, t } = useLanguage();

  // Local draft of content being edited
  const [draft, setDraft] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<'general' | 'services' | 'gallery' | 'contact' | 'footer' | 'inquiries' | 'setup'>('general');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Sync draft when server content updates
  useEffect(() => {
    setDraft(content);
  }, [content]);

  // Load inquiries if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('coach_omar_admin_token');
      if (token) {
        fetch('/api/inquiries', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => (res.ok ? res.json() : []))
          .then((data) => setInquiries(data))
          .catch(() => setInquiries([]));
      }
    }
  }, [isAuthenticated, activeTab]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = await login(loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Authentication rejected. Verify credentials.');
    }
  };

  const handleSaveAll = async () => {
    await updateContent(draft);
  };

  // Image Upload helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const token = localStorage.getItem('coach_omar_admin_token');
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            fileData: base64Data,
            fileName: file.name.replace(/\.[^/.]+$/, '')
          })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          targetField(data.url);
        } else {
          alert('Upload failed: ' + (data.error || 'Unknown error'));
        }
      } catch (err) {
        alert('Upload network error');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // If NOT authenticated, show honest Login / Setup Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070707] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full rounded-xl border border-white/10 bg-[#121212] p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/50 bg-[#181818] text-[#D4AF37]">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {t.admin.loginTitle}
            </h1>
            <p className="text-xs text-slate-400">
              {t.admin.loginSubtitle}
            </p>
          </div>

          {/* Honest Setup Status Badge */}
          <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.admin.setupNoticeTitle}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {authConfig?.firebaseConfigured
                ? `Firebase Connected to project: ${authConfig.firebaseProjectId}`
                : t.admin.setupNoticeDesc}
            </p>
            <div className="pt-1 text-[11px] text-slate-400">
              {language === 'ar'
                ? 'كلمة مرور الإدارة الافتراضية للتهيئة: OmarCoach2026! (يمكن تخصيصها عبر ADMIN_PASSWORD)'
                : 'Default configuration passcode: OmarCoach2026! (Customizable via ADMIN_PASSWORD)'}
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'ar' ? 'كلمة مرور المسؤول' : 'Administrator Password'}
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder={t.admin.passwordPlaceholder}
                className="w-full rounded-md border border-white/10 bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-medium">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/10"
            >
              {t.admin.loginButton}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={onExitAdmin}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← {language === 'ar' ? 'العودة للموقع العام' : 'Back to Public Website'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-[#070707] text-slate-200">
      
      {/* Admin Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0c0c0c]/95 backdrop-blur-md px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{content.brandName}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
              Admin Portal
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {t.admin.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Public Preview Button */}
          <button
            onClick={onExitAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.admin.previewSite}</span>
          </button>

          {/* Persistent Save Button */}
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/10 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? t.admin.saving : t.admin.saveChanges}</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-all"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.admin.logoutButton}</span>
          </button>
        </div>
      </header>

      {/* Global Toast Alerts */}
      {saveSuccess && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/30 text-emerald-300 px-6 py-2.5 text-xs text-center font-medium flex items-center justify-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{t.admin.savedSuccess}</span>
        </div>
      )}
      {saveError && (
        <div className="bg-red-950/80 border-b border-red-500/30 text-red-300 px-6 py-2.5 text-xs text-center font-medium">
          {saveError}
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 pb-2 mb-8">
          {[
            { id: 'general', label: t.admin.tabs.general, icon: FileText },
            { id: 'services', label: t.admin.tabs.services, icon: Layers },
            { id: 'gallery', label: t.admin.tabs.gallery, icon: ImageIcon },
            { id: 'contact', label: t.admin.tabs.contact, icon: Phone },
            { id: 'footer', label: t.admin.tabs.footer, icon: ShieldAlert },
            { id: 'inquiries', label: `${t.admin.tabs.inquiries} (${inquiries.length})`, icon: Inbox },
            { id: 'setup', label: t.admin.tabs.setup, icon: KeyRound }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: General & Hero */}
        {activeTab === 'general' && (
          <div className="space-y-8 max-w-4xl">
            <div className="p-6 rounded-xl border border-white/10 bg-[#121212] space-y-6">
              <h2 className="text-base font-bold text-white border-b border-white/5 pb-3">
                {language === 'ar' ? 'العناوين الرئيسية (Hero Section)' : 'Homepage Hero Section'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    English Hero Badge
                  </label>
                  <input
                    type="text"
                    value={draft.heroBadge.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        heroBadge: { ...draft.heroBadge, en: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-arabic" dir="rtl">
                    الشارة باللغة العربية
                  </label>
                  <input
                    type="text"
                    value={draft.heroBadge.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        heroBadge: { ...draft.heroBadge, ar: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-arabic"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    English Headline
                  </label>
                  <textarea
                    rows={3}
                    value={draft.heroHeadline.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        heroHeadline: { ...draft.heroHeadline, en: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-arabic" dir="rtl">
                    العنوان الرئيسي بالعربية
                  </label>
                  <textarea
                    rows={3}
                    value={draft.heroHeadline.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        heroHeadline: { ...draft.heroHeadline, ar: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-arabic"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    English Subheadline
                  </label>
                  <textarea
                    rows={3}
                    value={draft.heroSubheadline.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        heroSubheadline: { ...draft.heroSubheadline, en: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-arabic" dir="rtl">
                    الوصف الفرعي بالعربية
                  </label>
                  <textarea
                    rows={3}
                    value={draft.heroSubheadline.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        heroSubheadline: { ...draft.heroSubheadline, ar: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-arabic"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Portrait Upload / URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Coach Portrait Image Path / URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={draft.heroPortraitUrl}
                    onChange={(e) =>
                      setDraft({ ...draft, heroPortraitUrl: e.target.value })
                    }
                    className="flex-1 rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? t.admin.uploading : t.admin.uploadImage}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setDraft({ ...draft, heroPortraitUrl: url })
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Biography Editor */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#121212] space-y-6">
              <h2 className="text-base font-bold text-white border-b border-white/5 pb-3">
                {language === 'ar' ? 'نبذة كوتش عمر (About Coach Omar)' : 'About Coach Omar & Biography'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    English Bio Heading
                  </label>
                  <input
                    type="text"
                    value={draft.bioHeading.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        bioHeading: { ...draft.bioHeading, en: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-arabic" dir="rtl">
                    عنوان النبذة بالعربية
                  </label>
                  <input
                    type="text"
                    value={draft.bioHeading.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        bioHeading: { ...draft.bioHeading, ar: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-arabic"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    English Biography Text
                  </label>
                  <textarea
                    rows={5}
                    value={draft.bioBody.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        bioBody: { ...draft.bioBody, en: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-arabic" dir="rtl">
                    نص النبذة بالعربية
                  </label>
                  <textarea
                    rows={5}
                    value={draft.bioBody.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        bioBody: { ...draft.bioBody, ar: e.target.value }
                      })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-arabic"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Services */}
        {activeTab === 'services' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {language === 'ar' ? 'إدارة خدمات وبرامج التدريب' : 'Manage Coaching Services'}
              </h2>
              <button
                onClick={() => {
                  const newService: ServiceItem = {
                    id: `service-${Date.now()}`,
                    order: draft.services.length + 1,
                    published: true,
                    showPrice: false,
                    title: { en: 'New Coaching Service', ar: 'خدمة تدريب جديدة' },
                    description: { en: 'Description of service', ar: 'وصف الخدمة' },
                    features: { en: ['Feature 1'], ar: ['ميزة 1'] },
                    imageUrl: '/assets/aistudio/IMG-20260727-WA0085_d075ea65.jpg',
                    whatsappPrefill: { en: 'Inquiring about this service', ar: 'أستفسر عن هذه الخدمة' }
                  };
                  setDraft({ ...draft, services: [...draft.services, newService] });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#D4AF37] text-black text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.admin.addNewService}</span>
              </button>
            </div>

            <div className="space-y-6">
              {draft.services.map((service, index) => (
                <div
                  key={service.id}
                  className="p-6 rounded-xl border border-white/10 bg-[#121212] space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#D4AF37]">#{service.order}</span>
                      <span className="font-bold text-white text-sm">
                        {service.title.en} / {service.title.ar}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Published Toggle */}
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={service.published}
                          onChange={(e) => {
                            const updated = draft.services.map((s) =>
                              s.id === service.id ? { ...s, published: e.target.checked } : s
                            );
                            setDraft({ ...draft, services: updated });
                          }}
                          className="rounded border-white/20 bg-[#181818] text-[#D4AF37] focus:ring-0"
                        />
                        <span>{language === 'ar' ? 'منشور' : 'Published'}</span>
                      </label>

                      {/* Price Visibility Toggle (Requested: hidden by default) */}
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={service.showPrice}
                          onChange={(e) => {
                            const updated = draft.services.map((s) =>
                              s.id === service.id ? { ...s, showPrice: e.target.checked } : s
                            );
                            setDraft({ ...draft, services: updated });
                          }}
                          className="rounded border-white/20 bg-[#181818] text-[#D4AF37] focus:ring-0"
                        />
                        <span>{language === 'ar' ? 'إظهار السعر علناً' : 'Show Public Price'}</span>
                      </label>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm('Delete this service?')) {
                            setDraft({
                              ...draft,
                              services: draft.services.filter((s) => s.id !== service.id)
                            });
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bilingual Titles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Title (EN)</label>
                      <input
                        type="text"
                        value={service.title.en}
                        onChange={(e) => {
                          const updated = draft.services.map((s) =>
                            s.id === service.id ? { ...s, title: { ...s.title, en: e.target.value } } : s
                          );
                          setDraft({ ...draft, services: updated });
                        }}
                        className="w-full rounded border border-white/10 bg-[#181818] px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">العنوان (AR)</label>
                      <input
                        type="text"
                        value={service.title.ar}
                        onChange={(e) => {
                          const updated = draft.services.map((s) =>
                            s.id === service.id ? { ...s, title: { ...s.title, ar: e.target.value } } : s
                          );
                          setDraft({ ...draft, services: updated });
                        }}
                        className="w-full rounded border border-white/10 bg-[#181818] px-3 py-1.5 text-xs text-white"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Bilingual Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Description (EN)</label>
                      <textarea
                        rows={2}
                        value={service.description.en}
                        onChange={(e) => {
                          const updated = draft.services.map((s) =>
                            s.id === service.id ? { ...s, description: { ...s.description, en: e.target.value } } : s
                          );
                          setDraft({ ...draft, services: updated });
                        }}
                        className="w-full rounded border border-white/10 bg-[#181818] px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">الوصف (AR)</label>
                      <textarea
                        rows={2}
                        value={service.description.ar}
                        onChange={(e) => {
                          const updated = draft.services.map((s) =>
                            s.id === service.id ? { ...s, description: { ...s.description, ar: e.target.value } } : s
                          );
                          setDraft({ ...draft, services: updated });
                        }}
                        className="w-full rounded border border-white/10 bg-[#181818] px-3 py-1.5 text-xs text-white"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Image Path */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Image URL or Local Path</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={service.imageUrl}
                        onChange={(e) => {
                          const updated = draft.services.map((s) =>
                            s.id === service.id ? { ...s, imageUrl: e.target.value } : s
                          );
                          setDraft({ ...draft, services: updated });
                        }}
                        className="flex-1 rounded border border-white/10 bg-[#181818] px-3 py-1.5 text-xs text-white font-mono"
                      />
                      <label className="cursor-pointer px-3 py-1.5 rounded border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => {
                              const updated = draft.services.map((s) =>
                                s.id === service.id ? { ...s, imageUrl: url } : s
                              );
                              setDraft({ ...draft, services: updated });
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Transformations Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {language === 'ar' ? 'إدارة صور التحولات الموثقة' : 'Manage Transformation Gallery'}
              </h2>
              <button
                onClick={() => {
                  const newItem: GalleryItem = {
                    id: `trans-${Date.now()}`,
                    imageUrl: '/assets/aistudio/IMG-20261023-WA0058_1__bc94969b.jpg',
                    caption: { en: 'Client progress update', ar: 'تطور المشترك' },
                    timeframe: { en: '12 Weeks Progression', ar: 'تطور خلال 12 أسبوع' },
                    published: true,
                    order: draft.gallery.length + 1
                  };
                  setDraft({ ...draft, gallery: [...draft.gallery, newItem] });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#D4AF37] text-black text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.admin.addNewGalleryItem}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {draft.gallery.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl border border-white/10 bg-[#121212] space-y-4"
                >
                  <div className="relative aspect-[3/4] max-h-56 w-full rounded bg-black overflow-hidden border border-white/5 flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt="Gallery item preview"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={item.published}
                        onChange={(e) => {
                          const updated = draft.gallery.map((g) =>
                            g.id === item.id ? { ...g, published: e.target.checked } : g
                          );
                          setDraft({ ...draft, gallery: updated });
                        }}
                        className="rounded border-white/20 bg-[#181818] text-[#D4AF37]"
                      />
                      <span>{language === 'ar' ? 'منشور في المعرض' : 'Published in Gallery'}</span>
                    </label>

                    <button
                      onClick={() => {
                        if (confirm('Remove this photo?')) {
                          setDraft({
                            ...draft,
                            gallery: draft.gallery.filter((g) => g.id !== item.id)
                          });
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t.admin.deleteItem}</span>
                    </button>
                  </div>

                  {/* Image upload / replace */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Photo URL / File</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.imageUrl}
                        onChange={(e) => {
                          const updated = draft.gallery.map((g) =>
                            g.id === item.id ? { ...g, imageUrl: e.target.value } : g
                          );
                          setDraft({ ...draft, gallery: updated });
                        }}
                        className="flex-1 rounded border border-white/10 bg-[#181818] px-2.5 py-1 text-xs text-white font-mono"
                      />
                      <label className="cursor-pointer px-2.5 py-1 rounded border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10">
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => {
                              const updated = draft.gallery.map((g) =>
                                g.id === item.id ? { ...g, imageUrl: url } : g
                              );
                              setDraft({ ...draft, gallery: updated });
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  {/* Caption EN / AR */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-0.5">Caption (EN)</label>
                      <input
                        type="text"
                        value={item.caption?.en || ''}
                        onChange={(e) => {
                          const updated = draft.gallery.map((g) =>
                            g.id === item.id
                              ? {
                                  ...g,
                                  caption: {
                                    en: e.target.value,
                                    ar: g.caption?.ar || ''
                                  }
                                }
                              : g
                          );
                          setDraft({ ...draft, gallery: updated });
                        }}
                        className="w-full rounded border border-white/10 bg-[#181818] px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-0.5">الوصف (AR)</label>
                      <input
                        type="text"
                        value={item.caption?.ar || ''}
                        onChange={(e) => {
                          const updated = draft.gallery.map((g) =>
                            g.id === item.id
                              ? {
                                  ...g,
                                  caption: {
                                    en: g.caption?.en || '',
                                    ar: e.target.value
                                  }
                                }
                              : g
                          );
                          setDraft({ ...draft, gallery: updated });
                        }}
                        className="w-full rounded border border-white/10 bg-[#181818] px-2 py-1 text-xs text-white"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Contact & WhatsApp & Socials */}
        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-6 rounded-xl border border-white/10 bg-[#121212] space-y-6">
              <h2 className="text-base font-bold text-white border-b border-white/5 pb-3">
                {language === 'ar' ? 'إعدادات الواتساب والتواصل' : 'WhatsApp & Direct Booking Configuration'}
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirmed WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  value={draft.contact.whatsappNumber}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: { ...draft.contact, whatsappNumber: e.target.value }
                    })
                  }
                  className="w-full max-w-md rounded border border-white/10 bg-[#181818] px-3.5 py-2 text-sm text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Default Inquiry Message (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={draft.contact.defaultMessage.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: {
                          ...draft.contact,
                          defaultMessage: { ...draft.contact.defaultMessage, en: e.target.value }
                        }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3.5 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    الرسالة الافتراضية (AR)
                  </label>
                  <textarea
                    rows={3}
                    value={draft.contact.defaultMessage.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: {
                          ...draft.contact,
                          defaultMessage: { ...draft.contact.defaultMessage, ar: e.target.value }
                        }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3.5 py-2 text-xs text-white"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#121212] space-y-4">
              <h2 className="text-base font-bold text-white border-b border-white/5 pb-3">
                {language === 'ar' ? 'الروابط والمنصات الرسمية' : 'Verified Social Media URLs'}
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">YouTube URL</label>
                  <input
                    type="url"
                    value={draft.socials.youtube}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        socials: { ...draft.socials, youtube: e.target.value }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">TikTok URL</label>
                  <input
                    type="url"
                    value={draft.socials.tiktok}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        socials: { ...draft.socials, tiktok: e.target.value }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={draft.socials.linkedin}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        socials: { ...draft.socials, linkedin: e.target.value }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Footer & Legal */}
        {activeTab === 'footer' && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-6 rounded-xl border border-white/10 bg-[#121212] space-y-6">
              <h2 className="text-base font-bold text-white border-b border-white/5 pb-3">
                {language === 'ar' ? 'إخلاء المسؤولية وسياسة الخصوصية' : 'Legal Disclaimer & Privacy Notice'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Medical & Coaching Disclaimer (EN)
                  </label>
                  <textarea
                    rows={4}
                    value={draft.disclaimer.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        disclaimer: { ...draft.disclaimer, en: e.target.value }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    إخلاء المسؤولية الطبي والرياضي (AR)
                  </label>
                  <textarea
                    rows={4}
                    value={draft.disclaimer.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        disclaimer: { ...draft.disclaimer, ar: e.target.value }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3 py-2 text-xs text-white"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Client Confidentiality Policy (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={draft.privacyNotice.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        privacyNotice: { ...draft.privacyNotice, en: e.target.value }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ميثاق خصوصية المشتركين (AR)
                  </label>
                  <textarea
                    rows={3}
                    value={draft.privacyNotice.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        privacyNotice: { ...draft.privacyNotice, ar: e.target.value }
                      })
                    }
                    className="w-full rounded border border-white/10 bg-[#181818] px-3 py-2 text-xs text-white"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-base font-bold text-white">
              {language === 'ar' ? 'سجل طلبات الاشتراك والاستفسارات' : 'Received Client Inquiries'}
            </h2>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-white/5 bg-[#121212] text-slate-400 text-xs">
                No inquiries recorded yet. When trainees use the WhatsApp builder or form, leads will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq: any) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-xl border border-white/10 bg-[#121212] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{inq.fullName}</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-slate-300">
                      <span className="text-slate-400">Phone: </span>
                      <span className="font-mono text-[#D4AF37]">{inq.phoneNumber}</span>
                    </div>
                    {inq.serviceId && (
                      <div className="text-slate-300">
                        <span className="text-slate-400">Service: </span>
                        <span>{inq.serviceId}</span>
                      </div>
                    )}
                    {inq.fitnessGoal && (
                      <div className="text-slate-300">
                        <span className="text-slate-400">Goal: </span>
                        <span>{inq.fitnessGoal}</span>
                      </div>
                    )}
                    {inq.notes && (
                      <div className="text-slate-400 bg-black/40 p-2.5 rounded border border-white/5">
                        "{inq.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: Firebase Setup & Handover Guide */}
        {activeTab === 'setup' && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-4">
              <h2 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Coach Omar Elgafary · Deployment & Firebase Handover Guide</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                This project has been engineered so Coach Omar can easily take complete ownership, connect his personal Firebase console, and configure production-grade authentication with email and password.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-[#121212] space-y-4 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-white">1. Creating Your Firebase Project</h3>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-slate-300">
                <li>Go to <strong className="text-white">https://console.firebase.google.com/</strong> and sign in with your Google account.</li>
                <li>Click <strong>Add Project</strong> and name it <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#D4AF37]">coach-omar-fitness</code>.</li>
                <li>In the project dashboard, navigate to <strong>Build → Authentication</strong>, click <strong>Get Started</strong>, and enable the <strong>Email/Password</strong> sign-in method.</li>
                <li>Go to <strong>Project Settings</strong> (gear icon) → <strong>General</strong> → <strong>Your apps</strong> → Add a Web App (<code className="bg-white/10 px-1 rounded">&lt;/&gt;</code>).</li>
              </ol>

              <h3 className="text-sm font-bold text-white pt-2">2. Setting Environment Variables</h3>
              <p>Add these keys into your hosting environment (Cloud Run, Vercel, or local <code className="text-[#D4AF37]">.env</code>):</p>
              <pre className="bg-[#090909] p-4 rounded-lg border border-white/10 font-mono text-[11px] text-[#F3E5AB] overflow-x-auto">
{`ADMIN_PASSWORD="YourSecurePasswordHere!"
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="coach-omar-fitness.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="coach-omar-fitness"
VITE_FIREBASE_STORAGE_BUCKET="coach-omar-fitness.appspot.com"`}
              </pre>

              <h3 className="text-sm font-bold text-white pt-2">3. Creating the Owner's First Admin Account</h3>
              <p>
                In the Firebase Console under <strong>Authentication → Users</strong>, click <strong>Add user</strong>, enter Coach Omar's email and a secure password. Once saved, those credentials are immediately live!
              </p>

              <h3 className="text-sm font-bold text-white pt-2">4. Current Persistence</h3>
              <p>
                In the current deployment, website edits are persisted to <code className="text-[#D4AF37]">data/site-content.json</code> on the server with authentication token gating. Every change made in this portal remains saved across server restarts.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
