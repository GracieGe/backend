const db = require('./db');

exports.getStudentIdByUserId = async (userId) => {
  try {
    const result = await db.query(
      `SELECT "studentId" FROM "Students" WHERE "userId" = $1`,
      [userId]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error('Failed to fetch student ID');
  }
};

exports.getStudentDetailsByUserId = async (userId) => {
  try {
    const result = await db.query(`
      SELECT "studentId", "fullName", "photo", "email"
      FROM "Students"
      WHERE "userId" = $1
    `, [userId]);

    if (result.rows.length === 0) {
      throw new Error('Student not found');
    }

    return result.rows[0]; 
  } catch (err) {
    console.error('Error fetching student details:', err.message);
    throw err;
  }
};