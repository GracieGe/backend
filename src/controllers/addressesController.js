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

exports.addNewAddress = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { address, label } = req.body;

    if (!address || !label) {
      return res.status(400).json({ msg: 'Address and label are required' });
    }

    const newAddress = await addressModel.addAddress(userId, address, label);
    res.status(201).json(newAddress);
  } catch (err) {
    console.error('Error adding address:', err.message);
    res.status(500).send('Server error');
  }
};