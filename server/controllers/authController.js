const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-Memory store fallback when local MongoDB service is offline
const memoryUsers = [];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.',
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: normalizedEmail });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email address.',
        });
      }

      const user = await User.create({
        name,
        email: normalizedEmail,
        password,
      });

      const token = user.getSignedJwtToken();
      return res.status(201).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } else {
      const userExists = memoryUsers.find((u) => u.email === normalizedEmail);
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email address.',
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newId = 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

      const newUser = {
        _id: newId,
        id: newId,
        name,
        email: normalizedEmail,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };

      memoryUsers.push(newUser);
      const token = generateToken(newUser.id);

      return res.status(201).json({
        success: true,
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration.',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getIsConnected()) {
      const user = await User.findOne({ email: normalizedEmail }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect email or password.',
        });
      }

      const token = user.getSignedJwtToken();
      return res.status(200).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } else {
      const user = memoryUsers.find((u) => u.email === normalizedEmail);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect email or password.',
        });
      }

      const token = generateToken(user.id);
      return res.status(200).json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login.',
      error: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.user.id);
      return res.status(200).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt },
      });
    } else {
      const user = memoryUsers.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching user profile.',
      error: error.message,
    });
  }
};

module.exports.memoryUsers = memoryUsers;
