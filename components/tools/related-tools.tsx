import { ToolCard } from "@/components/tools/tool-card"
import { getToolsByCategory } from "@/lib/tools/registry"
import type { ToolDefinition } from "@/lib/tools/types"

// ---------------------------------------------------------------------------
// RelatedTools
// ---------------------------------------------------------------------------

interface RelatedToolsProps {
  /** The tool currently being viewed — excluded from results. */
  currentTool: ToolDefinition
  /** Maximum number of related tools to show. */
  limit?: number
}

/**
 * Surfaces a small set of related tools from the same category, excluding
 * the tool currently being viewed.
 *
 * Strategy: same category → exclude current → take up to `limit`.
 * Simple and deterministic — no scoring, no registry modifications needed.
 */
function RelatedTools({ currentTool, limit = 3 }: RelatedToolsProps) {
  const related = getToolsByCategory(currentTool.category)
    .filter((t) => t.id !== currentTool.id)
    .slice(0, limit)

  if (related.length === 0) return null

  return (
    <section aria-labelledby="related-tools-heading">
      <h2
        id="related-tools-heading"
        className="mb-4 text-sm font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <li key={tool.id}>
            <ToolCard tool={tool} className="h-full" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export { RelatedTools }
