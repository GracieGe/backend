const db = require('./db');

exports.getUserAddresses = async (userId) => {
  try {
    const result = await db.query(
      `SELECT "addressId", "address", "label" 
       FROM "Addresses" 
       WHERE "userId" = $1`,
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching user addresses:', err);
    throw new Error('Failed to fetch user addresses');
  }
};