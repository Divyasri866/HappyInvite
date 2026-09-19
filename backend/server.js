const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from server/.env if local
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Enable CORS for Vercel and local clients
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection middleware for Serverless & Express server
let isDbConnecting = null;
const ensureDbConnected = async (req, res, next) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      if (!isDbConnecting) {
        isDbConnecting = connectDB().finally(() => {
          isDbConnecting = null;
        });
      }
      await isDbConnecting;
    }
    next();
  } catch (err) {
    console.error("Database connection error in middleware:", err.message);
    res.status(500).json({ success: false, message: "Database connection failed", error: err.message });
  }
};

// Routes with DB connection middleware
app.use('/api/auth', ensureDbConnected, require('./routes/authRoutes'));
app.use('/api/saved-templates', ensureDbConnected, require('./routes/templateRoutes'));
app.use('/api/invitations', ensureDbConnected, require('./routes/invitationRoutes'));
app.use('/api/contact', ensureDbConnected, require('./routes/contactRoutes'));
app.use('/api/feedback', ensureDbConnected, require('./routes/feedbackRoutes'));

// Health Check API
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.status(200).json({
    status: 'ok',
    message: 'HappyInvite Backend API Server Running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Serve static frontend files when running standalone
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 HappyInvite Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    });
  }).catch(err => {
    console.error("❌ Failed to start server due to MongoDB connection failure:", err.message);
  });
}

module.exports = app;