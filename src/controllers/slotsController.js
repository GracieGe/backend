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