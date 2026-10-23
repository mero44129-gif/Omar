import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanPhoneNumber, buildWhatsAppUrl, buildInquiryMessage } from './whatsapp.js';

test('cleanPhoneNumber sanitizes international format correctly', () => {
  assert.equal(cleanPhoneNumber('+201286758903'), '201286758903');
  assert.equal(cleanPhoneNumber('+20 128 675 8903'), '201286758903');
  assert.equal(cleanPhoneNumber('0128-675-8903'), '01286758903');
  assert.equal(cleanPhoneNumber(''), '');
});

test('buildWhatsAppUrl creates valid wa.me link with encoded parameter', () => {
  const url = buildWhatsAppUrl('+201286758903', 'Hello Coach Omar');
  assert.equal(url, 'https://wa.me/201286758903?text=Hello%20Coach%20Omar');
});

test('buildInquiryMessage generates correct English message structure', () => {
  const message = buildInquiryMessage({
    language: 'en',
    fullName: 'Ahmed Ali',
    serviceTitle: 'Personalized Nutrition Plans',
    fitnessGoal: 'Fat loss and muscle tone',
    fitnessLevel: 'Intermediate',
    customNotes: 'I train 4 days a week'
  });

  assert.match(message, /Hello Coach Omar/);
  assert.match(message, /My name is: Ahmed Ali/);
  assert.match(message, /Personalized Nutrition Plans/);
  assert.match(message, /Fat loss and muscle tone/);
  assert.match(message, /Intermediate/);
  assert.match(message, /I train 4 days a week/);
});

test('buildInquiryMessage generates correct Arabic message structure', () => {
  const message = buildInquiryMessage({
    language: 'ar',
    fullName: 'أحمد علي',
    serviceTitle: 'خطط تغذية مخصصة',
    fitnessGoal: 'خسارة دهون وبناء عضل',
    fitnessLevel: 'متوسط',
    customNotes: 'أتمرن 4 أيام أسبوعياً'
  });

  assert.match(message, /مرحباً كوتش عمر/);
  assert.match(message, /اسمي: أحمد علي/);
  assert.match(message, /خطط تغذية مخصصة/);
  assert.match(message, /خسارة دهون وبناء عضل/);
});
