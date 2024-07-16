const express = require('express');
const router = express.Router();

const coursesRouter = require('./courses');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');

router.use('/courses', coursesRouter);
router.use('/categories', categoriesRouter);
router.use('/orders', ordersRouter);

module.exports = router;