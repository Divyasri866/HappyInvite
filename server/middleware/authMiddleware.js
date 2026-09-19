const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { memoryUsers } = require('../controllers/authController');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (getIsConnected()) {
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists.',
        });
      }
    } else {
      const user = memoryUsers.find((u) => u.id === decoded.id || u._id === decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists.',
        });
      }
      req.user = { id: user.id, _id: user.id, name: user.name, email: user.email };
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Invalid or expired token.',
    });
  }
};

module.exports = { protect };
