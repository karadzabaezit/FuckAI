"use client"

import { Moon, Sun } from "lucide-react"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { GithubIcon } from "../icons/lucide-github"

export function ChatHeader() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="sticky top-0 z-50 mb-4 flex items-center justify-between rounded-2xl border bg-background/70 px-4 py-3 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">FuckAI</h1>

          <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            Alpha
          </span>
        </div>

        <span className="text-sm text-muted-foreground">
          AI Without Corporate Bullshit.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com/karadzabayezit/FuckAI"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="icon">
            <GithubIcon className="h-4 w-4" />
          </Button>
        </a>

        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
