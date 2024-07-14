const express = require('express');
const router = express.Router();

const coursesRouter = require('./courses');
const categoriesRouter = require('./categories');

router.use(coursesRouter);
router.use(categoriesRouter);

module.exports = router;