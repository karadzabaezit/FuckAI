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
    <div className="fixed top-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-background/80 px-4 py-3 shadow-lg backdrop-blur-md">
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
          href="https://github.com/karadzabaezit/FuckAI"
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
