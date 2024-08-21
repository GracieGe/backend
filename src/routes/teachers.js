const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachersController');
const auth = require('../middleware/auth');

router.get('/signed', teachersController.getSignedTeachers);
router.get('/byCourse', auth, teachersController.getSignedTeachersByCourseId);
router.get('/myCourses', auth, teachersController.getCoursesByUserId);
router.get('/teacherDetails', auth, teachersController.getTeacherDetailsByUserId);
router.get('/:teacherId', teachersController.getTeacherById);

module.exports = router;