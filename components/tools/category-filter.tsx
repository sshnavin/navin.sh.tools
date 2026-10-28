"use client"

import * as React from "react"
import { cn } from "cn"
import type { CategoryDefinition } from "@/lib/tools/categories"
import type { ToolCategory } from "@/lib/tools/types"

// ---------------------------------------------------------------------------
// CategoryFilter
// ---------------------------------------------------------------------------

/** Sentinel value for the "show all" option. */
export const ALL_CATEGORY = "all" as const
export type FilterValue = ToolCategory | typeof ALL_CATEGORY

interface CategoryFilterProps {
  /** Categories that have at least one registered tool. */
  categories: CategoryDefinition[]
  selected: FilterValue
  onChange: (value: FilterValue) => void
}

/**
 * A compact, accessible category filter strip.
 *
 * - Renders a plain button group — no Toggle primitive needed here because
 *   these are exclusive single-select controls that behave like radio buttons.
 * - Uses aria-pressed on each button and communicates the selected state to
 *   screen readers via aria-current="true".
 * - Keyboard accessible out of the box (buttons are focusable and respond to
 *   Enter/Space).
 */
function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  const items: Array<{ id: FilterValue; label: string }> = [
    { id: ALL_CATEGORY, label: "All" },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
  ]

  return (
    <div
      role="group"
      aria-label="Filter tools by category"
      className="flex flex-wrap gap-1.5"
    >
      {items.map((item) => {
        const isSelected = selected === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-pressed={isSelected}
            aria-current={isSelected ? "true" : undefined}
            className={cn(
              // Base shape — compact pill-style, distinct from nav buttons
              "inline-flex h-7 items-center rounded-sm px-3",
              "text-xs font-medium tracking-wide",
              "transition-colors outline-none",
              // Focus ring consistent with rest of site
              "focus-visible:ring-2 focus-visible:ring-ring/50",
              // Selected state
              isSelected
                ? "bg-foreground text-background"
                : "border border-border bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export { CategoryFilter }
