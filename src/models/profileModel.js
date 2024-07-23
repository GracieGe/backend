const db = require('./db');

exports.createStudentProfile = async (studentData) => {
  const { userId, fullName, gender, age, phoneNum, birthday, grade, photo } = studentData;

  const result = await db.query(
    `INSERT INTO "Students" ("userId", "fullName", "gender", "age", "phoneNum", "birthday", "grade", "photo")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [userId, fullName, gender, age, phoneNum, birthday, grade, photo]
  );
  return result.rows[0];
};

exports.createTeacherProfile = async (teacherData) => {
  const { userId, fullName, gender, age, phoneNum, birthday, photo } = teacherData;

  const result = await db.query(
    `INSERT INTO "Teachers" ("userId", "fullName", "gender", "age", "phoneNum", "birthday", "photo")
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, fullName, gender, age, phoneNum, birthday, photo]
  );
  return result.rows[0];
};