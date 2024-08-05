const sessionModel = require('../models/sessionModel');
const studentModel = require('../models/studentModel');

exports.addSession = async (req, res) => {
  const { slotId, teacherId, location, date, startTime, endTime } = req.body;
  const userId = req.user.id; 

  try {
    // obtain studentId
    const student = await studentModel.getStudentIdByUserId(userId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    const studentId = student.studentId;

    // Insert into sessions
    await sessionModel.addSession(slotId, teacherId, studentId, location, date, startTime, endTime);
    res.status(201).json({ message: 'Session added successfully' });
  } catch (err) {
    console.error('Error adding session:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getActiveSessionsByStudentId = async (req, res) => {
  const userId = req.user.id; 

  try {
    // obtain studentId
    const student = await studentModel.getStudentIdByUserId(userId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    const studentId = student.studentId;

    // obtain active sessions
    const sessions = await sessionModel.getActiveSessionsByStudentId(studentId);
    res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching active sessions:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateSessionStatus = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    await sessionModel.updateSessionStatus(sessionId, 'Completed');
    res.status(200).json({ message: 'Session status updated successfully' });
  } catch (err) {
    console.error('Error updating session status:', err.message);
    res.status(500).send('Server error');
  }
};