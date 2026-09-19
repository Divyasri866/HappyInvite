const SavedTemplate = require('../models/SavedTemplate');

// @desc    Get all saved templates for logged in user
// @route   GET /api/saved-templates
// @access  Private
exports.getSavedTemplates = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { sort } = req.query;

    let sortOption = { createdAt: -1 };
    if (sort === 'title') {
      sortOption = { title: 1 };
    }

    const templates = await SavedTemplate.find({ userId }).sort(sortOption);
    return res.status(200).json({ success: true, count: templates.length, data: templates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching templates', error: error.message });
  }
};

// @desc    Add a saved template
// @route   POST /api/saved-templates
// @access  Private
exports.addSavedTemplate = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { title, category, img, link } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Please provide a template title.' });
    }

    const exists = await SavedTemplate.findOne({ userId, title: { $regex: new RegExp(`^${title}$`, 'i') } });
    if (exists) {
      return res.status(400).json({ success: false, message: 'This template is already in your saved list.' });
    }

    const template = await SavedTemplate.create({
      userId,
      title,
      category: category || '',
      img: img || '',
      link: link || '',
    });

    return res.status(201).json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving template', error: error.message });
  }
};

// @desc    Delete a saved template by ID
// @route   DELETE /api/saved-templates/:id
// @access  Private
exports.deleteSavedTemplate = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { id } = req.params;

    const template = await SavedTemplate.findOneAndDelete({ _id: id, userId });
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found or unauthorized.' });
    }
    return res.status(200).json({ success: true, message: 'Template deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting template', error: error.message });
  }
};

// @desc    Clear all saved templates for logged in user
// @route   DELETE /api/saved-templates
// @access  Private
exports.clearSavedTemplates = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    await SavedTemplate.deleteMany({ userId });
    return res.status(200).json({ success: true, message: 'All templates cleared.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error clearing templates', error: error.message });
  }
};
