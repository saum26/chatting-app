"use client"

import * as React from "react"
import { useServerInsertedHTML } from "next/navigation"
import createCache from "@emotion/cache"
import type { EmotionCache, Options as CacheOptions } from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1c1c1e", contrastText: "#ffffff" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#1c1c1e", secondary: "#8e8e93" },
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  shape: { borderRadius: 12 },
})

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: "mui" } as CacheOptions)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null
    let styles = ""
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return (
    <CacheProvider value={cache as EmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
