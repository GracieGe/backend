const db = require('./db');

exports.addSession = async (slotId, teacherId, studentId, location, date, startTime, endTime) => {
  try {
    await db.query(
      `INSERT INTO "Sessions" ("slotId", "teacherId", "studentId", "location", "date", "startTime", "endTime", "status")
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Active')`,
      [slotId, teacherId, studentId, location, date, startTime, endTime]
    );
  } catch (err) {
    throw new Error('Failed to add session');
  }
};

exports.getActiveSessionsByStudentId = async (studentId) => {
  try {
    const result = await db.query(
      `SELECT 
        s."slotId",
        s."date",
        s."startTime",
        s."endTime",
        s."location",
        t."fullName",
        c."courseName",
        c."grade",
        c."image"
      FROM 
        "Sessions" s
      JOIN 
        "Teachers" t ON s."teacherId" = t."teacherId"
      JOIN 
        "Courses" c ON t."courseId" = c."courseId"
      WHERE 
        s."studentId" = $1 AND s."status" = 'Active'`,
      [studentId]
    );
    return result.rows;
  } catch (err) {
    throw new Error('Failed to fetch active sessions');
  }
};