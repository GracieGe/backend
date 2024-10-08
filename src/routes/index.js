const express = require('express');
const router = express.Router();

const coursesRouter = require('./courses');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');
const usersRouter = require('./users');
const profilesRouter = require('./profiles');
const protectedRoutes = require('./protectedRoutes');
const teachersRouter = require('./teachers');
const slotsRouter = require('./slots');
const addressesRouter = require('./addresses');
const studentsRouter = require('./students');
const sessionsRouter = require('./sessions');
const conversationsRouter = require('./conversations');

router.use('/courses', coursesRouter);
router.use('/categories', categoriesRouter);
router.use('/orders', ordersRouter);
router.use('/users', usersRouter);
router.use('/profiles', profilesRouter);
router.use('/protected', protectedRoutes);
router.use('/teachers', teachersRouter);
router.use('/slots', slotsRouter);
router.use('/addresses', addressesRouter);
router.use('/students', studentsRouter);
router.use('/sessions', sessionsRouter);
router.use('/conversations', conversationsRouter);

module.exports = router;