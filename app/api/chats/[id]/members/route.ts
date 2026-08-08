import { listMembers, addMember, removeMember } from "@/database/repositories/groupMembers"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const members = await listMembers(Number(id))
  return Response.json(members)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { userId } = await request.json()
  await addMember(Number(id), Number(userId))
  return new Response(null, { status: 204 })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const userId = new URL(request.url).searchParams.get("userId")
  if (!userId) return new Response("Missing userId query param", { status: 400 })
  await removeMember(Number(id), Number(userId))
  return new Response(null, { status: 204 })
}
