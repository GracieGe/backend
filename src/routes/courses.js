const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Obtain all courses based on categories
router.get('/', async (req, res) => {
  const { categoryId } = req.query; 
  try {
    let result;
    if (categoryId) {
      const categoryIdInt = parseInt(categoryId, 10); 
      if (isNaN(categoryIdInt)) {
        return res.status(400).send('Invalid categoryId'); 
      }
      result = await db.query('SELECT * FROM "Courses" WHERE "categoryId" = $1', [categoryIdInt]);
    } else {
      result = await db.query('SELECT * FROM "Courses"');
    }
    res.json(result.rows); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error'); 
  }
});

// Obtain specific course by courseId
router.get('/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const courseIdInt = parseInt(courseId, 10);
    if (isNaN(courseIdInt)) {
      return res.status(400).send('Invalid courseId'); 
    }
    console.log(`Fetching course for courseId: ${courseIdInt}`);
    const result = await db.query('SELECT * FROM "Courses" WHERE "courseId" = $1', [courseIdInt]);
    
    if (result.rows.length === 0) {
      return res.status(404).send('Course not found');
    }

    res.json(result.rows[0]); 
  } catch (err) {
    console.error('Error fetching course:', err.message);
    res.status(500).send('Server error'); 
  }
});

module.exports = router; 