const ContactMessage = require('../models/ContactMessage');

// @desc    Submit contact form message
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    const contact = await ContactMessage.create({ name, email, message });
    return res.status(201).json({ success: true, message: 'Thank you! Your message has been sent.', data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting contact form', error: error.message });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact messages', error: error.message });
  }
};
