import type { ToolCategory } from "./types"

// ---------------------------------------------------------------------------
// Category metadata
// ---------------------------------------------------------------------------

export interface CategoryDefinition {
  id: ToolCategory
  name: string
  description: string
}

/**
 * Presentation-independent metadata for every tool category.
 * Order here controls the default display order across the site.
 */
export const categories: CategoryDefinition[] = [
  {
    id: "developer",
    name: "Developer",
    description: "Utilities for working with code, APIs and data.",
  },
  {
    id: "files",
    name: "Files",
    description: "Tools for manipulating, merging and converting files.",
  },
  {
    id: "image",
    name: "Image",
    description: "Compress, convert and inspect images in your browser.",
  },
  {
    id: "frontend",
    name: "Frontend",
    description: "Helpers for CSS, markup and browser-side development.",
  },
  {
    id: "text",
    name: "Text",
    description: "Transform, clean and analyse plain text.",
  },
  {
    id: "calculators",
    name: "Calculators",
    description: "Quick calculation tools for everyday and technical use.",
  },
  {
    id: "everyday",
    name: "Everyday",
    description: "General-purpose tools for day-to-day tasks.",
  },
]

/**
 * A typed map for O(1) category lookups by id.
 * Built once from the ordered array above.
 */
export const categoryMap: Readonly<Record<ToolCategory, CategoryDefinition>> =
  Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
    ToolCategory,
    CategoryDefinition
  >
