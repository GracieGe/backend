const slotModel = require('../models/slotModel');
const sessionModel = require('../models/sessionModel');
const teacherModel = require('../models/teacherModel');

exports.getAvailableSlots = async (req, res) => {
  const { teacherId, date } = req.query; 

  if (!teacherId || !date) {
    return res.status(400).json({ message: 'Teacher ID and date are required' });
  }

  try {
    const slots = await slotModel.getAvailableSlots(teacherId, date);
    res.json(slots);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateSlot = async (req, res) => {
  const { slotId, newLocation } = req.body;

  if (!slotId || !newLocation) {
    return res.status(400).json({ message: 'Slot ID and new location are required' });
  }

  try {
    await slotModel.updateSlot(slotId, newLocation, 'Booked');
    res.status(200).json({ message: 'Slot updated successfully' });
  } catch (err) {
    console.error('Error updating slot:', err.message);
    res.status(500).send('Server error');
  }
};

exports.cancelSession = async (req, res) => {
  const { sessionId, slotId } = req.body;

  if (!sessionId || !slotId) {
    return res.status(400).json({ message: 'Session ID and Slot ID are required' });
  }

  try {
    await sessionModel.updateCancelledSessionStatus(sessionId, 'Cancelled');
    await slotModel.unbookSlot(slotId);

    res.status(200).json({ message: 'Session cancelled and slot unbooked successfully' });
  } catch (err) {
    console.error('Error cancelling session:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createSlot = async (req, res) => {
  try {
    const { location, date, startTime, endTime } = req.body;
    const userId = req.user.id; 

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: 'Date, start time, and end time are required' });
    }

    const teacherData = await teacherModel.getTeacherIdByUserId(userId);
    if (!teacherData) {
      return res.status(404).json({ message: 'Teacher not found for this user' });
    }
    const teacherId = teacherData.teacherId;

    const slotData = {
      teacherId,
      timeOfSubmission: new Date(), 
      location: location || null, 
      date,
      startTime,
      endTime,
    };

    const newSlot = await slotModel.insertSlot(slotData);

    res.status(201).json(newSlot);
  } catch (err) {
    console.error('Error creating slot:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getTeacherSlots = async (req, res) => {
  const userId = req.user.id;

  try {
    const teacherData = await teacherModel.getTeacherIdByUserId(userId);
    if (!teacherData) {
      return res.status(404).json({ message: 'Teacher not found for this user' });
    }

    const teacherId = teacherData.teacherId;
    const slots = await slotModel.getTeacherSlotsWithCourseImage(teacherId);

    res.json(slots);
  } catch (err) {
    console.error('Error fetching teacher slots:', err.message);
    res.status(500).send('Server error');
  }
};