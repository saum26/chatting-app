import { PhoneFrame } from "@/components/phone-frame"
import { StatusBar } from "@/components/status-bar"
import { ChatList } from "@/components/chat-list"
import { BottomNav } from "@/components/bottom-nav"

export default function Home() {
  return (
    <PhoneFrame>
      <StatusBar />
      <ChatList />
      <BottomNav />
    </PhoneFrame>
  )
}
