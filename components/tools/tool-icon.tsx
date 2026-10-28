import * as React from "react"
import {
  Binary,
  Braces,
  Clock,
  FileCode2,
  FilePlus2,
  ImageDown,
  KeyRound,
  Link,
  Proportions,
  QrCode,
  Ruler,
  Scissors,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

// ---------------------------------------------------------------------------
// Icon map
//
// Maps the string identifiers stored in the tool registry to Lucide React
// components. Kept here — not in the registry — so the registry stays pure
// TypeScript data with no React or Lucide imports.
// ---------------------------------------------------------------------------

const iconMap: Record<string, LucideIcon> = {
  Binary,
  Braces,
  Clock,
  FileCode2,
  FilePlus2,
  ImageDown,
  KeyRound,
  Link,
  Proportions,
  QrCode,
  Ruler,
  Scissors,
}

// ---------------------------------------------------------------------------
// ToolIcon
// ---------------------------------------------------------------------------

interface ToolIconProps {
  /** Lucide icon name string from ToolDefinition.icon */
  name: string
  className?: string
}

/**
 * Resolves a tool icon identifier to the corresponding Lucide icon component
 * and renders it. Falls back to a neutral placeholder on unknown identifiers
 * so the UI degrades gracefully as new tools are added.
 */
function ToolIcon({ name, className }: ToolIconProps) {
  const Icon = iconMap[name]

  if (!Icon) {
    // Graceful fallback: a simple square placeholder so layout never breaks.
    return (
      <span
        aria-hidden="true"
        className={cn(
          "block size-5 rounded-sm bg-muted-foreground/20",
          className
        )}
      />
    )
  }

  return (
    <Icon
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
    />
  )
}

export { ToolIcon }
