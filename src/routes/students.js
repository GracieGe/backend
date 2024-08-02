const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const auth = require('../middleware/auth'); 

router.get('/studentId', auth, studentsController.getStudentIdByUserId);

module.exports = router;