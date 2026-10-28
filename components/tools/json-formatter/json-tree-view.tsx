"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "cn"
import { parseToNode, type JsonNode } from "@/lib/tools/json/json-tree"

// ---------------------------------------------------------------------------
// Primitive value renderers
// ---------------------------------------------------------------------------

function StringValue({ value }: { value: string }) {
  return (
    <span className="text-emerald-700 dark:text-emerald-400">
      &quot;{value}&quot;
    </span>
  )
}

function NumberValue({ value }: { value: number }) {
  return (
    <span className="text-sky-700 dark:text-sky-400">{String(value)}</span>
  )
}

function BooleanValue({ value }: { value: boolean }) {
  return (
    <span className="text-amber-600 dark:text-amber-400">
      {value ? "true" : "false"}
    </span>
  )
}

function NullValue() {
  return (
    <span className="text-muted-foreground/60 italic">null</span>
  )
}

// ---------------------------------------------------------------------------
// Collapsed summary
//
// Shown inline when a node is collapsed — gives a sense of what's inside
// without revealing content.
// ---------------------------------------------------------------------------

function CollapsedSummary({ node }: { node: JsonNode }) {
  if (node.type === "object") {
    const count = node.entries.length
    return (
      <span className="text-muted-foreground/60 text-xs select-none">
        {"{}"} {count === 1 ? "1 key" : `${count} keys`}
      </span>
    )
  }
  if (node.type === "array") {
    const count = node.items.length
    return (
      <span className="text-muted-foreground/60 text-xs select-none">
        {"[]"} {count === 1 ? "1 item" : `${count} items`}
      </span>
    )
  }
  return null
}

// ---------------------------------------------------------------------------
// Toggle button
// ---------------------------------------------------------------------------

function ToggleButton({
  open,
  onClick,
  label,
}: {
  open: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={open}
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-sm",
        "text-muted-foreground/50 transition-colors",
        "hover:bg-muted hover:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "-ml-5 mr-1"
      )}
    >
      <ChevronRight
        aria-hidden="true"
        className={cn(
          "size-3 transition-transform duration-100",
          open && "rotate-90"
        )}
      />
    </button>
  )
}

// ---------------------------------------------------------------------------
// JsonNodeRenderer — recursive
// ---------------------------------------------------------------------------

interface JsonNodeRendererProps {
  node: JsonNode
  /** The object key or array index that labels this node, if any. */
  nodeKey?: string
  /** Depth from root — used to decide whether to auto-collapse deep nodes. */
  depth: number
  /** Whether this is the last sibling in its parent — suppresses trailing comma. */
  isLast: boolean
}

function JsonNodeRenderer({
  node,
  nodeKey,
  depth,
  isLast,
}: JsonNodeRendererProps) {
  // Auto-collapse objects/arrays deeper than 1 level so large JSON is
  // readable without having to manually close everything.
  const [open, setOpen] = React.useState(depth < 2)

  const isCollapsible = node.type === "object" || node.type === "array"
  const openBracket = node.type === "object" ? "{" : "["
  const closeBracket = node.type === "object" ? "}" : "]"
  const comma = isLast ? "" : ","

  // -------------------------------------------------------------------------
  // Primitive node — single line, never toggled
  // -------------------------------------------------------------------------

  if (!isCollapsible) {
    return (
      <div className="flex items-baseline whitespace-pre">
        {nodeKey !== undefined && (
          <>
            <span className="text-foreground/80">&quot;{nodeKey}&quot;</span>
            <span className="text-muted-foreground/60">{": "}</span>
          </>
        )}
        {node.type === "string" && <StringValue value={node.value} />}
        {node.type === "number" && <NumberValue value={node.value} />}
        {node.type === "boolean" && <BooleanValue value={node.value} />}
        {node.type === "null" && <NullValue />}
        {comma && (
          <span className="text-muted-foreground/60">{comma}</span>
        )}
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Collapsible node (object or array)
  // -------------------------------------------------------------------------

  const isEmpty =
    (node.type === "object" && node.entries.length === 0) ||
    (node.type === "array" && node.items.length === 0)

  return (
    <div>
      {/* Opening line */}
      <div className="flex items-baseline whitespace-pre">
        <ToggleButton
          open={open}
          onClick={() => setOpen((v) => !v)}
          label={
            open
              ? `Collapse ${node.type}`
              : `Expand ${node.type}`
          }
        />

        {nodeKey !== undefined && (
          <>
            <span className="text-foreground/80">&quot;{nodeKey}&quot;</span>
            <span className="text-muted-foreground/60">{": "}</span>
          </>
        )}

        <span className="text-muted-foreground">{openBracket}</span>

        {/* Collapsed: inline summary + close bracket */}
        {!open && (
          <>
            {!isEmpty && (
              <>
                <span className="mx-1.5">
                  <CollapsedSummary node={node} />
                </span>
              </>
            )}
            <span className="text-muted-foreground">{closeBracket}</span>
            {comma && (
              <span className="text-muted-foreground/60">{comma}</span>
            )}
          </>
        )}
      </div>

      {/* Children — only rendered when open */}
      {open && !isEmpty && (
        <div className="pl-5">
          {node.type === "object" &&
            node.entries.map((entry, i) => (
              <JsonNodeRenderer
                key={entry.key}
                node={entry.value}
                nodeKey={entry.key}
                depth={depth + 1}
                isLast={i === node.entries.length - 1}
              />
            ))}
          {node.type === "array" &&
            node.items.map((item, i) => (
              <JsonNodeRenderer
                key={i}
                node={item}
                depth={depth + 1}
                isLast={i === node.items.length - 1}
              />
            ))}
        </div>
      )}

      {/* Closing bracket — only when open */}
      {open && (
        <div className="flex items-baseline whitespace-pre">
          {/* Indent to align with open bracket (toggle button width offset) */}
          <span aria-hidden="true" className="mr-1 inline-block w-4 shrink-0" />
          <span className="text-muted-foreground">{closeBracket}</span>
          {comma && (
            <span className="text-muted-foreground/60">{comma}</span>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// JsonTreeView — public component
// ---------------------------------------------------------------------------

interface JsonTreeViewProps {
  /** The raw formatted JSON string to render as an interactive tree. */
  value: string
  className?: string
}

/**
 * Parses a JSON string and renders it as an interactive collapsible tree.
 *
 * - Objects and arrays are collapsible via a chevron button.
 * - Nodes deeper than 1 level are collapsed by default.
 * - Primitive values are syntax-highlighted by type.
 * - Falls back to plain text if the string cannot be parsed.
 */
function JsonTreeView({ value, className }: JsonTreeViewProps) {
  // Parse once per value change. The tree state (open/closed per node)
  // lives inside JsonNodeRenderer — parsing here only produces the shape.
  const node = React.useMemo(() => {
    if (!value.trim()) return null
    try {
      return parseToNode(JSON.parse(value))
    } catch {
      return null
    }
  }, [value])

  if (!node) return null

  return (
    <div
      className={cn(
        "font-mono text-sm leading-relaxed select-text",
        className
      )}
    >
      <JsonNodeRenderer node={node} depth={0} isLast={true} />
    </div>
  )
}

export { JsonTreeView }
