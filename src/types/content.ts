export type Language = 'en' | 'ar';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface ServiceItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  features: {
    en: string[];
    ar: string[];
  };
  imageUrl: string;
  published: boolean;
  showPrice: boolean;
  price?: BilingualText;
  whatsappPrefill?: BilingualText;
  order: number;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: BilingualText;
  timeframe?: BilingualText;
  published: boolean;
  order: number;
}

export interface SocialLinks {
  youtube: string;
  tiktok: string;
  linkedin: string;
  instagram: string;
  facebook: string;
}

export interface ContactConfig {
  whatsappNumber: string;
  defaultMessage: BilingualText;
  email: string;
  availabilityNote: BilingualText;
}

export interface SiteContent {
  brandName: string;
  heroBadge: BilingualText;
  heroHeadline: BilingualText;
  heroSubheadline: BilingualText;
  heroPortraitUrl: string;
  brandPosterUrl: string;
  bioHeading: BilingualText;
  bioBody: BilingualText;
  coachingPrinciples: {
    id: string;
    title: BilingualText;
    description: BilingualText;
  }[];
  services: ServiceItem[];
  gallery: GalleryItem[];
  socials: SocialLinks;
  contact: ContactConfig;
  footerNotice: BilingualText;
  disclaimer: BilingualText;
  privacyNotice: BilingualText;
}

export interface InquiryFormState {
  fullName: string;
  phoneNumber: string;
  email?: string;
  serviceId: string;
  fitnessGoal: string;
  fitnessLevel: string;
  notes: string;
}
