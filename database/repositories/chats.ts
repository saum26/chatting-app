import { getPool, sql } from "../connection"

export type Chat = {
  id: number
  isGroup: boolean
  name: string | null
  createdAt: string
}

function mapChat(row: any): Chat {
  return {
    id: row.Id,
    isGroup: row.IsGroup,
    name: row.Name,
    createdAt: row.CreatedAt,
  }
}

export async function listChatsForUser(userId: number): Promise<Chat[]> {
  const pool = await getPool()
  const result = await pool
    .request()
    .input("userId", sql.Int, userId)
    .query(`
      SELECT c.Id, c.IsGroup, c.Name, c.CreatedAt
      FROM dbo.Chats c
      INNER JOIN dbo.GroupMembers gm ON gm.ChatId = c.Id
      WHERE gm.UserId = @userId
      ORDER BY c.CreatedAt DESC
    `)
  return result.recordset.map(mapChat)
}

export async function getChatById(id: number): Promise<Chat | null> {
  const pool = await getPool()
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT Id, IsGroup, Name, CreatedAt FROM dbo.Chats WHERE Id = @id")
  return result.recordset[0] ? mapChat(result.recordset[0]) : null
}

export async function createChat(input: {
  isGroup: boolean
  name?: string
  memberIds: number[]
}): Promise<Chat> {
  const pool = await getPool()
  const transaction = new sql.Transaction(pool)
  await transaction.begin()
  try {
    const chatResult = await new sql.Request(transaction)
      .input("isGroup", sql.Bit, input.isGroup)
      .input("name", sql.NVarChar(200), input.name ?? null)
      .query(`
        INSERT INTO dbo.Chats (IsGroup, Name)
        OUTPUT INSERTED.Id, INSERTED.IsGroup, INSERTED.Name, INSERTED.CreatedAt
        VALUES (@isGroup, @name)
      `)
    const chat = mapChat(chatResult.recordset[0])

    for (const memberId of input.memberIds) {
      await new sql.Request(transaction)
        .input("chatId", sql.Int, chat.id)
        .input("userId", sql.Int, memberId)
        .query("INSERT INTO dbo.GroupMembers (ChatId, UserId) VALUES (@chatId, @userId)")
    }

    await transaction.commit()
    return chat
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}
