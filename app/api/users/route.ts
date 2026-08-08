import { listUsers, createUser } from "@/database/repositories/users"

export async function GET() {
  const users = await listUsers()
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return Response.json(user, { status: 201 })
}
