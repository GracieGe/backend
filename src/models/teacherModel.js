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

exports.getTeacherById = async (teacherId) => {
  const teacherIdInt = parseInt(teacherId, 10);
  if (isNaN(teacherIdInt)) {
    throw new Error('Invalid teacherId');
  }
  const result = await db.query('SELECT * FROM "Teachers" WHERE "teacherId" = $1', [teacherIdInt]);
  if (result.rows.length === 0) {
    throw new Error('Teacher not found');
  }
  return result.rows[0];
};

exports.getSignedTeachersByCourseId = async (courseId) => {
  try {
    const courseIdInt = parseInt(courseId, 10);
    if (isNaN(courseIdInt)) {
      console.error('Invalid courseId provided');
      throw new Error('Invalid courseId');
    }
    const result = await db.query(`
      SELECT t.*, c."courseName", c."grade"
      FROM "Teachers" t
      INNER JOIN "Courses" c ON t."courseId" = c."courseId"
      WHERE t."status" = $1 AND c."courseId" = $2
    `, ['Signed', courseIdInt]);

    return result.rows;
  } catch (err) {
    console.error('Error fetching signed teachers by courseId:', err.message);
    throw err;
  }
};

exports.getTeacherIdByUserId = async (userId) => {
  try {
    const result = await db.query(
      `SELECT "teacherId" FROM "Teachers" WHERE "userId" = $1`,
      [userId]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error('Failed to fetch teacher ID');
  }
};

exports.getCoursesByTeacherId = async (teacherId) => {
  try {
    const result = await db.query(`
      SELECT c."courseId", c."courseName", c."grade", c."image"
      FROM "Courses" c
      INNER JOIN "Teachers" t ON c."courseId" = t."courseId"
      WHERE t."teacherId" = $1
    `, [teacherId]);

    if (result.rows.length === 0) {
      console.error('No courses found for this teacher');
      throw new Error('No courses found for this teacher');
    }

    return result.rows;
  } catch (err) {
    console.error('Failed to fetch courses:', err.message);
    throw new Error('Failed to fetch courses');
  }
};

exports.getTeacherDetailsByUserId = async (userId) => {
  try {
    const result = await db.query(`
      SELECT "teacherId", "fullName", "photo", "email"
      FROM "Teachers"
      WHERE "userId" = $1
    `, [userId]);

    if (result.rows.length === 0) {
      throw new Error('Teacher not found');
    }

    return result.rows[0]; 
  } catch (err) {
    console.error('Error fetching teacher details:', err.message);
    throw err;
  }
};