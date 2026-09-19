const mongoose = require('mongoose');

const SavedTemplateSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a template title'],
      trim: true,
    },
    category: {
      type: String,
      default: '',
      trim: true,
    },
    img: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SavedTemplate', SavedTemplateSchema);
