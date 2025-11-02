import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';

// Import routes
import authRoutes from './routes/auth.js';
import searchRoutes from './routes/search.js';
import historyRoutes from './routes/history.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';

(async () => {
  await import('./config/passport.js');
})();

const app = express();
app.set('trust proxy', 1);

console.log('PORT:', process.env.PORT);


// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET|| 'dummy-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection - using dummy URL, replace with your actual URL
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', searchRoutes);
app.use('/api', historyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
