const db = require('./db');

exports.getAllCourses = async (categoryId) => {
  let result;
  if (categoryId) {
    const categoryIdInt = parseInt(categoryId, 10);
    if (isNaN(categoryIdInt)) {
      throw new Error('Invalid categoryId');
    }
    result = await db.query('SELECT * FROM "Courses" WHERE "categoryId" = $1', [categoryIdInt]);
  } else {
    result = await db.query('SELECT * FROM "Courses"');
  }
  return result.rows;
};

exports.getCourseById = async (courseId) => {
  const courseIdInt = parseInt(courseId, 10);
  if (isNaN(courseIdInt)) {
    throw new Error('Invalid courseId');
  }
  const result = await db.query('SELECT * FROM "Courses" WHERE "courseId" = $1', [courseIdInt]);
  if (result.rows.length === 0) {
    throw new Error('Course not found');
  }
  return result.rows[0];
};