const SavedTemplate = require('../models/SavedTemplate');
const { getIsConnected } = require('../config/db');

const memoryTemplates = [];

// @desc    Get all saved templates for logged in user
// @route   GET /api/saved-templates
// @access  Private
exports.getSavedTemplates = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { sort } = req.query;

    if (getIsConnected()) {
      let sortOption = { createdAt: -1 };
      if (sort === 'title') {
        sortOption = { title: 1 };
      }
      const templates = await SavedTemplate.find({ userId }).sort(sortOption);
      return res.status(200).json({ success: true, count: templates.length, data: templates });
    } else {
      let userItems = memoryTemplates.filter((t) => t.userId === userId);
      if (sort === 'title') {
        userItems.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        userItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      return res.status(200).json({ success: true, count: userItems.length, data: userItems });
    }
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

    if (getIsConnected()) {
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
    } else {
      const exists = memoryTemplates.some(
        (t) => t.userId === userId && t.title.toLowerCase() === title.toLowerCase()
      );
      if (exists) {
        return res.status(400).json({ success: false, message: 'This template is already in your saved list.' });
      }

      const newId = 'tmpl_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const newTemplate = {
        _id: newId,
        id: newId,
        userId,
        title,
        category: category || '',
        img: img || '',
        link: link || '',
        createdAt: new Date().toISOString(),
      };

      memoryTemplates.push(newTemplate);
      return res.status(201).json({ success: true, data: newTemplate });
    }
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

    if (getIsConnected()) {
      const template = await SavedTemplate.findOneAndDelete({ _id: id, userId });
      if (!template) {
        return res.status(404).json({ success: false, message: 'Template not found or unauthorized.' });
      }
      return res.status(200).json({ success: true, message: 'Template deleted.' });
    } else {
      const index = memoryTemplates.findIndex((t) => (t._id === id || t.id === id) && t.userId === userId);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Template not found or unauthorized.' });
      }
      memoryTemplates.splice(index, 1);
      return res.status(200).json({ success: true, message: 'Template deleted.' });
    }
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

    if (getIsConnected()) {
      await SavedTemplate.deleteMany({ userId });
      return res.status(200).json({ success: true, message: 'All templates cleared.' });
    } else {
      for (let i = memoryTemplates.length - 1; i >= 0; i--) {
        if (memoryTemplates[i].userId === userId) {
          memoryTemplates.splice(i, 1);
        }
      }
      return res.status(200).json({ success: true, message: 'All templates cleared.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error clearing templates', error: error.message });
  }
};
