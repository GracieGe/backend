const db = require('./db');

exports.createMessage = async ({ conversationId, senderId, text }) => {
  const client = await db.getClient(); 
  try {
    await client.query('BEGIN');

    const result = await client.query(
      `INSERT INTO "Messages" ("conversationId", "senderId", "text", "created_at", "isRead") 
       VALUES ($1, $2, $3, NOW(), FALSE) 
       RETURNING "messageId", "created_at"`,
      [conversationId, senderId, text]
    );

    await client.query(
      `UPDATE "Conversations" 
       SET "updated_at" = NOW() 
       WHERE "conversationId" = $1`,
      [conversationId]
    );

    await client.query('COMMIT');
    return result.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error('Failed to create message');
  } finally {
    client.release(); 
  }
};

exports.getMessagesByConversationId = async (conversationId) => {
  try {
    const result = await db.query(
      `SELECT * FROM "Messages" WHERE "conversationId" = $1 ORDER BY "created_at" DESC`,
      [conversationId]
    );
    return result.rows;
  } catch (err) {
    throw new Error('Failed to fetch messages');
  }
};

exports.markMessagesAsRead = async (conversationId, userId) => {
  try {
    await db.query(
      `UPDATE "Messages" 
       SET "isRead" = TRUE 
       WHERE "conversationId" = $1 
       AND "senderId" != $2 
       AND "isRead" = FALSE`,
      [conversationId, userId]
    );
  } catch (err) {
    throw new Error('Failed to mark messages as read');
  }
};