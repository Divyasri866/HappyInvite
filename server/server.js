const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Enable CORS for frontend clients (Vercel, Localhost, etc.)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/saved-templates', require('./routes/templateRoutes'));
app.use('/api/invitations', require('./routes/invitationRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

// Health Check API
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.status(200).json({
    status: 'ok',
    message: 'HappyInvite Backend API Server Running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas first, then listen for incoming connections
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 HappyInvite Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}).catch(err => {
  console.error("❌ Failed to start server due to MongoDB connection failure:", err.message);
});

module.exports = app;