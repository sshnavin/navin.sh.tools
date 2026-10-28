import { ToolCard } from "@/components/tools/tool-card"
import type { ToolDefinition } from "@/lib/tools/types"

// ---------------------------------------------------------------------------
// ToolGrid
// ---------------------------------------------------------------------------

interface ToolGridProps {
  tools: ToolDefinition[]
}

/**
 * Renders a responsive grid of ToolCard components.
 *
 * Column counts:
 *   - 1 column   < sm  (< 640px)
 *   - 2 columns  sm–lg (640px – 1024px)
 *   - 3 columns  lg+   (≥ 1024px)
 *
 * Contains no registry lookup logic — the caller is responsible for
 * providing the correct slice of tools.
 */
function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No tools in this category yet.
      </p>
    )
  }

  return (
    <ul
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Tools"
    >
      {tools.map((tool) => (
        <li key={tool.id}>
          <ToolCard tool={tool} className="h-full" />
        </li>
      ))}
    </ul>
  )
}

export { ToolGrid }
