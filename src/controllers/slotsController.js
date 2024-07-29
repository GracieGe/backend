const slotModel = require('../models/slotModel');

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