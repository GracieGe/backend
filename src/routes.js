const express = require('express');
const router = express.Router();
const db = require('./db');

// 获取所有课程
router.get('/courses', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM "Courses"');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
