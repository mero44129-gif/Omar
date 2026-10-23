import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { defaultSiteContent } from './src/data/defaultContent.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const CONTENT_FILE = path.resolve(DATA_DIR, 'site-content.json');
const INQUIRIES_FILE = path.resolve(DATA_DIR, 'inquiries.json');
const UPLOADS_DIR = path.resolve(__dirname, 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initialize content file with default verified content if not present
if (!fs.existsSync(CONTENT_FILE)) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultSiteContent, null, 2), 'utf-8');
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Helper to get active admin password (from env or configured fallback)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'OmarCoach2026!';
const ADMIN_TOKEN = 'coach-omar-secure-admin-session-token';

// Auth middleware for administrative operations
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  if (token === ADMIN_TOKEN || token === process.env.ADMIN_SECRET_KEY) {
    return next();
  }

  return res.status(403).json({ error: 'Invalid or expired administrative token.' });
};

// API: Get Site Content
app.get('/api/content', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
      return res.json(JSON.parse(data));
    }
    return res.json(defaultSiteContent);
  } catch (error) {
    console.error('Failed to read site content:', error);
    return res.json(defaultSiteContent);
  }
});

// API: Update Site Content (Protected)
app.put('/api/content', requireAdmin, (req: Request, res: Response) => {
  try {
    const updatedContent = req.body;
    if (!updatedContent || typeof updatedContent !== 'object') {
      return res.status(400).json({ error: 'Invalid content payload.' });
    }

    fs.writeFileSync(CONTENT_FILE, JSON.stringify(updatedContent, null, 2), 'utf-8');
    return res.json({ success: true, message: 'Content updated successfully.', content: updatedContent });
  } catch (error) {
    console.error('Failed to save site content:', error);
    return res.status(500).json({ error: 'Failed to persist content updates.' });
  }
});

// API: Check Auth Configuration Status
app.get('/api/auth-config', (_req: Request, res: Response) => {
  const hasFirebase = Boolean(
    process.env.VITE_FIREBASE_API_KEY ||
    process.env.FIREBASE_API_KEY ||
    process.env.FIREBASE_PROJECT_ID
  );

  return res.json({
    firebaseConfigured: hasFirebase,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || null,
    hasCustomAdminPassword: Boolean(process.env.ADMIN_PASSWORD),
    mode: hasFirebase ? 'firebase' : 'setup-required-or-local'
  });
});

// API: Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  if (password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: {
        name: 'Coach Omar Elgafary',
        role: 'owner',
        email: 'coach.omarelgafary@fitness.com'
      }
    });
  }

  return res.status(401).json({ error: 'Incorrect administrator password.' });
});

// API: Image Upload (Saves base64 images into public/uploads/)
app.post('/api/upload', requireAdmin, (req: Request, res: Response) => {
  try {
    const { fileData, fileName } = req.body;
    if (!fileData) {
      return res.status(400).json({ error: 'fileData (base64) is required.' });
    }

    const matches = fileData.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 image data.' });
    }

    const ext = matches[1].split('/')[1] || 'jpg';
    const cleanExt = ext.replace(/[^a-zA-Z0-9]/g, '');
    const safeName = (fileName || 'image')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueFileName = `${safeName}_${Date.now()}.${cleanExt}`;
    const filePath = path.resolve(UPLOADS_DIR, uniqueFileName);

    const buffer = Buffer.from(matches[2], 'base64');
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;
    return res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Image upload failed:', error);
    return res.status(500).json({ error: 'Failed to process and store uploaded image.' });
  }
});

// API: Save Contact Inquiry
app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const { fullName, phoneNumber, email, serviceId, fitnessGoal, fitnessLevel, notes } = req.body;
    if (!fullName || !phoneNumber) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }

    const newInquiry = {
      id: `inq-${Date.now()}`,
      fullName,
      phoneNumber,
      email: email || '',
      serviceId: serviceId || '',
      fitnessGoal: fitnessGoal || '',
      fitnessLevel: fitnessLevel || '',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    let inquiries = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      try {
        inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
      } catch {
        inquiries = [];
      }
    }
    inquiries.unshift(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries.slice(0, 500), null, 2), 'utf-8');

    return res.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error('Failed to save inquiry:', error);
    return res.status(500).json({ error: 'Failed to save inquiry record.' });
  }
});

// API: Get Inquiries (Admin only)
app.get('/api/inquiries', requireAdmin, (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return res.json(JSON.parse(data));
    }
    return res.json([]);
  } catch (error) {
    console.error('Failed to read inquiries:', error);
    return res.json([]);
  }
});

// Start Express Server with Vite integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Coach Omar Elgafary platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
