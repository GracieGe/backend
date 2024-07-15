const express = require('express');
const router = express.Router();

const coursesRouter = require('./courses');
const categoriesRouter = require('./categories');

router.use('/courses', coursesRouter);
router.use('/categories', categoriesRouter);

module.exports = router;