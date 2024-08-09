const db = require('./db');

exports.createStudentProfile = async (studentData) => {
  const { userId, fullName, gender, age, email, birthday, grade, photo } = studentData;

  const result = await db.query(
    `INSERT INTO "Students" ("userId", "fullName", "gender", "age", "email", "birthday", "grade", "photo")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [userId, fullName, gender, age, email, birthday, grade, photo]
  );
  return result.rows[0];
};

exports.createTeacherProfile = async (teacherData) => {
  const { userId, fullName, gender, age, email, birthday, photo } = teacherData;

  const result = await db.query(
    `INSERT INTO "Teachers" ("userId", "fullName", "gender", "age", "email", "birthday", "photo")
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, fullName, gender, age, email, birthday, photo]
  );
  return result.rows[0];
};

exports.getUserRole = async (userId) => {
  const result = await db.query('SELECT "role" FROM "Users" WHERE "userId" = $1', [userId]);
  return result.rows[0]?.role;
};

exports.getStudentProfile = async (userId) => {
  const result = await db.query('SELECT * FROM "Students" WHERE "userId" = $1', [userId]);
  return result.rows[0];
};

exports.getTeacherProfile = async (userId) => {
  const result = await db.query('SELECT * FROM "Teachers" WHERE "userId" = $1', [userId]);
  return result.rows[0];
};

exports.updateStudentProfile = async (userId, profileData) => {
  const { fullName, gender, age, email, birthday, grade, photo } = profileData;

  const result = await db.query(
    `UPDATE "Students" SET "fullName" = $1, "gender" = $2, "age" = $3, "email" = $4, "birthday" = $5, "grade" = $6, "photo" = $7 WHERE "userId" = $8 RETURNING *`,
    [fullName, gender, age, email, birthday, grade, photo, userId]
  );

  return result.rows[0];
};

exports.updateTeacherProfile = async (userId, profileData) => {
  const { fullName, gender, age, email, birthday, photo } = profileData;

  const result = await db.query(
    `UPDATE "Teachers" SET "fullName" = $1, "gender" = $2, "age" = $3, "email" = $4, "birthday" = $5, "photo" = $6 WHERE "userId" = $7 RETURNING *`,
    [fullName, gender, age, email, birthday, photo, userId]
  );

  return result.rows[0];
};