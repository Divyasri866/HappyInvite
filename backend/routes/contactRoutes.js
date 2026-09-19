const express = require('express');
const { submitContact, getContactMessages } = require('../controllers/contactController');

const router = express.Router();

router.post('/', submitContact);
router.get('/', getContactMessages);

module.exports = router;
