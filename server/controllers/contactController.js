const ContactMessage = require('../models/ContactMessage');
const { getIsConnected } = require('../config/db');

const memoryContacts = [];

// @desc    Submit contact form message
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    if (getIsConnected()) {
      const contact = await ContactMessage.create({ name, email, message });
      return res.status(201).json({ success: true, message: 'Thank you! Your message has been sent.', data: contact });
    } else {
      const newId = 'cnt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const newContact = {
        _id: newId,
        id: newId,
        name,
        email,
        message,
        status: 'unread',
        createdAt: new Date().toISOString(),
      };
      memoryContacts.push(newContact);
      return res.status(201).json({ success: true, message: 'Thank you! Your message has been sent.', data: newContact });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting contact form', error: error.message });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private
exports.getContactMessages = async (req, res) => {
  try {
    if (getIsConnected()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: messages.length, data: messages });
    } else {
      return res.status(200).json({ success: true, count: memoryContacts.length, data: memoryContacts });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact messages', error: error.message });
  }
};
