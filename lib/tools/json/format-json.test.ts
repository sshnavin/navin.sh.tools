// ---------------------------------------------------------------------------
// Unit tests for JSON formatting domain logic
//
// Run with:  npx vitest run lib/tools/json/format-json.test.ts
//
// These tests are pure Node — no browser, no React, no mocks required.
// ---------------------------------------------------------------------------

import { describe, it, expect } from "vitest"
import { formatJson, minifyJson, validateJson } from "./format-json"

// ---------------------------------------------------------------------------
// formatJson
// ---------------------------------------------------------------------------

describe("formatJson", () => {
  // -------------------------------------------------------------------------
  // Valid inputs
  // -------------------------------------------------------------------------

  it("formats a simple object with 2-space indentation", () => {
    const result = formatJson('{"a":1}', 2)
    expect(result).toEqual({ success: true, value: '{\n  "a": 1\n}' })
  })

  it("formats a simple object with 4-space indentation", () => {
    const result = formatJson('{"a":1}', 4)
    expect(result).toEqual({ success: true, value: '{\n    "a": 1\n}' })
  })

  it("formats a simple object with tab indentation", () => {
    const result = formatJson('{"a":1}', "tab")
    expect(result).toEqual({ success: true, value: '{\n\t"a": 1\n}' })
  })

  it("formats a nested object", () => {
    const input = '{"outer":{"inner":42}}'
    const result = formatJson(input, 2)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value).toContain('"outer"')
      expect(result.value).toContain('"inner"')
      expect(result.value).toContain("42")
      // Should be multi-line
      expect(result.value.split("\n").length).toBeGreaterThan(1)
    }
  })

  it("formats an array", () => {
    const input = '[1,2,3]'
    const result = formatJson(input, 2)
    expect(result).toEqual({
      success: true,
      value: "[\n  1,\n  2,\n  3\n]",
    })
  })

  it("formats an array of objects", () => {
    const input = '[{"x":1},{"x":2}]'
    const result = formatJson(input, 2)
    expect(result.success).toBe(true)
  })

  // -------------------------------------------------------------------------
  // JSON primitives (valid JSON root values)
  // -------------------------------------------------------------------------

  it("handles null as a valid JSON primitive", () => {
    const result = formatJson("null", 2)
    expect(result).toEqual({ success: true, value: "null" })
  })

  it("handles true as a valid JSON primitive", () => {
    const result = formatJson("true", 2)
    expect(result).toEqual({ success: true, value: "true" })
  })

  it("handles false as a valid JSON primitive", () => {
    const result = formatJson("false", 2)
    expect(result).toEqual({ success: true, value: "false" })
  })

  it("handles a number as a valid JSON primitive", () => {
    const result = formatJson("123", 2)
    expect(result).toEqual({ success: true, value: "123" })
  })

  it("handles a string as a valid JSON primitive", () => {
    const result = formatJson('"hello"', 2)
    expect(result).toEqual({ success: true, value: '"hello"' })
  })

  // -------------------------------------------------------------------------
  // Empty / whitespace input
  // -------------------------------------------------------------------------

  it("returns empty string for empty input without an error", () => {
    const result = formatJson("", 2)
    expect(result).toEqual({ success: true, value: "" })
  })

  it("returns empty string for whitespace-only input without an error", () => {
    const result = formatJson("   \n\t  ", 2)
    expect(result).toEqual({ success: true, value: "" })
  })

  // -------------------------------------------------------------------------
  // Invalid inputs
  // -------------------------------------------------------------------------

  it("returns failure for invalid JSON without throwing", () => {
    const result = formatJson("{bad json}", 2)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(typeof result.error).toBe("string")
      expect(result.error.length).toBeGreaterThan(0)
    }
  })

  it("returns failure for trailing comma", () => {
    const result = formatJson('{"a":1,}', 2)
    expect(result.success).toBe(false)
  })

  it("returns failure for single-quoted strings", () => {
    const result = formatJson("{'a':1}", 2)
    expect(result.success).toBe(false)
  })

  it("returns failure for bare identifiers", () => {
    const result = formatJson("undefined", 2)
    expect(result.success).toBe(false)
  })

  it("does not silently repair malformed JSON", () => {
    // This looks like JSON but has an unquoted key — should fail
    const result = formatJson("{a: 1}", 2)
    expect(result.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// minifyJson
// ---------------------------------------------------------------------------

describe("minifyJson", () => {
  it("minifies a formatted object", () => {
    const input = '{\n  "a": 1,\n  "b": 2\n}'
    const result = minifyJson(input)
    expect(result).toEqual({ success: true, value: '{"a":1,"b":2}' })
  })

  it("minifies a formatted array", () => {
    const input = "[\n  1,\n  2,\n  3\n]"
    const result = minifyJson(input)
    expect(result).toEqual({ success: true, value: "[1,2,3]" })
  })

  it("minifies already-minified JSON without change", () => {
    const input = '{"a":1}'
    const result = minifyJson(input)
    expect(result).toEqual({ success: true, value: '{"a":1}' })
  })

  it("handles null primitive", () => {
    const result = minifyJson("null")
    expect(result).toEqual({ success: true, value: "null" })
  })

  it("handles number primitive", () => {
    const result = minifyJson("42")
    expect(result).toEqual({ success: true, value: "42" })
  })

  it("returns empty string for empty input without error", () => {
    const result = minifyJson("")
    expect(result).toEqual({ success: true, value: "" })
  })

  it("returns failure for invalid JSON without throwing", () => {
    const result = minifyJson("{bad}")
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(typeof result.error).toBe("string")
    }
  })
})

// ---------------------------------------------------------------------------
// validateJson
// ---------------------------------------------------------------------------

describe("validateJson", () => {
  it("validates a simple object", () => {
    const result = validateJson('{"a":1}')
    expect(result).toEqual({ success: true })
  })

  it("validates an array", () => {
    const result = validateJson("[1, 2, 3]")
    expect(result).toEqual({ success: true })
  })

  it("validates null primitive", () => {
    const result = validateJson("null")
    expect(result).toEqual({ success: true })
  })

  it("validates boolean primitives", () => {
    expect(validateJson("true")).toEqual({ success: true })
    expect(validateJson("false")).toEqual({ success: true })
  })

  it("validates number primitives", () => {
    expect(validateJson("0")).toEqual({ success: true })
    expect(validateJson("-1.5")).toEqual({ success: true })
  })

  it("validates string primitives", () => {
    expect(validateJson('"hello"')).toEqual({ success: true })
  })

  it("returns success for empty input without treating it as an error", () => {
    expect(validateJson("")).toEqual({ success: true })
    expect(validateJson("  ")).toEqual({ success: true })
  })

  it("returns failure with an error message for invalid JSON", () => {
    const result = validateJson("{invalid}")
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(typeof result.error).toBe("string")
      expect(result.error.length).toBeGreaterThan(0)
    }
  })

  it("returns failure for trailing comma", () => {
    expect(validateJson('{"a":1,}')).toMatchObject({ success: false })
  })

  it("returns failure for bare undefined", () => {
    expect(validateJson("undefined")).toMatchObject({ success: false })
  })
})
