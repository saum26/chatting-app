export type ChatMessage = {
  id: string
  text: string
  /** "them" = received message, "me" = sent message */
  from: "me" | "them"
  time: string
}

export type Chat = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  favorite: boolean
  group: boolean
  online: boolean
  messages: ChatMessage[]
}

export const chats: Chat[] = [
  {
    id: "saumya",
    name: "Saumya",
    avatar: "/avatars/saumya.png",
    lastMessage: "Hello",
    time: "9:41 AM",
    unread: 0,
    favorite: true,
    group: false,
    online: true,
    messages: [
      { id: "m1", from: "them", text: "Hey! Are you free later today?", time: "9:38 AM" },
      { id: "m2", from: "me", text: "Yeah, after 5 works for me", time: "9:39 AM" },
      { id: "m3", from: "them", text: "Perfect, let's grab coffee", time: "9:40 AM" },
      { id: "m4", from: "them", text: "Hello", time: "9:41 AM" },
    ],
  },
  {
    id: "shyam",
    name: "Shyam",
    avatar: "/avatars/shyam.png",
    lastMessage: "bring bread",
    time: "8:12 AM",
    unread: 2,
    favorite: false,
    group: false,
    online: false,
    messages: [
      { id: "m1", from: "them", text: "Heading to the store now", time: "8:10 AM" },
      { id: "m2", from: "me", text: "Nice, need anything?", time: "8:11 AM" },
      { id: "m3", from: "them", text: "bring bread", time: "8:12 AM" },
    ],
  },
  {
    id: "sanjana",
    name: "Sanjana",
    avatar: "/avatars/sanjana.png",
    lastMessage: "bring bread",
    time: "Yesterday",
    unread: 0,
    favorite: true,
    group: true,
    online: true,
    messages: [
      { id: "m1", from: "them", text: "Party is on for the weekend!", time: "Yesterday" },
      { id: "m2", from: "me", text: "Awesome, what should I get?", time: "Yesterday" },
      { id: "m3", from: "them", text: "bring bread", time: "Yesterday" },
    ],
  },
]

export function getChat(id: string): Chat | undefined {
  return chats.find((c) => c.id === id)
}
