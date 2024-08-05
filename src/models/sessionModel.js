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
        s."sessionId",
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

exports.updateCompletedSessionStatus = async (sessionId, status) => {
  try {
    await db.query(
      `UPDATE "Sessions" 
       SET "status" = $1
       WHERE "sessionId" = $2`,
      [status, sessionId]
    );
  } catch (err) {
    throw new Error('Failed to update session status');
  }
};

exports.getCompletedSessionsByStudentId = async (studentId) => {
  try {
    const result = await db.query(
      `SELECT 
        s."sessionId",
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
        s."studentId" = $1 AND s."status" = 'Completed'`,
      [studentId]
    );
    return result.rows;
  } catch (err) {
    throw new Error('Failed to fetch completed sessions');
  }
};

exports.updateCancelledSessionStatus = async (sessionId, status) => {
  try {
    await db.query(
      `UPDATE "Sessions" 
       SET "status" = $1
       WHERE "sessionId" = $2`,
      [status, sessionId]
    );
  } catch (err) {
    throw new Error('Failed to update session status');
  }
};

exports.getCancelledSessionsByStudentId = async (studentId) => {
  try {
    const result = await db.query(
      `SELECT 
        s."sessionId",
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
        s."studentId" = $1 AND s."status" = 'Cancelled'`,
      [studentId]
    );
    return result.rows;
  } catch (err) {
    throw new Error('Failed to fetch cancelled sessions');
  }
};

exports.updateRecordingUrl = async (sessionId, recordingUrl, role) => {
  try {
    const column = role === 'teacher' ? 'recording_teacher' : 'recording_student';
    await db.query(
      `UPDATE "Sessions" 
       SET "${column}" = $1 
       WHERE "sessionId" = $2`,
      [recordingUrl, sessionId]
    );
  } catch (err) {
    throw new Error('Failed to update recording URL');
  }
};