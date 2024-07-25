const teacherModel = require('../models/teacherModel');

exports.getSignedTeachersByCategory = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const teachers = await teacherModel.getSignedTeachersByCategory(categoryId);
    res.json(teachers);
  } catch (err) {
    console.error('Error fetching signed teachers:', err.message);
    res.status(500).send('Server error');
  }
};