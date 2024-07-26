const teacherModel = require('../models/teacherModel');

exports.getSignedTeachers = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const teachers = await teacherModel.getSignedTeachers(categoryId);
    res.json(teachers);
  } catch (err) {
    console.error('Error fetching signed teachers:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getTeacherById = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacher = await teacherModel.getTeacherById(teacherId);
    res.json(teacher);
  } catch (err) {
    console.error('Error fetching teacher:', err.message);
    res.status(500).send('Server error');
  }
};