const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const auth = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/user/orders', auth, orderController.getOrdersByUser);

module.exports = router;