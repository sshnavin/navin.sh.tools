import Link from "next/link"
import { MonitorSmartphone } from "lucide-react"
import { ToolIcon } from "@/components/tools/tool-icon"
import { RelatedTools } from "@/components/tools/related-tools"
import { categoryMap } from "@/lib/tools/categories"
import type { ToolDefinition } from "@/lib/tools/types"

// ---------------------------------------------------------------------------
// ToolPageLayout
// ---------------------------------------------------------------------------

interface ToolPageLayoutProps {
  tool: ToolDefinition
  /**
   * The interactive tool UI. Rendered in a wider breakout area so tools
   * with multi-panel layouts (editor + output, before/after previews, etc.)
   * have room to breathe beyond the site's standard reading-width container.
   */
  children: React.ReactNode
}

/**
 * Shared server-rendered shell for every individual tool page.
 *
 * Structure:
 *   Breadcrumb
 *   Tool header  (icon · h1 · description · privacy note)
 *   ── separator ──
 *   Tool content area  [children — wider breakout]
 *   ── separator ──
 *   About section      [narrower, reading width]
 *   Related tools
 */
function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const category = categoryMap[tool.category]

  return (
    <div className="py-8 sm:py-12">
      {/* ------------------------------------------------------------------ */}
      {/* Breadcrumb                                                          */}
      {/* ------------------------------------------------------------------ */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <li>
            <Link
              href="/tools"
              className="transition-colors hover:text-foreground"
            >
              Tools
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          {/* Category has no route yet — render as plain text */}
          <li>{category?.name ?? tool.category}</li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          <li>
            <span className="text-foreground" aria-current="page">
              {tool.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* Tool header                                                         */}
      {/* ------------------------------------------------------------------ */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">
            <ToolIcon name={tool.icon} className="size-6" />
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {tool.name}
          </h1>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {tool.shortDescription}
        </p>

        {/* Privacy indicator */}
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground/60">
          <MonitorSmartphone aria-hidden="true" className="size-3.5 shrink-0" />
          Runs locally in your browser. No data is sent to a server.
        </p>
      </header>

      <div className="border-t border-border" />

      {/* ------------------------------------------------------------------ */}
      {/* Tool content area                                                   */}
      {/*                                                                     */}
      {/* Breaks out of the site's max-w-3xl reading container so tools with */}
      {/* editor panels, image previews, or multi-column layouts have room.  */}
      {/* The breakout uses negative horizontal margins to escape the parent  */}
      {/* PageContainer, then re-applies padding at a wider max-width.        */}
      {/* ------------------------------------------------------------------ */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* ------------------------------------------------------------------ */}
      {/* About section — narrower for readability                            */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="about-heading"
        className="py-10"
      >
        <h2
          id="about-heading"
          className="mb-3 text-sm font-semibold tracking-tight text-foreground"
        >
          About {tool.name}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          {tool.description}
        </p>
      </section>

      <div className="border-t border-border" />

      {/* ------------------------------------------------------------------ */}
      {/* Related tools                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="pt-10">
        <RelatedTools currentTool={tool} />
      </div>
    </div>
  )
}

export { ToolPageLayout }
