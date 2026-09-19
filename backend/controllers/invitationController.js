const CustomInvitation = require('../models/CustomInvitation');
const crypto = require('crypto');

// @desc    Create / save a customized invitation design
// @route   POST /api/invitations
// @access  Public (Optional Auth)
exports.createInvitation = async (req, res) => {
  try {
    const { templateType, bgImage, recipientName, eventDate, message, textColor, textPositions } = req.body;
    const userId = req.user ? (req.user.id || req.user._id) : null;
    const shareToken = crypto.randomBytes(8).toString('hex');

    if (!templateType) {
      return res.status(400).json({ success: false, message: 'Please provide template type.' });
    }

    const invitation = await CustomInvitation.create({
      userId,
      templateType,
      bgImage: bgImage || '',
      recipientName: recipientName || '',
      eventDate: eventDate || '',
      message: message || '',
      textColor: textColor || '#ff69b4',
      textPositions: textPositions || {},
      shareToken,
    });
    return res.status(201).json({ success: true, data: invitation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving invitation', error: error.message });
  }
};

// @desc    Get custom invitation by shareToken or ID
// @route   GET /api/invitations/:token
// @access  Public
exports.getInvitation = async (req, res) => {
  try {
    const { token } = req.params;

    const invitation = await CustomInvitation.findOne({
      $or: [{ shareToken: token }, { _id: token }],
    });

    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation design not found.' });
    }

    return res.status(200).json({ success: true, data: invitation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving invitation', error: error.message });
  }
};
