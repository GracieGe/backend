const express = require('express');
const router = express.Router();
const addressesController = require('../controllers/addressesController');

router.get('/:userId', addressesController.getUserAddresses);

module.exports = router;