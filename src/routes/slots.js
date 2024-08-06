const express = require('express');
const router = express.Router();
const slotsController = require('../controllers/slotsController');
const auth = require('../middleware/auth');

router.get('/availableSlots', slotsController.getAvailableSlots);
router.post('/updateSlot', slotsController.updateSlot);
router.post('/cancelSession', auth, slotsController.cancelSession);

module.exports = router;