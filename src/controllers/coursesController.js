const courseModel = require('../models/courseModel');

exports.getAllCourses = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const courses = await courseModel.getAllCourses(categoryId);
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await courseModel.getCourseById(courseId);
    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err.message);
    res.status(500).send('Server error');
  }
};