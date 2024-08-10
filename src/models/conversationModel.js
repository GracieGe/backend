const db = require('./db');

exports.createConversation = async (studentId, teacherId) => {
  try {
    const result = await db.query(
      `INSERT INTO "Conversations" ("studentId", "teacherId", "created_at", "updated_at") 
       VALUES ($1, $2, NOW(), NOW()) 
       RETURNING "conversationId"`,
      [studentId, teacherId]
    );
    return result.rows[0].conversationId;
  } catch (err) {
    throw new Error('Failed to create conversation');
  }
};

exports.getConversationByStudentAndTeacher = async (studentId, teacherId) => {
  try {
    const result = await db.query(
      `SELECT * FROM "Conversations" WHERE "studentId" = $1 AND "teacherId" = $2`,
      [studentId, teacherId]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error('Failed to fetch conversation');
  }
};