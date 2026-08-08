"use client"

import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import EditIcon from "@mui/icons-material/Edit"
import { StatusBar } from "@/components/status-bar"
import { BottomNav } from "@/components/bottom-nav"

export function Profile() {
  const router = useRouter()

  return (
    <>
      <StatusBar />

      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 40px",
          alignItems: "center",
          px: 1,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <IconButton onClick={() => router.back()} aria-label="Back">
          <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: 17, textAlign: "center" }}>
          Profile
        </Typography>
        <Box />
      </Box>

      {/* Avatar + name */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 5 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                bgcolor: "background.paper",
                border: "2px solid #f5b700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EditIcon sx={{ fontSize: 14, color: "text.primary" }} />
            </Box>
          }
        >
          <Avatar
            src="/avatars/saumya.png"
            alt="Saumya"
            sx={{ width: 112, height: 112 }}
          />
        </Badge>
        <Typography sx={{ fontWeight: 700, fontSize: 22, mt: 2 }}>
          Saumya
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }} />

      <BottomNav />
    </>
  )
}
