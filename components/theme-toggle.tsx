"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`
        w-8 h-8 md:w-10 md:h-10 p-0 rounded-full
        transition-all duration-300
        shadow-md
        border border-border/40
        hover:scale-110 hover:shadow-lg
        active:scale-95
        ${theme === "light"
          ? "bg-amber-100 hover:bg-amber-200 text-amber-700"
          : "bg-slate-800 hover:bg-slate-700 text-yellow-400"}
      `}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Sun className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </Button>
  )
}
