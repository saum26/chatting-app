"use client"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt"
import WifiIcon from "@mui/icons-material/Wifi"
import BatteryFullIcon from "@mui/icons-material/BatteryFull"

export function StatusBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        pt: 1.5,
        pb: 0.5,
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 15 }}>9:41</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <SignalCellularAltIcon sx={{ fontSize: 18 }} />
        <WifiIcon sx={{ fontSize: 18 }} />
        <BatteryFullIcon sx={{ fontSize: 22, transform: "rotate(90deg)" }} />
      </Box>
    </Box>
  )
}

export function HomeIndicator() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
      <Box
        sx={{
          width: 134,
          height: 5,
          borderRadius: 3,
          bgcolor: "#1c1c1e",
        }}
      />
    </Box>
  )
}
