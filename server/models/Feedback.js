const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating (1-5)'],
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
      default: '',
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);
