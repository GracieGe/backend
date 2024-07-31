const addressModel = require('../models/addressModel');

exports.getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id; 
    const addresses = await addressModel.getUserAddresses(userId);
    if (addresses.length === 0) {
      return res.status(404).json({ msg: 'No addresses found for this user' });
    }
    res.json(addresses);
  } catch (err) {
    console.error('Error fetching addresses:', err.message);
    res.status(500).send('Server error');
  }
};