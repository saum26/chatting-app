import { getChatById } from "@/database/repositories/chats"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const chat = await getChatById(Number(id))
  if (!chat) return new Response("Not found", { status: 404 })
  return Response.json(chat)
}
