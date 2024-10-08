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

exports.getConversationsByStudentId = async (studentId) => {
  const query = `
    SELECT 
      c."conversationId",
      t."fullName" AS "name",
      t."photo" AS "photo",
      m."text" AS "latestMessage",
      m."created_at" AS "messageTime",
      (SELECT COUNT(*) 
       FROM "Messages" 
       WHERE "conversationId" = c."conversationId"
       AND "isRead" = FALSE
       AND "senderId" != $1) AS "unreadCount"
    FROM 
      "Conversations" c
    JOIN 
      "Teachers" t ON c."teacherId" = t."teacherId"
    LEFT JOIN 
      "Messages" m ON c."conversationId" = m."conversationId"
    WHERE 
      c."studentId" = $1
      AND m."created_at" = (
        SELECT MAX("created_at") 
        FROM "Messages" 
        WHERE "conversationId" = c."conversationId"
      )
    ORDER BY 
      m."created_at" DESC;
  `;
  const result = await db.query(query, [studentId]);
  return result.rows;
};

exports.getConversationsByTeacherId = async (teacherId) => {
  const query = `
    SELECT 
      c."conversationId",
      s."fullName" AS "name",
      s."photo" AS "photo",
      m."text" AS "latestMessage",
      m."created_at" AS "messageTime",
      (SELECT COUNT(*) 
       FROM "Messages" 
       WHERE "conversationId" = c."conversationId"
       AND "isRead" = FALSE
       AND "senderId" != $1) AS "unreadCount"
    FROM 
      "Conversations" c
    JOIN 
      "Students" s ON c."studentId" = s."studentId"
    LEFT JOIN 
      "Messages" m ON c."conversationId" = m."conversationId"
    WHERE 
      c."teacherId" = $1
      AND m."created_at" = (
        SELECT MAX("created_at") 
        FROM "Messages" 
        WHERE "conversationId" = c."conversationId"
      )
    ORDER BY 
      m."created_at" DESC;
  `;
  const result = await db.query(query, [teacherId]);
  return result.rows;
};