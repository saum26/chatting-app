import { notFound } from "next/navigation"
import { PhoneFrame } from "@/components/phone-frame"
import { Conversation } from "@/components/conversation"
import { getChat } from "@/lib/chats"

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const chat = getChat(id)
  if (!chat) notFound()

  return (
    <PhoneFrame>
      <Conversation chat={chat} />
    </PhoneFrame>
  )
}
