import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { initAdminUser } from './utils/dataStore.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

export const createApp = async () => {
  // Connect to MongoDB Atlas (if MONGODB_URI set) or initialize in-memory store
  await connectDB();
  await initAdminUser();

  const app = express();

  // Security Middleware
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );

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

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Abhay Kumar Portfolio API',
      timestamp: new Date().toISOString(),
    });
  });

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/settings', settingsRoutes);

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
