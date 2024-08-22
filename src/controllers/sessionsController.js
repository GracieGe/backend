const sessionModel = require('../models/sessionModel');
const studentModel = require('../models/studentModel');
const teacherModel = require('../models/teacherModel');
const { uploadAudio } = require('../middleware/upload');

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

exports.getActiveSessionsByTeacherId = async (req, res) => {
  const userId = req.user.id; 

  try {
    // obtain teacherId
    const teacher = await teacherModel.getTeacherIdByUserId(userId);
    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }
    const teacherId = teacher.teacherId;

    // obtain active sessions
    const sessions = await sessionModel.getActiveSessionsByTeacherId(teacherId);   
    res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching active sessions:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateCompletedSessionStatus = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    await sessionModel.updateCompletedSessionStatus(sessionId, 'Completed');
    res.status(200).json({ message: 'Session status updated successfully' });
  } catch (err) {
    console.error('Error updating session status:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getCompletedSessionsByStudentId = async (req, res) => {
  const userId = req.user.id; 

  try {
    // obtain studentId
    const student = await studentModel.getStudentIdByUserId(userId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    const studentId = student.studentId;

    // obtain completed sessions
    const sessions = await sessionModel.getCompletedSessionsByStudentId(studentId);
    res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching completed sessions:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getCompletedSessionsByTeacherId = async (req, res) => {
  const userId = req.user.id; 

  try {
    // obtain teacherId
    const teacher = await teacherModel.getTeacherIdByUserId(userId);
    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }
    const teacherId = teacher.teacherId;

    // obtain completed sessions
    const sessions = await sessionModel.getCompletedSessionsByTeacherId(teacherId);
    res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching completed sessions:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateCancelledSessionStatus = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    await sessionModel.updateCancelledSessionStatus(sessionId, 'Cancelled');
    res.status(200).json({ message: 'Session status updated successfully' });
  } catch (err) {
    console.error('Error updating session status:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getCancelledSessionsByStudentId = async (req, res) => {
  const userId = req.user.id; 

  try {
    // obtain studentId
    const student = await studentModel.getStudentIdByUserId(userId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    const studentId = student.studentId;

    // obtain completed sessions
    const sessions = await sessionModel.getCancelledSessionsByStudentId(studentId);
    res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching cancelled sessions:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getCancelledSessionsByTeacherId = async (req, res) => {
  const userId = req.user.id; 

  try {
    // obtain teacherId
    const teacher = await teacherModel.getTeacherIdByUserId(userId);
    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }
    const teacherId = teacher.teacherId;

    // obtain completed sessions
    const sessions = await sessionModel.getCancelledSessionsByTeacherId(teacherId);
    res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching cancelled sessions:', err.message);
    res.status(500).send('Server error');
  }
};

exports.uploadRecording = async (req, res) => {
  uploadAudio(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ msg: err });
    }

    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const { sessionId } = req.body;
    const userRole = req.user.role;

    try {
      // Save recording URL
      const recordingUrl = `/uploads/${userRole === 'student' ? 'students' : 'teachers'}/${req.file.filename}`;
      await sessionModel.updateRecordingUrl(sessionId, recordingUrl, userRole);

      res.status(200).json({ msg: 'Recording uploaded successfully', recordingUrl });
    } catch (err) {
      console.error('Error uploading recording:', err.message);
      res.status(500).send('Server error');
    }
  });
};