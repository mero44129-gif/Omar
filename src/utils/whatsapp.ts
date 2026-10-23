import { Language } from '../types/content';

/**
 * Sanitizes phone number by removing spaces, dashes, plus signs, and non-digit characters.
 */
export function cleanPhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^\d]/g, '');
}

/**
 * Generates an encoded WhatsApp link to directly open chat with a prefilled message.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = cleanPhoneNumber(phone);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export interface InquiryParams {
  language: Language;
  fullName?: string;
  serviceTitle?: string;
  fitnessGoal?: string;
  fitnessLevel?: string;
  customNotes?: string;
}

/**
 * Constructs a polite and comprehensive WhatsApp message based on user selections.
 */
export function buildInquiryMessage(params: InquiryParams): string {
  const { language, fullName, serviceTitle, fitnessGoal, fitnessLevel, customNotes } = params;

  if (language === 'ar') {
    let msg = 'مرحباً كوتش عمر،\n';
    if (fullName && fullName.trim()) {
      msg += `اسمي: ${fullName.trim()}\n`;
    }
    if (serviceTitle && serviceTitle.trim()) {
      msg += `أود الاستفسار عن: ${serviceTitle.trim()}\n`;
    } else {
      msg += 'أود الاستفسار عن برامج التدريب الأونلاين.\n';
    }
    if (fitnessGoal && fitnessGoal.trim()) {
      msg += `الهدف البدني: ${fitnessGoal.trim()}\n`;
    }
    if (fitnessLevel && fitnessLevel.trim()) {
      msg += `المستوى الحالي: ${fitnessLevel.trim()}\n`;
    }
    if (customNotes && customNotes.trim()) {
      msg += `ملاحظات إضافية: ${customNotes.trim()}\n`;
    }
    msg += '\nبانتظار تفاصيل الاشتراك وكيفية البدء. شكراً لك!';
    return msg;
  }

  // English
  let msg = 'Hello Coach Omar,\n';
  if (fullName && fullName.trim()) {
    msg += `My name is: ${fullName.trim()}\n`;
  }
  if (serviceTitle && serviceTitle.trim()) {
    msg += `I am interested in inquiring about: ${serviceTitle.trim()}\n`;
  } else {
    msg += 'I would like to inquire about your online coaching programs.\n';
  }
  if (fitnessGoal && fitnessGoal.trim()) {
    msg += `My primary goal: ${fitnessGoal.trim()}\n`;
  }
  if (fitnessLevel && fitnessLevel.trim()) {
    msg += `Current experience level: ${fitnessLevel.trim()}\n`;
  }
  if (customNotes && customNotes.trim()) {
    msg += `Additional details: ${customNotes.trim()}\n`;
  }
  msg += '\nLooking forward to your guidance and subscription details. Thank you!';
  return msg;
}
