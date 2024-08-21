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

exports.getSignedTeachersByCourseId = async (req, res) => {
  const { courseId } = req.query;
  try {
    if (!courseId) {
      return res.status(400).json({ message: 'courseId is required' });
    }
    const teachers = await teacherModel.getSignedTeachersByCourseId(courseId);
    res.json(teachers);
  } catch (err) {
    console.error('Error fetching signed teachers by courseId:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getCoursesByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const teacherData = await teacherModel.getTeacherIdByUserId(userId);
    
    if (!teacherData) {
      console.error('No teacher found for this user ID');
      return res.status(404).json({ msg: 'Teacher not found' });
    }
    
    const teacherId = teacherData.teacherId;

    const courses = await teacherModel.getCoursesByTeacherId(teacherId);

    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Server error');
  }
};

exports.getTeacherDetailsByUserId = async (req, res) => {
  try {
    const userId = req.user.id; 

    const teacherDetails = await teacherModel.getTeacherDetailsByUserId(userId);
    
    res.json(teacherDetails); 
  } catch (err) {
    console.error('Error fetching teacher details:', err.message);
    res.status(500).send('Server error');
  }
};