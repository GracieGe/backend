const db = require('./db');

exports.createMessage = async ({ conversationId, senderId, text }) => {
  try {
    const result = await db.query(
      `INSERT INTO "Messages" ("conversationId", "senderId", "text", "created_at") 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING "messageId", "created_at"`,
      [conversationId, senderId, text]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error('Failed to create message');
  }
};

exports.getMessagesByConversationId = async (conversationId) => {
  try {
    const result = await db.query(
      `SELECT * FROM "Messages" WHERE "conversationId" = $1 ORDER BY "created_at" ASC`,
      [conversationId]
    );
    return result.rows;
  } catch (err) {
    throw new Error('Failed to fetch messages');
  }
};