const studentModel = require('../models/studentModel');

exports.getStudentIdByUserId = async (req, res) => {
  const userId = req.user.id; 

  try {
    const student = await studentModel.getStudentIdByUserId(userId);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json({ studentId: student.studentId });
  } catch (error) {
    console.error('Error fetching student ID:', error);
    res.status(500).send('Server error');
  }
};

exports.getStudentDetailsByUserId = async (req, res) => {
  try {
    const userId = req.user.id; 

    const studentDetails = await studentModel.getStudentDetailsByUserId(userId);
    
    res.json(studentDetails); 
  } catch (err) {
    console.error('Error fetching student details:', err.message);
    res.status(500).send('Server error');
  }
};