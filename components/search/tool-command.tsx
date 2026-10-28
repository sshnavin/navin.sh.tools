"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { ToolIcon } from "@/components/tools/tool-icon"
import { categoryMap } from "@/lib/tools/categories"
import { trackEvent } from "@/lib/analytics"
import type { ToolDefinition } from "@/lib/tools/types"

// ---------------------------------------------------------------------------
// ToolCommand
// ---------------------------------------------------------------------------

interface ToolCommandProps {
  tools: ToolDefinition[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Global command palette for searching and navigating to tools.
 *
 * Composes Base UI Dialog primitives directly so that a single cmdk Command
 * root can live inside the popup — making it the ancestor of CommandInput,
 * CommandList and CommandItem, which all require that context.
 *
 * - ↑ ↓ navigate results, Enter selects, Escape closes (Base UI handles it).
 * - cmdk's built-in fuzzy filter searches the `value` string built from each
 *   tool's name, shortDescription, category and keywords.
 * - Navigates to /tools/[slug] on selection.
 */
function ToolCommand({ tools, open, onOpenChange }: ToolCommandProps) {
  const router = useRouter()

  function handleSelect(slug: string) {
    trackEvent({ name: "tool_open", tool_slug: slug, source: "command_palette" })
    onOpenChange(false)
    router.push(`/tools/${slug}`)
  }

  return (
      <CommandDialog open={open} onOpenChange={onOpenChange}>
          {/*
           * Single cmdk Command root — provides the store context that
           * CommandInput, CommandList and CommandItem all read from.
           */}
          <Command aria-label="Search tools">
            <span className="sr-only">
              Type to search. Use arrow keys to navigate, Enter to open a tool.
            </span>

            <CommandInput placeholder="Search tools..." />

            <CommandList>
              <CommandEmpty>
                <span className="flex flex-col items-center gap-1.5 py-2">
                  <SearchIcon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                  <span>No tools found.</span>
                </span>
              </CommandEmpty>

              <CommandGroup heading="Tools">
                {tools.map((tool) => {
                  const categoryLabel =
                    categoryMap[tool.category]?.name ?? tool.category

                  // Build the value string cmdk searches across — covers
                  // the same fields as the shared searchTools utility.
                  const searchValue = [
                    tool.name,
                    categoryLabel,
                    ...tool.keywords,
                  ].join(" ")

                  return (
                    <CommandItem
                      key={tool.id}
                      value={searchValue}
                      onSelect={() => handleSelect(tool.slug)}
                      className="gap-3"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center text-muted-foreground">
                        <ToolIcon name={tool.icon} className="size-4" />
                      </span>

                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate text-sm font-medium leading-none text-foreground">
                          {tool.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {categoryLabel}
                        </span>
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
      </CommandDialog>
  )
}

export { ToolCommand }
