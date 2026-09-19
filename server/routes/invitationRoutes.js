const express = require('express');
const { createInvitation, getInvitation } = require('../controllers/invitationController');

const router = express.Router();

router.post('/', createInvitation);
router.get('/:token', getInvitation);

module.exports = router;
