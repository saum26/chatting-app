"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import HomeIcon from "@mui/icons-material/Home"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined"
import { HomeIndicator } from "./status-bar"

export function BottomNav() {
  const [value, setValue] = React.useState(0)

  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        showLabels={false}
        sx={{
          bgcolor: "transparent",
          "& .MuiBottomNavigationAction-root": { color: "text.primary" },
          "& .Mui-selected": { color: "text.primary" },
        }}
      >
        <BottomNavigationAction icon={<HomeIcon />} aria-label="Home" />
        <BottomNavigationAction
          icon={<NotificationsNoneIcon />}
          aria-label="Notifications"
        />
        <BottomNavigationAction
          icon={<PersonOutlineIcon />}
          aria-label="Profile"
        />
      </BottomNavigation>
      <HomeIndicator />
    </Box>
  )
}
