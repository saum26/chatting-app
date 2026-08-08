import { listChatsForUser, createChat } from "@/database/repositories/chats"

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("userId")
  if (!userId) return new Response("Missing userId query param", { status: 400 })
  const chats = await listChatsForUser(Number(userId))
  return Response.json(chats)
}

export async function POST(request: Request) {
  const body = await request.json()
  const chat = await createChat(body)
  return Response.json(chat, { status: 201 })
}
