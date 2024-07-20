const express = require('express');
const router = express.Router();

const coursesRouter = require('./courses');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');
const usersRouter = require('./users');
const profilesRouter = require('./profiles');

router.use('/courses', coursesRouter);
router.use('/categories', categoriesRouter);
router.use('/orders', ordersRouter);
router.use('/users', usersRouter);
router.use('/profiles', profilesRouter);

module.exports = router;