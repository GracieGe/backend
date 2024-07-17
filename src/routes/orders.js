const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');

router.post('/', orderController.createOrder);
router.get('/user/:userId/orders', orderController.getOrdersByUser);

module.exports = router;