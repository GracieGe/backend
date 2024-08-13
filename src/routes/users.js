const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', auth, userController.getCurrentUser); 
router.put('/update-phone', auth, userController.updatePhoneNumber);
router.put('/change-password', auth, userController.changePassword);

module.exports = router;