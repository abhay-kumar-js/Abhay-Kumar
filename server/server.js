import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB, getIsConnected } from './config/db.js';
import { initAdminUser } from './utils/dataStore.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import githubRoutes from './routes/githubRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config({ override: true });

export const createApp = async () => {
  // Connect to MongoDB Atlas (if MONGODB_URI set) or initialize in-memory store
  await connectDB();
  await initAdminUser();

  const app = express();

  // Security Middleware (Configured safely for AI Studio preview iframe, PDF downloads, and API security)
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
      crossOriginOpenerPolicy: false,
      frameguard: false,
      ieNoOpen: false, // Ensure downloaded PDF files can be directly opened in browser and PDF readers
    })
  );

  // Dedicated endpoint for serving the authentic CV PDF with full binary integrity and correct headers
  app.get(['/assets/Abhay_Kumar_Web-Dev-CV.pdf', '/api/download-cv'], (req, res) => {
    const candidatePaths = [
      path.resolve(process.cwd(), 'public/assets/Abhay_Kumar_Web-Dev-CV.pdf'),
      path.resolve(process.cwd(), 'dist/assets/Abhay_Kumar_Web-Dev-CV.pdf'),
    ];
    const filePath = candidatePaths.find((p) => fs.existsSync(p));
    if (!filePath) {
      return res.status(404).send('CV PDF not found');
    }

    const stat = fs.statSync(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Accept-Ranges', 'bytes');
    if (req.query.view === '1' || req.query.view === 'inline') {
      res.setHeader('Content-Disposition', 'inline; filename="Abhay_Kumar_Web-Dev-CV.pdf"');
    } else {
      res.setHeader('Content-Disposition', 'attachment; filename="Abhay_Kumar_Web-Dev-CV.pdf"');
    }
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.sendFile(filePath);
  });

  // Ensure iframe embedding in AI Studio preview is never blocked
  app.use((req, res, next) => {
    res.removeHeader('X-Frame-Options');
    next();
  });

  // CORS configuration
  const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
  ].filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or same-origin)
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(null, true);
        }
      },
      credentials: true,
    })
  );

  // Body Parsing & Cookie Parser
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Health check endpoint with database connection status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Abhay Kumar Portfolio API',
      database: {
        connected: getIsConnected(),
        type: getIsConnected() ? 'MongoDB Atlas' : 'Local In-Memory Store',
        dbName: 'abhay_portfolio',
      },
      timestamp: new Date().toISOString(),
    });
  });

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/github', githubRoutes);

  // Catch unhandled /api/* routes
  app.use('/api/*', notFound);

  // API error handling
  app.use(errorHandler);

  return app;
};

// Standalone runner for `cd server && npm run dev`
if (process.env.RUN_STANDALONE === 'true') {
  createApp().then((app) => {
    const port = process.env.PORT || 5000;
    app.use(notFound);
    app.use(errorHandler);
    app.listen(port, () => {
      console.log(`🚀 Backend running standalone on http://localhost:${port}`);
    });
  });
}

export default createApp;
