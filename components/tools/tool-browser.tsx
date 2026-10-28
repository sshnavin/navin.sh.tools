"use client"

import * as React from "react"
import { XIcon, SearchIcon } from "lucide-react"
import { CategoryFilter, ALL_CATEGORY } from "@/components/tools/category-filter"
import type { FilterValue } from "@/components/tools/category-filter"
import { ToolGrid } from "@/components/tools/tool-grid"
import { searchTools } from "@/lib/tools/search"
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
 * Client Component that owns both search query and category filter state.
 *
 * Filtering pipeline:
 *   1. searchTools(tools, query)  — shared utility, case/whitespace insensitive
 *   2. category filter            — applied on top of search results
 *
 * The full tool list is in the initial SSG HTML (query="" + category="all"),
 * so all tools remain indexable by search engines.
 */
function ToolBrowser({ tools, categories }: ToolBrowserProps) {
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<FilterValue>(ALL_CATEGORY)

  // Derive visible tools: search first, then category filter on top.
  const searchedTools = searchTools(tools, query)
  const visibleTools =
    selected === ALL_CATEGORY
      ? searchedTools
      : searchedTools.filter((t) => t.category === selected)

  function clearAll() {
    setQuery("")
    setSelected(ALL_CATEGORY)
  }

  const hasActiveFilter = query.trim() !== "" || selected !== ALL_CATEGORY

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          aria-label="Search tools"
          className="h-9 w-full rounded-sm border border-border bg-transparent py-1 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        {query !== "" && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <XIcon aria-hidden="true" className="size-3.5" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <CategoryFilter
        categories={categories}
        selected={selected}
        onChange={setSelected}
      />

      {/* Tool grid or empty state */}
      {visibleTools.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-muted-foreground">No tools found.</p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearAll}
              className="mt-3 text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Clear search and filters
            </button>
          )}
        </div>
      ) : (
        <ToolGrid tools={visibleTools} />
      )}
    </div>
  )
}

export { ToolBrowser }
