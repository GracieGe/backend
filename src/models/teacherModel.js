const db = require('./db');

exports.getSignedTeachers = async (categoryId) => {
  let result;
  try {
    if (categoryId) {
      const categoryIdInt = parseInt(categoryId, 10);
      if (isNaN(categoryIdInt)) {
        throw new Error('Invalid categoryId');
      }
      result = await db.query(`
        SELECT t.*, c."courseName", c."grade"
        FROM "Teachers" t
        INNER JOIN "Courses" c ON t."courseId" = c."courseId"
        WHERE t."status" = $1 AND c."categoryId" = $2
      `, ['Signed', categoryIdInt]);
    } else {
      result = await db.query(`
        SELECT t.*, c."courseName", c."grade"
        FROM "Teachers" t
        INNER JOIN "Courses" c ON t."courseId" = c."courseId"
        WHERE t."status" = $1
      `, ['Signed']);
    }
    return result.rows;
  } catch (err) {
    console.error('Error fetching signed teachers:', err.message);
    throw err;
  }
};