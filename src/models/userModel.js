const db = require('./db');

exports.createUser = async (userData) => {
  const { email, password, role, timeOfCreation } = userData;

  const result = await db.query(
    `INSERT INTO "Users" ("email", "password", "role", "timeOfCreation")
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [email, password, role, timeOfCreation]
  );
  return result.rows[0];
};

exports.getUserByEmail = async (email) => {
  const result = await db.query(
    `SELECT * FROM "Users" WHERE "email" = $1`,
    [email]
  );
  return result.rows[0];
};