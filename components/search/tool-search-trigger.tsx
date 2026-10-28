"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { ToolCommand } from "@/components/search/tool-command"
import { tools } from "@/lib/tools/registry"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";

// ---------------------------------------------------------------------------
// ToolSearchTrigger
// ---------------------------------------------------------------------------

/**
 * Renders both the search trigger button (desktop pill + mobile icon) and
 * owns the open/close state for the global command palette.
 *
 * Mounted once in the site header. The ⌘K / Ctrl+K keyboard shortcut is
 * registered here so it works anywhere on the page.
 */
function ToolSearchTrigger() {
  const [open, setOpen] = React.useState(false)

  // -------------------------------------------------------------------------
  // Global keyboard shortcut: ⌘K (macOS) / Ctrl+K (Windows/Linux)
  // -------------------------------------------------------------------------
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Desktop trigger — subtle pill with label and keyboard hint          */}
      {/* ------------------------------------------------------------------ */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search tools"
        aria-keyshortcuts="Meta+k Control+k"
        className={cn(
          "hidden md:inline-flex",
          "h-8 items-center gap-2 rounded-sm border border-border",
          "bg-transparent px-3",
          "text-xs text-muted-foreground",
          "transition-colors hover:border-foreground/30 hover:text-foreground",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        )}
      >
        <SearchIcon aria-hidden="true" className="size-3.5 shrink-0" />
        <span>Search tools...</span>
        <KbdGroup className="ml-1" aria-hidden="true">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile trigger — compact icon button                               */}
      {/* ------------------------------------------------------------------ */}
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Search tools"
        aria-keyshortcuts="Meta+k Control+k"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <SearchIcon aria-hidden="true" className="size-4" />
      </Button>

      {/* ------------------------------------------------------------------ */}
      {/* Command palette                                                     */}
      {/* ------------------------------------------------------------------ */}
      <ToolCommand tools={tools} open={open} onOpenChange={setOpen} />
    </>
  )
}

export { ToolSearchTrigger }
