const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const searchRoutes = require('./routes/searchRoutes');
const savedRoutes = require('./routes/savedRoutes');
const issueRoutes = require('./routes/issueRoutes');
const chatRoutes = require('./routes/chatRoutes');


const app = express();

app.use(helmet());
app.use(compression());

// Build CORS allowlist: dev localhost + production frontend + Vercel preview URLs
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    // Allow any Vercel preview deploy of this project
    if (origin.includes('.vercel.app')) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Lightweight health check — used by Render & UptimeRobot
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Open Source Matchmaker API',
    version: '1.0.0',
    endpoints: {
      auth: '/auth',
      profile: '/profile',
      recommendations: '/recommend',
      search: '/search',
      saved: '/saved',
      issues: '/issues'
    }
  });
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/recommend', recommendationRoutes);
app.use('/search', searchRoutes);
app.use('/saved', savedRoutes);
app.use('/issues', issueRoutes);
app.use('/chat', chatRoutes);
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', { error: err.message, stack: err.stack });
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
