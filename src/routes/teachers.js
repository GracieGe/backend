const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachersController');

router.get('/signed', teachersController.getSignedTeachers);

module.exports = router;