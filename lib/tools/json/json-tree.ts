// ---------------------------------------------------------------------------
// JSON tree node types
//
// A typed tree built from any parsed JSON value.
// Pure TypeScript — no React, no browser APIs.
// ---------------------------------------------------------------------------

export type JsonNodeType =
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | "null"

export type JsonNode =
  | { type: "object"; entries: { key: string; value: JsonNode }[] }
  | { type: "array"; items: JsonNode[] }
  | { type: "string"; value: string }
  | { type: "number"; value: number }
  | { type: "boolean"; value: boolean }
  | { type: "null" }

// ---------------------------------------------------------------------------
// parseToNode
// ---------------------------------------------------------------------------

/**
 * Converts any parsed JSON value (the result of JSON.parse) into a typed
 * JsonNode tree. The tree is used by the interactive tree view renderer.
 *
 * Accepts `unknown` — callers pass the raw JSON.parse output without casting.
 */
export function parseToNode(value: unknown): JsonNode {
  if (value === null) return { type: "null" }
  if (typeof value === "boolean") return { type: "boolean", value }
  if (typeof value === "number") return { type: "number", value }
  if (typeof value === "string") return { type: "string", value }

  if (Array.isArray(value)) {
    return { type: "array", items: value.map(parseToNode) }
  }

  if (typeof value === "object") {
    return {
      type: "object",
      entries: Object.entries(value as Record<string, unknown>).map(
        ([key, val]) => ({ key, value: parseToNode(val) })
      ),
    }
  }

  // Fallback — undefined, functions, symbols, etc. are not valid JSON values
  // but JSON.parse never produces them so this branch is unreachable in practice.
  return { type: "null" }
}
