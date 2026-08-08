import { getUserById } from "@/database/repositories/users"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const user = await getUserById(Number(id))
  if (!user) return new Response("Not found", { status: 404 })
  return Response.json(user)
}
