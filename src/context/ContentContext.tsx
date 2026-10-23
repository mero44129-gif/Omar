import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from '../types/content';
import { defaultSiteContent } from '../data/defaultContent';
import { useAdminAuth } from './AdminAuthContext';

interface ContentContextType {
  content: SiteContent;
  isLoading: boolean;
  isSaving: boolean;
  saveError: string | null;
  saveSuccess: boolean;
  updateContent: (updated: SiteContent) => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { token } = useAdminAuth();

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      } else {
        setContent(defaultSiteContent);
      }
    } catch (err) {
      console.warn('Using default content fallback:', err);
      setContent(defaultSiteContent);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateContent = async (updated: SiteContent): Promise<boolean> => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers,
        body: JSON.stringify(updated)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setContent(updated);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
        return true;
      } else {
        setSaveError(data.error || 'Failed to update content.');
        return false;
      }
    } catch {
      setSaveError('Network error while saving content to server.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const resetToDefault = async (): Promise<boolean> => {
    return await updateContent(defaultSiteContent);
  };

  const value = {
    content,
    isLoading,
    isSaving,
    saveError,
    saveSuccess,
    updateContent,
    resetToDefault
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
