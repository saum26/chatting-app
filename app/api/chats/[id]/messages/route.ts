import { listMessages, createMessage } from "@/database/repositories/messages"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const messages = await listMessages(Number(id))
  return Response.json(messages)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await request.json()
  const message = await createMessage({ ...body, chatId: Number(id) })
  return Response.json(message, { status: 201 })
}
