const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderModel.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error('Error inserting order:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await orderModel.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).send('Server error');
  }
};