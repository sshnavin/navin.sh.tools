"use client"

import { CircleCheck, CircleX, Copy, Eraser, Minimize2, Sparkles, WrapText } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import type { JsonIndentation } from "@/lib/tools/json/format-json"
import type { ValidationState } from "./json-panel"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JsonToolbarProps {
  /** Currently selected indentation. */
  indentation: JsonIndentation
  /** Validation state to display inline in the toolbar. */
  validation: ValidationState
  /** Whether any output is available to copy. */
  hasOutput: boolean
  /** Whether the copy feedback ("Copied") is active. */
  copied: boolean
  onFormat: () => void
  onMinify: () => void
  onCopy: () => void
  onClear: () => void
  onExample: () => void
  onIndentationChange: (value: JsonIndentation) => void
}

// ---------------------------------------------------------------------------
// IndentationToggle
//
// A simple inline segmented control — avoids importing the full Select
// component for three fixed options.
// ---------------------------------------------------------------------------

const INDENTATION_OPTIONS: { label: string; value: JsonIndentation }[] = [
  { label: "2", value: 2 },
  { label: "4", value: 4 },
  { label: "Tab", value: "tab" },
]

function IndentationToggle({
  value,
  onChange,
}: {
  value: JsonIndentation
  onChange: (v: JsonIndentation) => void
}) {
  return (
    <div
      role="group"
      aria-label="Indentation"
      className="flex items-center overflow-hidden rounded-sm border border-border"
    >
      {INDENTATION_OPTIONS.map((opt) => (
        <button
          key={String(opt.value)}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "h-7 px-2.5 font-mono text-xs transition-colors",
            "border-r border-border last:border-r-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            value === opt.value
              ? "bg-foreground text-background"
              : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// JsonToolbar
// ---------------------------------------------------------------------------

/**
 * Action bar for the JSON Formatter.
 *
 * Primary actions (Format, Minify) are visually prominent.
 * Secondary actions (Copy, Clear, Example) are ghost/outline and compact.
 * Indentation selector is an inline segmented control.
 */
function JsonToolbar({
  indentation,
  validation,
  hasOutput,
  copied,
  onFormat,
  onMinify,
  onCopy,
  onClear,
  onExample,
  onIndentationChange,
}: JsonToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Primary actions */}
      <Button size="sm" onClick={onFormat}>
        <Sparkles aria-hidden="true" />
        Format
      </Button>

      <Button size="sm" variant="outline" onClick={onMinify}>
        <Minimize2 aria-hidden="true" />
        Minify
      </Button>

      {/* Divider */}
      <div
        aria-hidden="true"
        className="hidden h-5 w-px bg-border sm:block"
      />

      {/* Indentation label + toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Indent</span>
        <IndentationToggle value={indentation} onChange={onIndentationChange} />
      </div>

      {/* Validation status — pushes secondary actions to the right */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="flex flex-1 items-center justify-end"
      >
        {validation.status === "valid" && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
            <CircleCheck aria-hidden="true" className="size-3.5 shrink-0" />
            Valid JSON
          </span>
        )}
        {validation.status === "invalid" && (
          <span className={cn(
            "flex items-center gap-1.5 text-xs text-destructive",
            "max-w-64 truncate"
          )}>
            <CircleX aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="truncate">
              {validation.error || "Invalid JSON"}
            </span>
          </span>
        )}
      </div>

      {/* Secondary actions */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onCopy}
        disabled={!hasOutput}
        aria-label="Copy output"
      >
        <Copy aria-hidden="true" />
        {copied ? "Copied" : "Copy"}
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={onClear}
        aria-label="Clear input and output"
      >
        <Eraser aria-hidden="true" />
        Clear
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={onExample}
        aria-label="Load example JSON"
      >
        <WrapText aria-hidden="true" />
        Example
      </Button>
    </div>
  )
}

export { JsonToolbar }
