# Coach Omar Elgafary · Premium Bilingual Fitness Coaching Platform

Official production-grade bilingual (Arabic / English) fitness coaching web application for **Coach Omar Elgafary**.

## 🌟 Overview & Architecture

- **Brand**: Coach Omar Elgafary (OE Monogram)
- **Visual Identity**: Luxury athletic aesthetic with deep black backgrounds (`#080808`), metallic gold accents (`#D4AF37`), sharp typography, and high-impact visual presentation.
- **Bilingual System**: Full English (LTR) and Arabic (RTL) experience with persistent language preference storage and synchronized typography (`Cairo` for Arabic, `Plus Jakarta Sans` & `Oswald` for English).
- **Core Sections**:
  1. **Hero**: High-impact introduction, supplied portrait of Coach Omar, dual CTAs, and direct WhatsApp contact.
  2. **About**: Verified coaching biography, core principles (Science-Based Programming, Sustainable Nutrition, 1-on-1 Mentorship), and official brand poster.
  3. **Services**: 4 tailored programs with image showcases, feature breakdowns, price visibility toggles, and direct WhatsApp inquiry buttons.
  4. **Transformation Gallery**: Verified before-and-after progression showcase with full-screen Lightbox modal, un-altered photographs, and progression captions.
  5. **Educational & Social Hub**: Direct verified links to YouTube (`https://youtube.com/@youcanoa`), TikTok (`https://www.tiktok.com/@coach.omarelgafary`), and LinkedIn (`https://www.linkedin.com/in/omar-fathy-782820422`).
  6. **Interactive WhatsApp Booking Builder**: Generates properly formatted, URL-encoded `wa.me/201286758903` links with real-time live preview, service pre-selection, and automated inquiry backup to `/api/inquiries`.
  7. **Footer**: Medical/fitness coaching disclaimer, client confidentiality privacy policy, and online coaching notice.
  8. **Secure Admin Dashboard (`/admin`)**: Protected area to edit all Arabic/English copy, services, gallery photos, WhatsApp numbers, social links, and view leads.

---

## 🚀 Quick Start & Development

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### 3. Unit Tests
Run the deterministic Node unit test suite:
```bash
npx --yes tsx --test src/utils/whatsapp.test.ts
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔐 Admin Authentication & Security Setup

The admin portal is accessible at `http://localhost:3000/#admin` or by clicking the **Admin Portal** button in the header or footer.

### Default Local Administrator Passcode
- **Default password**: `OmarCoach2026!`
- You can override this password at any time by configuring the `ADMIN_PASSWORD` environment variable.

### Production Firebase Authentication Setup Guide
To connect Firebase Authentication and Firestore to your project:

1. **Create Firebase Project**:
   - Visit the [Firebase Console](https://console.firebase.google.com/).
   - Click **Add Project** and name it `coach-omar-fitness`.
   - Enable **Authentication** in the sidebar → Sign-in method → **Email/Password**.
   - Under **Users**, click **Add User** to create Coach Omar's administrator account with his personal email and a strong password.

2. **Configure Web App Credentials**:
   - In Firebase Project Settings, create a Web App to get your configuration keys.
   - Set the following environment variables:
     ```env
     ADMIN_PASSWORD="YourStrongCustomAdminPassword"
     VITE_FIREBASE_API_KEY="AIzaSy..."
     VITE_FIREBASE_AUTH_DOMAIN="coach-omar-fitness.firebaseapp.com"
     VITE_FIREBASE_PROJECT_ID="coach-omar-fitness"
     VITE_FIREBASE_STORAGE_BUCKET="coach-omar-fitness.appspot.com"
     VITE_FIREBASE_MESSAGING_SENDER_ID="..."
     VITE_FIREBASE_APP_ID="..."
     ```

---

## 📁 Data Persistence

All changes made in the Admin Dashboard (editing headlines, adding services, changing gallery captions, uploading images, or updating WhatsApp phone numbers) are persistently written by the server to:
- `data/site-content.json`: Complete website content schema.
- `data/inquiries.json`: Log of client consultation inquiries.
- `public/uploads/`: Uploaded photo files.

---

## 🌐 Deploying to Production (Cloud Run / Vercel / Railway / Render)

1. **Docker / Cloud Run Deployment**:
   The application is fully self-contained with Node.js and Express running on port `3000`. Set `PORT=3000` and `NODE_ENV=production`.
2. **Environment Variables**:
   Configure `ADMIN_PASSWORD` and `APP_URL`.
3. **Domain Connection**:
   Map your custom domain (e.g. `coachomarelgafary.com`) to your deployed hosting service.
