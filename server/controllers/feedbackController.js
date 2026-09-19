const Feedback = require('../models/Feedback');
const { getIsConnected } = require('../config/db');

const memoryFeedbacks = [
  {
    _id: 'fb_default_1',
    id: 'fb_default_1',
    name: 'A Happy User 😊',
    rating: 5,
    comments: "HappyInvite made my friend's birthday so special. Loved the templates!",
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
];

// @desc    Submit feedback rating & comments
// @route   POST /api/feedback
// @access  Public
exports.submitFeedback = async (req, res) => {
  try {
    const { name, rating, comments } = req.body;
    const userId = req.user ? (req.user.id || req.user._id) : null;

    if (!name || !rating) {
      return res.status(400).json({ success: false, message: 'Please provide your name and rating.' });
    }

    if (getIsConnected()) {
      const feedback = await Feedback.create({
        userId,
        name,
        rating: Number(rating),
        comments: comments || '',
        isApproved: true,
      });
      return res.status(201).json({ success: true, message: 'Thanks for your feedback! 💖', data: feedback });
    } else {
      const newId = 'fb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const newFeedback = {
        _id: newId,
        id: newId,
        userId,
        name,
        rating: Number(rating),
        comments: comments || '',
        isApproved: true,
        createdAt: new Date().toISOString(),
      };
      memoryFeedbacks.unshift(newFeedback);
      return res.status(201).json({ success: true, message: 'Thanks for your feedback! 💖', data: newFeedback });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting feedback', error: error.message });
  }
};

// @desc    Get approved testimonials for landing page / feedback page
// @route   GET /api/feedback/testimonials
// @access  Public
exports.getTestimonials = async (req, res) => {
  try {
    if (getIsConnected()) {
      const testimonials = await Feedback.find({ isApproved: true }).sort({ createdAt: -1 }).limit(10);
      return res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
    } else {
      const testimonials = memoryFeedbacks.filter((f) => f.isApproved);
      return res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching testimonials', error: error.message });
  }
};
