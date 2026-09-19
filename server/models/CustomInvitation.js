const mongoose = require('mongoose');

const CustomInvitationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: null,
    },
    templateType: {
      type: String,
      required: true,
    },
    bgImage: {
      type: String,
      default: '',
    },
    recipientName: {
      type: String,
      default: '',
    },
    eventDate: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '#ff69b4',
    },
    textPositions: {
      type: Object,
      default: {},
    },
    shareToken: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CustomInvitation', CustomInvitationSchema);
