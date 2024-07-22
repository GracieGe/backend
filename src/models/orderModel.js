const db = require('./db');

exports.createOrder = async (orderData) => {
  const { userId, courseId, purchasedHours, amount, note, timeOfPurchase } = orderData;
  const usedHours = 0;
  const remainingHours = purchasedHours;

  const result = await db.query(
    `INSERT INTO "Orders" ("userId", "courseId", "purchasedHours", "amount", "usedHours", "remainingHours", "note", "timeOfPurchase")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [userId, courseId, purchasedHours, amount, usedHours, remainingHours, note, timeOfPurchase]
  );
  return result.rows[0];
};

exports.getOrdersByUser = async (userId) => {
  const result = await db.query(`
    SELECT o.*, c."courseName", c."grade", c."image"
      FROM "Orders" o
      JOIN "Courses" c ON o."courseId" = c."courseId"
      WHERE o."userId" = $1
  `, [userId]);

  if (result.rows.length === 0) {
    throw new Error('No courses found');
  }

  return result.rows;
};