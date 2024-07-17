const db = require('./db');

exports.getAllCategories = async () => {
  const result = await db.query('SELECT * FROM "Categories"');
  return result.rows;
};