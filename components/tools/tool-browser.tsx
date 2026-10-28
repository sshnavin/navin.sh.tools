"use client"

import * as React from "react"
import { CategoryFilter, ALL_CATEGORY } from "@/components/tools/category-filter"
import type { FilterValue } from "@/components/tools/category-filter"
import { ToolGrid } from "@/components/tools/tool-grid"
import type { CategoryDefinition } from "@/lib/tools/categories"
import type { ToolDefinition } from "@/lib/tools/types"

// ---------------------------------------------------------------------------
// ToolBrowser
// ---------------------------------------------------------------------------

interface ToolBrowserProps {
  /** All registered tools — passed in from the Server Component page. */
  tools: ToolDefinition[]
  /**
   * Only categories that have at least one registered tool.
   * Derived at the page level so this component stays free of registry calls.
   */
  categories: CategoryDefinition[]
}

/**
 * The only Client Component in the tools page tree.
 *
 * Owns category filter state and derives the visible tool slice from it.
 * The full tool list is server-rendered in the initial HTML (as the default
 * "all" state), so all tools are discoverable by search engines regardless of
 * JavaScript availability.
 */
function ToolBrowser({ tools, categories }: ToolBrowserProps) {
  const [selected, setSelected] = React.useState<FilterValue>(ALL_CATEGORY)

  const visibleTools =
    selected === ALL_CATEGORY
      ? tools
      : tools.filter((t) => t.category === selected)

  return (
    <div className="space-y-6">
      <CategoryFilter
        categories={categories}
        selected={selected}
        onChange={setSelected}
      />
      <ToolGrid tools={visibleTools} />
    </div>
  )
}

export { ToolBrowser }
