import { getPool, sql } from "../connection"

export type Message = {
  id: number
  chatId: number
  senderId: number
  text: string
  sentAt: string
}

function mapMessage(row: any): Message {
  return {
    id: row.Id,
    chatId: row.ChatId,
    senderId: row.SenderId,
    text: row.Text,
    sentAt: row.SentAt,
  }
}

export async function listMessages(chatId: number): Promise<Message[]> {
  const pool = await getPool()
  const result = await pool
    .request()
    .input("chatId", sql.Int, chatId)
    .query(
      "SELECT Id, ChatId, SenderId, Text, SentAt FROM dbo.Messages WHERE ChatId = @chatId ORDER BY SentAt ASC",
    )
  return result.recordset.map(mapMessage)
}

export async function createMessage(input: {
  chatId: number
  senderId: number
  text: string
}): Promise<Message> {
  const pool = await getPool()
  const result = await pool
    .request()
    .input("chatId", sql.Int, input.chatId)
    .input("senderId", sql.Int, input.senderId)
    .input("text", sql.NVarChar(sql.MAX), input.text)
    .query(`
      INSERT INTO dbo.Messages (ChatId, SenderId, Text)
      OUTPUT INSERTED.Id, INSERTED.ChatId, INSERTED.SenderId, INSERTED.Text, INSERTED.SentAt
      VALUES (@chatId, @senderId, @text)
    `)
  return mapMessage(result.recordset[0])
}
