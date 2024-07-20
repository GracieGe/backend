const db = require('./db');

exports.createStudentProfile = async (studentData) => {
  const { userId, fullName, gender, age, phoneNum, birthday, grade } = studentData;

  const result = await db.query(
    `INSERT INTO "Students" ("userId", "fullName", "gender", "age", "phoneNum", "birthday", "grade")
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, fullName, gender, age, phoneNum, birthday, grade]
  );
  return result.rows[0];
};

exports.createTeacherProfile = async (teacherData) => {
  const { userId, fullName, gender, age, phoneNum, birthday } = teacherData;

  const result = await db.query(
    `INSERT INTO "Teachers" ("userId", "fullName", "gender", "age", "phoneNum", "birthday")
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, fullName, gender, age, phoneNum, birthday]
  );
  return result.rows[0];
};