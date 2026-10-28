// ---------------------------------------------------------------------------
// Analytics abstraction
//
// Application code imports from here — never calls gtag directly.
// This keeps domain components decoupled from Google Analytics.
//
// The abstraction safely no-ops when:
//   - GA is not configured (NEXT_PUBLIC_GA_MEASUREMENT_ID not set)
//   - window is not available (SSR / static generation)
//   - gtag has not yet initialised
//
// Rules:
//   - Never send user-generated content (queries, file names, tool input/output)
//   - Track actions, not data
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Event type definitions
// ---------------------------------------------------------------------------

export interface ToolSearchEvent {
  name: "tool_search"
  /** Sanitised search term — only send when non-empty and intentional. */
  query: string
  /** Number of results returned. */
  result_count: number
}

export interface ToolOpenEvent {
  name: "tool_open"
  /** Tool slug, e.g. "json-formatter". */
  tool_slug: string
  /** Where the navigation originated. */
  source: "discovery_page" | "command_palette" | "related_tools" | "direct"
}

export interface CommandPaletteOpenEvent {
  name: "command_palette_open"
  /** How the palette was triggered. */
  trigger: "keyboard_shortcut" | "button"
}

export interface PostOpenEvent {
  name: "post_open"
  /** Post slug. */
  post_slug: string
}

/**
 * Fired when a user invokes a tool action (e.g. format, minify).
 * Never include user input, output, or any content-derived data.
 */
export interface ToolUsedEvent {
  name: "tool_used"
  /** Tool slug, e.g. "json-formatter". */
  tool_slug: string
  /** The specific action taken, e.g. "format" | "minify". */
  action: string
  /**
   * Coarse size bucket — never an exact byte count or content sample.
   * "small" < 1 KB, "medium" < 50 KB, "large" >= 50 KB.
   */
  input_size_bucket?: "small" | "medium" | "large"
}

/**
 * Fired when a tool action succeeds.
 * Never include user input, output, or any content-derived data.
 */
export interface ToolCompletedEvent {
  name: "tool_completed"
  /** Tool slug, e.g. "json-formatter". */
  tool_slug: string
  /** The specific action that completed, e.g. "format" | "minify". */
  action: string
}

/**
 * Fired when a tool action fails due to user input error.
 * Never include the actual error message or any user content.
 */
export interface ToolErrorEvent {
  name: "tool_error"
  /** Tool slug, e.g. "json-formatter". */
  tool_slug: string
  /** The action that was attempted, e.g. "format" | "minify". */
  action: string
  /** Category of error — safe enumerated value, never user content. */
  error_type: "invalid_json" | "unknown"
}

export type AnalyticsEvent =
  | ToolSearchEvent
  | ToolOpenEvent
  | CommandPaletteOpenEvent
  | PostOpenEvent
  | ToolUsedEvent
  | ToolCompletedEvent
  | ToolErrorEvent

// ---------------------------------------------------------------------------
// gtag type shim
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params?: Record<string, unknown>
    ) => void
  }
}

// ---------------------------------------------------------------------------
// trackEvent
// ---------------------------------------------------------------------------

/**
 * Sends a typed analytics event to Google Analytics.
 *
 * Safe to call unconditionally — silently no-ops if GA is not available.
 */
export function trackEvent(event: AnalyticsEvent): void {
  // Guard: must be in a browser context with gtag loaded.
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return
  }

  const { name, ...params } = event
  window.gtag("event", name, params)
}
