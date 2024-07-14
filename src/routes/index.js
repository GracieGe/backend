const express = require('express');
const router = express.Router();

const coursesRouter = require('./courses');

router.use(coursesRouter);

module.exports = router;