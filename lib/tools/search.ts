import type { ToolDefinition } from "./types"

// ---------------------------------------------------------------------------
// Tool search utility
//
// Pure TypeScript — no React, no external dependencies.
// Used by both the /tools page ToolBrowser and the global command palette.
// ---------------------------------------------------------------------------

/**
 * Normalises a string for comparison: lowercase and collapse whitespace.
 */
function normalise(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim()
}

/**
 * Searches a list of tools against a query string.
 *
 * Matching is:
 * - Case-insensitive
 * - Whitespace-tolerant (extra spaces are collapsed before comparing)
 * - Substring-based (any field that contains the query is a match)
 *
 * Fields searched, in priority order:
 * 1. name
 * 2. shortDescription
 * 3. keywords (any single keyword)
 * 4. category
 *
 * An empty or whitespace-only query returns the full list unchanged.
 */
export function searchTools(
  tools: ToolDefinition[],
  query: string
): ToolDefinition[] {
  const q = normalise(query)

  if (q === "") return tools

  return tools.filter((tool) => {
    if (normalise(tool.name).includes(q)) return true
    if (normalise(tool.shortDescription).includes(q)) return true
    if (tool.keywords.some((kw) => normalise(kw).includes(q))) return true
    if (normalise(tool.category).includes(q)) return true
    return false
  })
}
