const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderData = { ...req.body, userId }; 
    const order = await orderModel.createOrder(orderData);
    res.status(201).json(order);
  } catch (err) {
    console.error('Error inserting order:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getOrdersByUser = async (req, res) => {
  const userId = req.user.id; 
  try {
    const orders = await orderModel.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).send('Server error');
  }
};