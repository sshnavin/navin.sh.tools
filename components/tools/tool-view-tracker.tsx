"use client"

import * as React from "react"
import { trackEvent } from "@/lib/analytics"

// ---------------------------------------------------------------------------
// useToolViewTracked
// ---------------------------------------------------------------------------

/**
 * Fires a tool_open analytics event once when the component mounts.
 *
 * Use this in any Client Component that represents a tool page view —
 * for example, the interactive tool UI itself once implemented.
 *
 * source: "direct" means the user arrived without passing through the
 * discovery page, command palette, or related tools.
 */
export function useToolViewTracked(toolSlug: string): void {
  React.useEffect(() => {
    trackEvent({
      name: "tool_open",
      tool_slug: toolSlug,
      source: "direct",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// ---------------------------------------------------------------------------
// ToolViewTracker
// ---------------------------------------------------------------------------

/**
 * Thin wrapper so ToolPageLayout (a Server Component) can embed this
 * as a JSX element without becoming a Client Component itself.
 *
 * Renders nothing — exists only to call useToolViewTracked on mount.
 * When a tool page has its own interactive Client Component, call
 * useToolViewTracked() directly in that component instead and remove this.
 */
export function ToolViewTracker({ toolSlug }: { toolSlug: string }) {
  useToolViewTracked(toolSlug)
  return null
}
