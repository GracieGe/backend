const express = require('express');
const router = express.Router();
const courseController = require('../controllers/coursesController');

router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);

module.exports = router;