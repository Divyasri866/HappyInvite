const express = require('express');
const {
  getSavedTemplates,
  addSavedTemplate,
  deleteSavedTemplate,
  clearSavedTemplates,
} = require('../controllers/templateController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All template routes require authentication

router.route('/')
  .get(getSavedTemplates)
  .post(addSavedTemplate)
  .delete(clearSavedTemplates);

router.route('/:id')
  .delete(deleteSavedTemplate);

module.exports = router;
