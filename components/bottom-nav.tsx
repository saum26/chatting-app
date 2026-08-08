"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import HomeIcon from "@mui/icons-material/Home"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PersonIcon from "@mui/icons-material/Person"
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined"
import Groups2Icon from "@mui/icons-material/Groups2"
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined"
import { HomeIndicator } from "./status-bar"

const TABS = [
  { href: "/", label: "Home", Icon: HomeIcon, OutlinedIcon: HomeOutlinedIcon },
  { href: "/groups", label: "Groups", Icon: Groups2Icon, OutlinedIcon: Groups2OutlinedIcon },
  { href: "/profile", label: "Profile", Icon: PersonIcon, OutlinedIcon: PersonOutlineIcon },
] as const

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const activeIndex = TABS.findIndex((tab) => tab.href === pathname)

  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
      <BottomNavigation
        value={activeIndex === -1 ? false : activeIndex}
        onChange={(_, newValue) => router.push(TABS[newValue].href)}
        showLabels={false}
        sx={{
          bgcolor: "transparent",
          "& .MuiBottomNavigationAction-root": { color: "text.primary" },
          "& .Mui-selected": { color: "text.primary" },
        }}
      >
        {TABS.map(({ href, label, Icon, OutlinedIcon }) => (
          <BottomNavigationAction
            key={href}
            icon={pathname === href ? <Icon /> : <OutlinedIcon />}
            aria-label={label}
          />
        ))}
      </BottomNavigation>
      <HomeIndicator />
    </Box>
  )
}
