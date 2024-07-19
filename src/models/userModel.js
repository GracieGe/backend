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