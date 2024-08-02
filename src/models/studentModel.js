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