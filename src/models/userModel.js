const db = require('./db');

exports.createUser = async (userData) => {
  const { phoneNumber, password, role, timeOfCreation } = userData;

  const result = await db.query(
    `INSERT INTO "Users" ("phoneNumber", "password", "role", "timeOfCreation")
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [phoneNumber, password, role, timeOfCreation]
  );
  return result.rows[0];
};

exports.getUserByPhoneNumber = async (phoneNumber) => {
  const result = await db.query(
    `SELECT * FROM "Users" WHERE "phoneNumber" = $1`,
    [phoneNumber]
  );
  return result.rows[0];
};

exports.getUserById = async (userId) => {
  const result = await db.query(
    `SELECT * FROM "Users" WHERE "userId" = $1`,
    [userId]
  );
  return result.rows[0];
};

exports.updatePhoneNumber = async (userId, newPhoneNumber) => {
  const result = await db.query(
    `UPDATE "Users" SET "phoneNumber" = $1 WHERE "userId" = $2 RETURNING *`,
    [newPhoneNumber, userId]
  );
  return result.rows[0];
};

exports.updateUserPassword = async (userId, newPassword) => {
  const result = await db.query(
    `UPDATE "Users" SET "password" = $1 WHERE "userId" = $2 RETURNING *`,
    [newPassword, userId]
  );
  return result.rows[0];
};