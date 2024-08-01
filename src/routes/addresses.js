const express = require('express');
const router = express.Router();
const addressesController = require('../controllers/addressesController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, addressesController.getUserAddresses);
router.post('/', authMiddleware, addressesController.addNewAddress);

module.exports = router;