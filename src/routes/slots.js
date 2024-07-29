const express = require('express');
const router = express.Router();
const slotsController = require('../controllers/slotsController');

router.get('/availableSlots', slotsController.getAvailableSlots);

module.exports = router;