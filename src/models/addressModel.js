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

exports.addAddress = async (userId, address, label) => {
  try {
    const result = await db.query(
      `INSERT INTO "Addresses" ("userId", "address", "label")
       VALUES ($1, $2, $3) RETURNING "addressId", "address", "label"`,
      [userId, address, label]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error adding new address:', err);
    throw new Error('Failed to add new address');
  }
};

exports.getAddressById = async (addressId) => {
  try {
    const result = await db.query(
      `SELECT "addressId", "address", "label" 
       FROM "Addresses" 
       WHERE "addressId" = $1`,
      [addressId]
    );

    if (result.rows.length === 0) {
      throw new Error('Address not found');
    }

    return result.rows[0];
  } catch (err) {
    console.error('Error fetching address by ID:', err);
    throw new Error('Failed to fetch address by ID');
  }
};

exports.updateAddress = async (userId, addressId, address, label) => {
  try {
    const result = await db.query(
      `UPDATE "Addresses" 
       SET "address" = $1, "label" = $2 
       WHERE "addressId" = $3 AND "userId" = $4 
       RETURNING "addressId", "address", "label"`,
      [address, label, addressId, userId]
    );

    return result.rows[0];
  } catch (err) {
    console.error('Error updating address:', err);
    throw new Error('Failed to update address');
  }
};