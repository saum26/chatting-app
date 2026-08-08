import { getPool, sql } from "../connection"

export type GroupMember = {
  chatId: number
  userId: number
  joinedAt: string
}

function mapGroupMember(row: any): GroupMember {
  return {
    chatId: row.ChatId,
    userId: row.UserId,
    joinedAt: row.JoinedAt,
  }
}

export async function listMembers(chatId: number): Promise<GroupMember[]> {
  const pool = await getPool()
  const result = await pool
    .request()
    .input("chatId", sql.Int, chatId)
    .query("SELECT ChatId, UserId, JoinedAt FROM dbo.GroupMembers WHERE ChatId = @chatId")
  return result.recordset.map(mapGroupMember)
}

export async function addMember(chatId: number, userId: number): Promise<void> {
  const pool = await getPool()
  await pool
    .request()
    .input("chatId", sql.Int, chatId)
    .input("userId", sql.Int, userId)
    .query(`
      IF NOT EXISTS (SELECT 1 FROM dbo.GroupMembers WHERE ChatId = @chatId AND UserId = @userId)
      INSERT INTO dbo.GroupMembers (ChatId, UserId) VALUES (@chatId, @userId)
    `)
}

export async function removeMember(chatId: number, userId: number): Promise<void> {
  const pool = await getPool()
  await pool
    .request()
    .input("chatId", sql.Int, chatId)
    .input("userId", sql.Int, userId)
    .query("DELETE FROM dbo.GroupMembers WHERE ChatId = @chatId AND UserId = @userId")
}
