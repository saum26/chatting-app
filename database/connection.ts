import sql from "mssql"

const config: sql.config = {
  server: process.env.DB_SERVER ?? "localhost\\SQLEXPRESS",
  database: process.env.DB_NAME ?? "ChattingAppDb",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    trustServerCertificate: true,
  },
}

let poolPromise: Promise<sql.ConnectionPool> | undefined

export function getPool(): Promise<sql.ConnectionPool> {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config).connect()
  }
  return poolPromise
}

export { sql }
