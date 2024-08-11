const db = require('./db');

exports.createMessage = async ({ conversationId, senderId, text }) => {
  const client = await db.getClient(); // 使用 getClient 获取客户端
  try {
    await client.query('BEGIN');

    const result = await client.query(
      `INSERT INTO "Messages" ("conversationId", "senderId", "text", "created_at") 
       VALUES ($1, $2, $3, NOW()) 
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
    client.release(); // 确保在最后释放客户端
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