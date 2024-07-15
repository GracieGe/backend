const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Obtain all courses based on categories
router.get('/courses', async (req, res) => {
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

module.exports = router; 