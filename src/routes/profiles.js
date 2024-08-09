const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profilesController');
const auth = require('../middleware/auth'); 

router.post('/create', profileController.createProfile);
router.get('/', auth, profileController.getProfile);
router.put('/', auth, profileController.updateProfile);

module.exports = router;