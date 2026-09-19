const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
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
  res.status(200).json({
    status: 'ok',
    message: 'HappyInvite Backend API Server Running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 HappyInvite Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

module.exports = { app, server };
