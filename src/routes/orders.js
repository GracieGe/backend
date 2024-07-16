const express = require('express');
const router = express.Router();
const db = require('../db');

// Insert new orders
router.post('/', async (req, res) => {
  const { userId, courseId, purchasedHours, amount, note } = req.body;
  const usedHours = 0;
  const remainingHours = purchasedHours;

  console.log('Received order data:', { userId, courseId, purchasedHours, amount, note, usedHours, remainingHours });

  try {
    const courseCheck = await db.query('SELECT * FROM "Courses" WHERE "courseId" = $1', [courseId]);
    if (courseCheck.rows.length === 0) {
      console.error('Invalid courseId:', courseId);
      return res.status(400).send('Invalid courseId');
    }

    const result = await db.query(
      `INSERT INTO "Orders" ("userId", "courseId", "purchasedHours", "amount", "usedHours", "remainingHours", "note")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, courseId, purchasedHours, amount, usedHours, remainingHours, note]
    );

    console.log('Order created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting order:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;