"use client"

import * as React from "react"
import { cn } from "cn"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ValidationState =
  | { status: "idle" }
  | { status: "valid" }
  | { status: "invalid"; error: string }

interface JsonInputPanelProps {
  value: string
  onChange: (value: string) => void
  onFormat: () => void
}

interface JsonOutputPanelProps {
  value: string
}

// ---------------------------------------------------------------------------
// JsonInputPanel
// ---------------------------------------------------------------------------

/**
 * Editable textarea for JSON input.
 *
 * - Monospace font, comfortable height.
 * - Cmd/Ctrl+Enter triggers format (passed via onFormat prop).
 * - Spellcheck disabled — JSON is code, not prose.
 * - Tab key inserts two spaces by default; Escape restores normal tab
 *   behaviour so keyboard users are never trapped.
 */
function JsonInputPanel({ value, onChange, onFormat }: JsonInputPanelProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [tabTrapped, setTabTrapped] = React.useState(true)

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Cmd/Ctrl + Enter → format
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      onFormat()
      return
    }

    // Escape → stop trapping Tab (accessibility escape hatch)
    if (e.key === "Escape") {
      setTabTrapped(false)
      return
    }

    // Tab → insert spaces (only while trapped)
    if (e.key === "Tab" && tabTrapped) {
      e.preventDefault()
      const el = e.currentTarget
      const start = el.selectionStart
      const end = el.selectionEnd
      const spaces = "  "
      const next = value.slice(0, start) + spaces + value.slice(end)
      onChange(next)
      // Restore cursor after the inserted spaces
      requestAnimationFrame(() => {
        el.selectionStart = start + spaces.length
        el.selectionEnd = start + spaces.length
      })
      // Re-enable trap on next keystroke
      return
    }

    // Any other key re-enables Tab trap
    if (e.key !== "Tab") {
      setTabTrapped(true)
    }
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
      <label
        htmlFor="json-input"
        className="shrink-0 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        Input
      </label>

      {/*
       * min-h-0 is required here: without it, a flex child with flex-1 still
       * uses its content height as its minimum, which defeats the scrolling.
       */}
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <textarea
          ref={textareaRef}
          id="json-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={`Paste or type JSON here…\nPress Cmd/Ctrl+Enter to format.`}
          aria-label="JSON input"
          aria-describedby="json-input-hint"
          className={cn(
            // Layout — fill the wrapper, scroll internally, never grow the page
            "h-full w-full resize-none overflow-auto",
            // Typography — monospace, matches site font
            "font-mono text-sm leading-relaxed",
            // Visual
            "rounded-sm border border-border bg-muted/40",
            "px-4 py-3",
            // Interaction
            "transition-[border-color] outline-none",
            "placeholder:text-muted-foreground/50",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          )}
        />
      </div>

      <p id="json-input-hint" className="sr-only">
        Press Cmd+Enter or Ctrl+Enter to format. Press Escape then Tab to move
        focus out of the editor.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// JsonOutputPanel
// ---------------------------------------------------------------------------

/**
 * Read-only output panel.
 *
 * Uses a `<pre>` element so whitespace is preserved exactly, long lines
 * scroll horizontally within the panel rather than breaking the page layout.
 */
function JsonOutputPanel({ value }: JsonOutputPanelProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
      <span
        id="json-output-label"
        className="shrink-0 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        Output
      </span>

      {/*
       * min-h-0 on the pre prevents it from using intrinsic content height
       * as a flex minimum. overflow-auto + h-full makes it scroll in place.
       */}
      <pre
        role="region"
        aria-labelledby="json-output-label"
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          // Layout — fill the column, scroll internally
          "min-h-0 flex-1 overflow-auto",
          // Typography
          "font-mono text-sm leading-relaxed",
          // Visual
          "w-full rounded-sm border border-border bg-muted/40",
          "px-4 py-3",
          // Long lines scroll horizontally, never wrap
          "whitespace-pre",
          // Accessible selection
          "select-text",
          // Subtle when empty
          value ? "text-foreground" : "text-muted-foreground/40"
        )}
      >
        {value || "Output will appear here…"}
      </pre>

    </div>
  )
}

export type { ValidationState }
export { JsonInputPanel, JsonOutputPanel }
