"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  function toggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Toggle theme"
              onClick={toggle}
            />
          }
        >
          <SunIcon className="size-4 dark:hidden" />
          <MoonIcon className="size-4 hidden dark:block" />
        </TooltipTrigger>
        <TooltipContent>
          Toggle theme <span className="ml-1 font-mono">D</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ThemeToggle }
