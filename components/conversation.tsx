"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import SendIcon from "@mui/icons-material/Send"
import { StatusBar, HomeIndicator } from "./status-bar"
import type { Chat, ChatMessage } from "@/lib/chats"

export function Conversation({ chat }: { chat: Chat }) {
  const router = useRouter()
  const [messages, setMessages] = React.useState<ChatMessage[]>(chat.messages)
  const [draft, setDraft] = React.useState("")
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function send() {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${prev.length}`,
        from: "me",
        text,
        time: "Now",
      },
    ])
    setDraft("")
  }

  return (
    <>
      <StatusBar />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <IconButton onClick={() => router.push("/")} aria-label="Back">
          <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Avatar src={chat.avatar} alt={chat.name} sx={{ width: 40, height: 40 }} />
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>
            {chat.name}
          </Typography>
          <Typography sx={{ color: chat.online ? "#34c759" : "text.secondary", fontSize: 13 }}>
            {chat.online ? "Online" : "Offline"}
          </Typography>
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 2, bgcolor: "#f7f7fa" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
          {messages.map((m) => {
            const mine = m.from === "me"
            return (
              <Box
                key={m.id}
                sx={{
                  display: "flex",
                  justifyContent: mine ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                  maxWidth: "75%",
                  px: 1.75,
                  py: 1,
                  borderRadius: "18px",
                  borderBottomRightRadius: mine ? "4px" : "18px",
                  borderBottomLeftRadius: mine ? "18px" : "4px",
                    bgcolor: mine ? "primary.main" : "#ffffff",
                    color: mine ? "primary.contrastText" : "text.primary",
                    boxShadow: mine ? "none" : "0 1px 2px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography sx={{ fontSize: 15 }}>{m.text}</Typography>
                  <Typography
                    sx={{
                      fontSize: 11,
                      mt: 0.25,
                      textAlign: "right",
                      color: mine ? "rgba(255,255,255,0.7)" : "text.secondary",
                    }}
                  >
                    {m.time}
                  </Typography>
                </Box>
              </Box>
            )
          })}
          <div ref={endRef} />
        </Box>
      </Box>

      {/* Composer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.25,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: "#f2f2f7",
            borderRadius: 5,
            px: 2,
            py: 1,
          }}
        >
          <InputBase
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                send()
              }
            }}
            placeholder="Message"
            fullWidth
            sx={{ fontSize: 15 }}
            inputProps={{ "aria-label": "Type a message" }}
          />
        </Box>
        <IconButton
          onClick={send}
          aria-label="Send message"
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.main", opacity: 0.9 },
          }}
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
      <HomeIndicator />
    </>
  )
}
