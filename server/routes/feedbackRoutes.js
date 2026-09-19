const express = require('express');
const { submitFeedback, getTestimonials } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', submitFeedback);
router.get('/testimonials', getTestimonials);

module.exports = router;
