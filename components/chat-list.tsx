"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { chats, type Chat } from "@/lib/chats"

const FILTERS = ["All", "Unread", "Groups", "Favorite"] as const
type Filter = (typeof FILTERS)[number]

function matchesFilter(chat: Chat, filter: Filter) {
  switch (filter) {
    case "Unread":
      return chat.unread > 0
    case "Groups":
      return chat.group
    case "Favorite":
      return chat.favorite
    default:
      return true
  }
}

export function ChatList() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState<Filter>("All")

  const visible = chats.filter(
    (c) =>
      matchesFilter(c, filter) &&
      c.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
      {/* Search */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "#f2f2f7",
          borderRadius: 3,
          px: 2,
          py: 1.25,
          mt: 1,
        }}
      >
        <SearchIcon sx={{ color: "text.secondary" }} />
        <InputBase
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          fullWidth
          sx={{ fontSize: 17 }}
          inputProps={{ "aria-label": "Search conversations" }}
        />
      </Box>

      {/* Filter chips */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1.25, py: 2 }}>
        {FILTERS.map((f) => {
          const selected = f === filter
          return (
            <Chip
              key={f}
              label={f}
              onClick={() => setFilter(f)}
              sx={{
                fontWeight: 500,
                fontSize: 15,
                px: 0.5,
                height: 36,
                borderRadius: 3,
                bgcolor: selected ? "primary.main" : "#e5e5ea",
                color: selected ? "primary.contrastText" : "text.primary",
                "&:hover": {
                  bgcolor: selected ? "primary.main" : "#dcdce1",
                },
              }}
            />
          )
        })}
      </Box>

      {/* Conversation list */}
      <List disablePadding>
        {visible.map((chat) => (
          <ListItemButton
            key={chat.id}
            onClick={() => router.push(`/chat/${chat.id}`)}
            sx={{ px: 0, py: 1, borderRadius: 2 }}
          >
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                invisible={!chat.online}
                sx={{
                  "& .MuiBadge-dot": {
                    bgcolor: "#34c759",
                    border: "2px solid #fff",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                  },
                }}
              >
                <Avatar
                  src={chat.avatar}
                  alt={chat.name}
                  sx={{ width: 52, height: 52 }}
                />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              sx={{ ml: 1 }}
              primary={
                <Typography sx={{ fontWeight: 700, fontSize: 17 }}>
                  {chat.name}
                </Typography>
              }
              secondary={
                <Typography
                  sx={{ color: "text.secondary", fontSize: 15 }}
                  noWrap
                >
                  {chat.lastMessage}
                </Typography>
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 0.5,
                pl: 1,
              }}
            >
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                {chat.time}
              </Typography>
              {chat.unread > 0 && (
                <Box
                  sx={{
                    minWidth: 20,
                    height: 20,
                    px: 0.75,
                    borderRadius: 10,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    fontSize: 12,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {chat.unread}
                </Box>
              )}
            </Box>
          </ListItemButton>
        ))}

        {visible.length === 0 && (
          <Typography
            sx={{ color: "text.secondary", textAlign: "center", mt: 6 }}
          >
            No conversations found
          </Typography>
        )}
      </List>
    </Box>
  )
}
