import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { initDB } from './config/db.js';
import { seedDestinations } from './seed.js';

import authRoutes from './routes/auth.js';
import destinationsRoutes from './routes/destinations.js';
import tripsRoutes from './routes/trips.js';
import plannerRoutes from './routes/planner.js';
import contactRoutes from './routes/contact.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', app: 'TravelMate AI Backend', timestamp: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Initialize DB and start server
const startServer = async () => {
  try {
    await initDB();
    await seedDestinations();

    app.listen(PORT, () => {
      console.log(`🚀 TravelMate AI Backend server is running on http://localhost:${PORT}`);
      console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
