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