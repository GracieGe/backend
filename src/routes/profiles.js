const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profilesController');

router.post('/create', profileController.createProfile);

module.exports = router;