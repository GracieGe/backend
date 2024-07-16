const express = require('express');
const router = express.Router();
const db = require('../db');

// Insert new orders
router.post('/', async (req, res) => {
  const { userId, courseId, purchasedHours, amount, note, timeOfPurchase } = req.body;
  const usedHours = 0;
  const remainingHours = purchasedHours;

  console.log('Received order data:', { userId, courseId, purchasedHours, amount, note, usedHours, remainingHours, timeOfPurchase });

  try {
    const courseCheck = await db.query('SELECT * FROM "Courses" WHERE "courseId" = $1', [courseId]);
    if (courseCheck.rows.length === 0) {
      console.error('Invalid courseId:', courseId);
      return res.status(400).send('Invalid courseId');
    }

    const result = await db.query(
      `INSERT INTO "Orders" ("userId", "courseId", "purchasedHours", "amount", "usedHours", "remainingHours", "note", "timeOfPurchase")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [userId, courseId, purchasedHours, amount, usedHours, remainingHours, note, timeOfPurchase]
    );

    console.log('Order created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting order:', err.message);
    res.status(500).send('Server error');
  }
});

// Obtain all orders from certain user
router.get('/user/:userId/orders', async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await db.query(`
      SELECT o.*, c."courseName", c."grade"
      FROM "Orders" o
      JOIN "Courses" c ON o."courseId" = c."courseId"
      WHERE o."userId" = $1
    `, [userId]);

    if (orders.rows.length === 0) {
      console.log(`No orders found for userId: ${userId}`);
      return res.status(404).send('No orders found');
    }

    console.log(`Orders for userId ${userId}:`, orders.rows);
    res.status(200).json(orders.rows);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;