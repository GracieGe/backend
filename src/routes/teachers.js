const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachersController');

router.get('/signed', teachersController.getSignedTeachers);
router.get('/:teacherId', teachersController.getTeacherById);

module.exports = router;