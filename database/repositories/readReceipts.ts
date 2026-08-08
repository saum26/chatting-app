import { getPool, sql } from "../connection"

export type ReadReceipt = {
  messageId: number
  userId: number
  readAt: string
}

function mapReadReceipt(row: any): ReadReceipt {
  return {
    messageId: row.MessageId,
    userId: row.UserId,
    readAt: row.ReadAt,
  }
}

export async function listReadReceipts(messageId: number): Promise<ReadReceipt[]> {
  const pool = await getPool()
  const result = await pool
    .request()
    .input("messageId", sql.Int, messageId)
    .query("SELECT MessageId, UserId, ReadAt FROM dbo.ReadReceipts WHERE MessageId = @messageId")
  return result.recordset.map(mapReadReceipt)
}

export async function markMessageRead(messageId: number, userId: number): Promise<void> {
  const pool = await getPool()
  await pool
    .request()
    .input("messageId", sql.Int, messageId)
    .input("userId", sql.Int, userId)
    .query(`
      IF NOT EXISTS (SELECT 1 FROM dbo.ReadReceipts WHERE MessageId = @messageId AND UserId = @userId)
      INSERT INTO dbo.ReadReceipts (MessageId, UserId) VALUES (@messageId, @userId)
    `)
}
