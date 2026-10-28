// ---------------------------------------------------------------------------
// JSON formatting domain logic
//
// Pure functions with no side-effects, no React, no browser APIs.
// Safe to call from any context — component, test, or worker.
//
// Rules:
//   - Never throw expected parsing errors into the caller.
//   - Use JSON.parse as the single source of truth for validity.
//   - Do not attempt to silently repair malformed JSON.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Supported indentation options for JSON formatting. */
export type JsonIndentation = 2 | 4 | "tab"

/**
 * Discriminated union result from any JSON transformation.
 * Callers branch on `success` rather than catching exceptions.
 */
export type JsonTransformResult =
  | { success: true; value: string }
  | { success: false; error: string }

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolves a JsonIndentation value to the string JSON.stringify expects.
 * `2` → `"  "`, `4` → `"    "`, `"tab"` → `"\t"`
 */
function resolveIndent(indentation: JsonIndentation): string | number {
  return indentation === "tab" ? "\t" : indentation
}

/**
 * Extracts a clean, human-readable message from a JSON.parse SyntaxError.
 * Strips V8-specific "JSON.parse: " prefixes for a uniform surface.
 */
function parseErrorMessage(err: unknown): string {
  if (!(err instanceof SyntaxError)) return "Unknown error"
  // V8: "Unexpected token 'x', ..."foo..." is not valid JSON"
  // SpiderMonkey: "JSON.parse: unexpected character at line 1 ..."
  return err.message.replace(/^JSON\.parse:\s*/i, "").trim()
}

// ---------------------------------------------------------------------------
// formatJson
// ---------------------------------------------------------------------------

/**
 * Parses `input` as JSON and re-serialises it with the chosen indentation.
 *
 * Returns `{ success: true, value }` on valid JSON, or
 * `{ success: false, error }` with a human-readable message on failure.
 *
 * Empty / whitespace-only input is not treated as an error — it returns
 * `{ success: true, value: "" }` so callers can display a blank output
 * without a misleading error banner.
 */
export function formatJson(
  input: string,
  indentation: JsonIndentation
): JsonTransformResult {
  if (input.trim() === "") return { success: true, value: "" }

  try {
    const parsed = JSON.parse(input)
    const value = JSON.stringify(parsed, null, resolveIndent(indentation))
    return { success: true, value }
  } catch (err) {
    return { success: false, error: parseErrorMessage(err) }
  }
}

// ---------------------------------------------------------------------------
// minifyJson
// ---------------------------------------------------------------------------

/**
 * Parses `input` as JSON and re-serialises it with no extra whitespace.
 *
 * Returns `{ success: true, value }` on valid JSON, or
 * `{ success: false, error }` on failure.
 *
 * Empty / whitespace-only input returns `{ success: true, value: "" }`.
 */
export function minifyJson(input: string): JsonTransformResult {
  if (input.trim() === "") return { success: true, value: "" }

  try {
    const parsed = JSON.parse(input)
    return { success: true, value: JSON.stringify(parsed) }
  } catch (err) {
    return { success: false, error: parseErrorMessage(err) }
  }
}

// ---------------------------------------------------------------------------
// validateJson
// ---------------------------------------------------------------------------

/**
 * Checks whether `input` is valid JSON without transforming it.
 *
 * Returns `{ success: true }` for valid JSON (including primitives such as
 * `null`, `true`, `123`, `"hello"`).
 *
 * Returns `{ success: false, error }` for invalid JSON.
 *
 * Empty / whitespace-only input returns `{ success: true }` — it is not
 * treated as invalid.
 */
export function validateJson(
  input: string
): { success: true } | { success: false; error: string } {
  if (input.trim() === "") return { success: true }

  try {
    JSON.parse(input)
    return { success: true }
  } catch (err) {
    return { success: false, error: parseErrorMessage(err) }
  }
}
