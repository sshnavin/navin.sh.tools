// ---------------------------------------------------------------------------
// Tool category
// ---------------------------------------------------------------------------

export type ToolCategory =
  | "developer"
  | "files"
  | "image"
  | "calculators"
  | "text"
  | "frontend"
  | "everyday"

// ---------------------------------------------------------------------------
// Tool definition
// ---------------------------------------------------------------------------

/**
 * A single tool entry in the registry.
 *
 * `icon` is a string identifier (e.g. a Lucide icon name) rather than an
 * imported component so that this file stays pure TypeScript data with no
 * React or Lucide dependencies.
 */
export interface ToolDefinition {
  /** Stable, unique identifier — never changes even if the slug does. */
  id: string

  /** URL-friendly segment used in /tools/[slug] routes. */
  slug: string

  /** Display name shown in UI. */
  name: string

  /** One-liner shown in cards and search results (≤ 80 chars). */
  shortDescription: string

  /** Longer description used for SEO meta and tool detail pages. */
  description: string

  /** Category the tool belongs to. */
  category: ToolCategory

  /** Terms used for search and discoverability (lowercase). */
  keywords: string[]

  /**
   * Lucide icon name as a string identifier.
   * Import and resolve the component in UI code, not here.
   */
  icon: string

  /** Whether this tool appears in featured / homepage sections. */
  featured: boolean
}
