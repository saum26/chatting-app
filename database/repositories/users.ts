import { getPool, sql } from "../connection"

export type User = {
  id: number
  name: string
  email: string
  avatarUrl: string | null
  createdAt: string
}

function mapUser(row: any): User {
  return {
    id: row.Id,
    name: row.Name,
    email: row.Email,
    avatarUrl: row.AvatarUrl,
    createdAt: row.CreatedAt,
  }
}

export async function listUsers(): Promise<User[]> {
  const pool = await getPool()
  const result = await pool
    .request()
    .query("SELECT Id, Name, Email, AvatarUrl, CreatedAt FROM dbo.Users ORDER BY Name")
  return result.recordset.map(mapUser)
}

export async function getUserById(id: number): Promise<User | null> {
  const pool = await getPool()
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT Id, Name, Email, AvatarUrl, CreatedAt FROM dbo.Users WHERE Id = @id")
  return result.recordset[0] ? mapUser(result.recordset[0]) : null
}

export async function createUser(input: {
  name: string
  email: string
  avatarUrl?: string
}): Promise<User> {
  const pool = await getPool()
  const result = await pool
    .request()
    .input("name", sql.NVarChar(100), input.name)
    .input("email", sql.NVarChar(256), input.email)
    .input("avatarUrl", sql.NVarChar(512), input.avatarUrl ?? null)
    .query(`
      INSERT INTO dbo.Users (Name, Email, AvatarUrl)
      OUTPUT INSERTED.Id, INSERTED.Name, INSERTED.Email, INSERTED.AvatarUrl, INSERTED.CreatedAt
      VALUES (@name, @email, @avatarUrl)
    `)
  return mapUser(result.recordset[0])
}
