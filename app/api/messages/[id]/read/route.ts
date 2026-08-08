import { markMessageRead, listReadReceipts } from "@/database/repositories/readReceipts"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const receipts = await listReadReceipts(Number(id))
  return Response.json(receipts)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { userId } = await request.json()
  await markMessageRead(Number(id), Number(userId))
  return new Response(null, { status: 204 })
}
