"use client"

import Box from "@mui/material/Box"

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f2f2f7",
        p: { xs: 0, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 390 },
          height: { xs: "100dvh", sm: 800 },
          bgcolor: "background.paper",
          borderRadius: { xs: 0, sm: 6 },
          boxShadow: { xs: "none", sm: "0 24px 60px rgba(0,0,0,0.18)" },
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
