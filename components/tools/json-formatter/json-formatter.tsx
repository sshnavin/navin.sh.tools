"use client"

import * as React from "react"
import { trackEvent } from "@/lib/analytics"
import {
  formatJson,
  minifyJson,
  type JsonIndentation,
} from "@/lib/tools/json/format-json"
import { JsonToolbar } from "./json-toolbar"
import { JsonInputPanel, JsonOutputPanel, type ValidationState } from "./json-panel"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOOL_SLUG = "json-formatter"

const EXAMPLE_JSON = `{
  "name": "navin.sh",
  "type": "developer tools",
  "features": [
    "JSON formatter",
    "JWT decoder",
    "image tools"
  ],
  "localProcessing": true
}`

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Classifies an input string length into a coarse bucket for analytics.
 * Never sends exact byte counts or content-derived values.
 */
function sizeOf(input: string): "small" | "medium" | "large" {
  const bytes = new TextEncoder().encode(input).length
  if (bytes < 1_024) return "small"
  if (bytes < 51_200) return "medium"
  return "large"
}

// ---------------------------------------------------------------------------
// JsonFormatter
// ---------------------------------------------------------------------------

/**
 * Interactive JSON Formatter Client Component.
 *
 * All JSON processing happens entirely in the browser.
 * No JSON data is sent to any server, analytics service, or external endpoint.
 *
 * Responsibilities:
 *   - Manage input / output / validation / indentation state
 *   - Delegate JSON logic to pure functions in lib/tools/json/format-json
 *   - Delegate analytics to the trackEvent abstraction
 *   - Render toolbar and panels
 */
function JsonFormatter() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [outputMode, setOutputMode] = React.useState<"formatted" | "minified">("formatted")
  const [indentation, setIndentation] = React.useState<JsonIndentation>(2)
  const [validation, setValidation] = React.useState<ValidationState>({
    status: "idle",
  })
  const [copied, setCopied] = React.useState(false)

  // -------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------

  function handleFormat() {
    // Track usage — safe metadata only, never input content
    trackEvent({
      name: "tool_used",
      tool_slug: TOOL_SLUG,
      action: "format",
      input_size_bucket: input.trim() ? sizeOf(input) : undefined,
    })

    const result = formatJson(input, indentation)

    if (result.success) {
      setOutput(result.value)
      setOutputMode("formatted")
      setValidation(
        input.trim() === "" ? { status: "idle" } : { status: "valid" }
      )
      if (input.trim() !== "") {
        trackEvent({ name: "tool_completed", tool_slug: TOOL_SLUG, action: "format" })
      }
    } else {
      // On failure, preserve the existing output so users don't lose context
      setValidation({ status: "invalid", error: result.error })
      trackEvent({
        name: "tool_error",
        tool_slug: TOOL_SLUG,
        action: "format",
        error_type: "invalid_json",
      })
    }
  }

  // -------------------------------------------------------------------------
  // Minify
  // -------------------------------------------------------------------------

  function handleMinify() {
    trackEvent({
      name: "tool_used",
      tool_slug: TOOL_SLUG,
      action: "minify",
      input_size_bucket: input.trim() ? sizeOf(input) : undefined,
    })

    const result = minifyJson(input)

    if (result.success) {
      setOutput(result.value)
      setOutputMode("minified")
      setValidation(
        input.trim() === "" ? { status: "idle" } : { status: "valid" }
      )
      if (input.trim() !== "") {
        trackEvent({ name: "tool_completed", tool_slug: TOOL_SLUG, action: "minify" })
      }
    } else {
      setValidation({ status: "invalid", error: result.error })
      trackEvent({
        name: "tool_error",
        tool_slug: TOOL_SLUG,
        action: "minify",
        error_type: "invalid_json",
      })
    }
  }

  // -------------------------------------------------------------------------
  // Copy
  // -------------------------------------------------------------------------

  async function handleCopy() {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      // Auto-reset after 2 s
      setTimeout(() => setCopied(false), 2_000)
    } catch {
      // Clipboard may be denied (e.g. non-HTTPS dev, permission denied).
      // Fail silently — the user can still select-all in the output panel.
    }
  }

  // -------------------------------------------------------------------------
  // Clear
  // -------------------------------------------------------------------------

  function handleClear() {
    setInput("")
    setOutput("")
    setOutputMode("formatted")
    setValidation({ status: "idle" })
    setCopied(false)
  }

  // -------------------------------------------------------------------------
  // Example
  // -------------------------------------------------------------------------

  function handleExample() {
    setInput(EXAMPLE_JSON)
    // Auto-format the example so users immediately see the result
    const result = formatJson(EXAMPLE_JSON, indentation)
    if (result.success) {
      setOutput(result.value)
      setOutputMode("formatted")
      setValidation({ status: "valid" })
    }
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <JsonToolbar
        indentation={indentation}
        validation={validation}
        hasOutput={output.length > 0}
        copied={copied}
        onFormat={handleFormat}
        onMinify={handleMinify}
        onCopy={handleCopy}
        onClear={handleClear}
        onExample={handleExample}
        onIndentationChange={setIndentation}
      />

      {/*
       * Two-panel layout:
       *   desktop → side-by-side (lg:flex-row)
       *   mobile  → stacked     (flex-col)
       */}
      {/*
       * Fixed-height container: panels fill this height and scroll internally.
       * On mobile the panels stack, so each gets half the total height via
       * flex-1 + min-h-0. On desktop they sit side-by-side at full height.
       */}
      <div className="flex h-[32rem] flex-col gap-4 lg:h-[36rem] lg:flex-row">
        <JsonInputPanel
          value={input}
          onChange={setInput}
          onFormat={handleFormat}
        />
        <JsonOutputPanel value={output} outputMode={outputMode} />
      </div>

      {/* Keyboard hint */}
      <p className="text-right text-xs text-muted-foreground/60">
        <kbd className="font-mono">⌘</kbd>
        <span aria-hidden="true"> / </span>
        <kbd className="font-mono">Ctrl</kbd>
        {" + "}
        <kbd className="font-mono">↵</kbd>
        {" to format"}
      </p>
    </div>
  )
}

export { JsonFormatter }
