import type { ToolCategory, ToolDefinition } from "./types"

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

/**
 * Central registry of all tools available on navin.sh/tools.
 *
 * Rules:
 * - Pure TypeScript data — no React, no Lucide imports.
 * - `id` must be stable across renames; use the slug at time of creation.
 * - `icon` is a Lucide icon name string; resolve to a component in UI code.
 * - `keywords` are lowercase and drive search + discoverability.
 */
export const tools: ToolDefinition[] = [
  // -------------------------------------------------------------------------
  // Developer
  // -------------------------------------------------------------------------
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Prettify and validate JSON with syntax highlighting.",
    description:
      "Paste raw or minified JSON to format it with 2-space, 4-space, or tab indentation, or strip all whitespace to produce a compact single-line result. Validates structure using the browser's native JSON parser and reports clear error messages so you can pinpoint exactly what's wrong. Everything runs locally in your browser — your JSON never leaves your machine.",
    category: "developer",
    keywords: [
      "json",
      "format",
      "prettify",
      "beautify",
      "validate",
      "lint",
      "minify",
    ],
    icon: "Braces",
    featured: true,
  },
  {
    id: "json-to-typescript",
    slug: "json-to-typescript",
    name: "JSON to TypeScript",
    shortDescription: "Generate TypeScript interfaces from a JSON sample.",
    description:
      "Paste a JSON object or array and get idiomatic TypeScript interface definitions in return. Handles nested objects, arrays, optional fields and union types automatically.",
    category: "developer",
    keywords: [
      "json",
      "typescript",
      "interface",
      "type",
      "generate",
      "convert",
      "schema",
    ],
    icon: "FileCode2",
    featured: true,
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    shortDescription: "Decode and inspect JWT header, payload and signature.",
    description:
      "Paste any JSON Web Token and instantly see its decoded header and payload. Highlights expiry, issued-at and custom claims. Nothing leaves your browser — decoding is done entirely client-side.",
    category: "developer",
    keywords: [
      "jwt",
      "json web token",
      "decode",
      "auth",
      "bearer",
      "claims",
      "header",
      "payload",
      "signature",
    ],
    icon: "KeyRound",
    featured: true,
  },
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    shortDescription: "Convert Unix timestamps to human-readable dates.",
    description:
      "Convert between Unix timestamps (seconds or milliseconds) and readable date-time strings in any timezone. Supports ISO 8601, RFC 2822, and custom format output.",
    category: "developer",
    keywords: [
      "timestamp",
      "unix",
      "epoch",
      "date",
      "time",
      "convert",
      "iso",
      "utc",
      "timezone",
    ],
    icon: "Clock",
    featured: true,
  },
  {
    id: "base64",
    slug: "base64",
    name: "Base64 Encoder / Decoder",
    shortDescription: "Encode or decode Base64 strings and files.",
    description:
      "Encode plain text or binary data to Base64, or decode Base64 back to its original form. Supports standard and URL-safe alphabets, and handles data URIs for images.",
    category: "developer",
    keywords: [
      "base64",
      "encode",
      "decode",
      "binary",
      "data uri",
      "btoa",
      "atob",
      "url safe",
    ],
    icon: "Binary",
    featured: false,
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    shortDescription: "Percent-encode or decode URLs and query strings.",
    description:
      "Encode special characters in URLs using percent-encoding, or decode encoded URLs back to a readable form. Handles full URLs, individual query parameters, and fragments.",
    category: "developer",
    keywords: [
      "url",
      "encode",
      "decode",
      "percent encoding",
      "uri",
      "query string",
      "escape",
      "unescape",
    ],
    icon: "Link",
    featured: false,
  },

  // -------------------------------------------------------------------------
  // Files
  // -------------------------------------------------------------------------
  {
    id: "merge-pdf",
    slug: "merge-pdf",
    name: "Merge PDFs",
    shortDescription: "Combine multiple PDF files into one document.",
    description:
      "Drag and drop multiple PDF files to merge them into a single document. Reorder pages before exporting. Processing happens entirely in your browser — files are never uploaded to a server.",
    category: "files",
    keywords: [
      "pdf",
      "merge",
      "combine",
      "join",
      "document",
      "pages",
      "concatenate",
    ],
    icon: "FilePlus2",
    featured: true,
  },
  {
    id: "split-pdf",
    slug: "split-pdf",
    name: "Split PDF",
    shortDescription: "Extract pages or ranges from a PDF file.",
    description:
      "Upload a PDF and select the pages or page ranges you want to extract. Download individual pages or a subset as a new PDF file. Runs fully in the browser with no server upload.",
    category: "files",
    keywords: [
      "pdf",
      "split",
      "extract",
      "pages",
      "range",
      "document",
      "divide",
    ],
    icon: "Scissors",
    featured: false,
  },

  // -------------------------------------------------------------------------
  // Image
  // -------------------------------------------------------------------------
  {
    id: "image-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    shortDescription: "Compress JPEG, PNG and WebP images in your browser.",
    description:
      "Reduce image file sizes without noticeable quality loss. Supports JPEG, PNG and WebP. Adjust compression quality, preview the result side-by-side, and download the optimised file — all locally.",
    category: "image",
    keywords: [
      "image",
      "compress",
      "optimise",
      "optimize",
      "jpeg",
      "png",
      "webp",
      "reduce",
      "size",
      "file size",
    ],
    icon: "ImageDown",
    featured: true,
  },

  // -------------------------------------------------------------------------
  // Everyday
  // -------------------------------------------------------------------------
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: "Unit Converter",
    shortDescription: "Convert between common units of length, weight and more.",
    description:
      "Convert between metric and imperial units across length, weight, temperature, area, volume and speed. Clean interface with instant results as you type.",
    category: "everyday",
    keywords: [
      "unit",
      "convert",
      "metric",
      "imperial",
      "length",
      "weight",
      "temperature",
      "area",
      "volume",
      "speed",
      "measurement",
    ],
    icon: "Ruler",
    featured: true,
  },
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    name: "QR Code Generator",
    shortDescription: "Generate QR codes for URLs, text and more.",
    description:
      "Turn any URL, plain text, email address or phone number into a scannable QR code. Choose size and error-correction level, then download as PNG or SVG.",
    category: "everyday",
    keywords: [
      "qr",
      "qr code",
      "barcode",
      "generate",
      "scan",
      "url",
      "link",
      "share",
    ],
    icon: "QrCode",
    featured: true,
  },

  // -------------------------------------------------------------------------
  // Frontend
  // -------------------------------------------------------------------------
  {
    id: "css-unit-converter",
    slug: "css-unit-converter",
    name: "CSS Unit Converter",
    shortDescription: "Convert between px, rem, em, vw and other CSS units.",
    description:
      "Quickly convert CSS length values between px, rem, em, vw, vh, pt and more. Set a custom root font size for accurate rem calculations. Ideal for translating design specs into CSS.",
    category: "frontend",
    keywords: [
      "css",
      "unit",
      "convert",
      "px",
      "rem",
      "em",
      "vw",
      "vh",
      "pt",
      "responsive",
      "design",
    ],
    icon: "Proportions",
    featured: false,
  },
]

// ---------------------------------------------------------------------------
// Registry helpers
// ---------------------------------------------------------------------------

/**
 * Returns the tool matching `slug`, or `undefined` if not found.
 */
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug)
}

/**
 * Returns all tools belonging to `category`, preserving registry order.
 */
export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return tools.filter((tool) => tool.category === category)
}

/**
 * Returns all tools marked as featured, preserving registry order.
 */
export function getFeaturedTools(): ToolDefinition[] {
  return tools.filter((tool) => tool.featured)
}
