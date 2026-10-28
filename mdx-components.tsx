import type { MDXComponents } from "mdx/types"
import Link from "next/link"

// ---------------------------------------------------------------------------
// Code block — synchronous Server Component.
// rehype-pretty-code annotates the inner <code> element with data-theme and
// emits --shiki-light / --shiki-dark CSS variables on each token <span>.
// globals.css reads those variables and switches between them via .dark.
// ---------------------------------------------------------------------------
function MDXPre({ children, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-none border border-border bg-muted/40 px-5 py-4 font-mono text-sm leading-relaxed"
    >
      {children}
    </pre>
  )
}

// ---------------------------------------------------------------------------
// Shared MDX component map — consumed by @next/mdx for every MDX file.
// This file must live at the project root alongside package.json.
// ---------------------------------------------------------------------------
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-3 text-lg font-semibold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-2 text-base font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),

    // Body text
    p: ({ children }) => (
      <p className="my-5 text-sm leading-relaxed text-foreground/80 first:mt-0">
        {children}
      </p>
    ),

    // Links
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http")
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={href ?? "#"}
          className="text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground"
        >
          {children}
        </Link>
      )
    },

    // Lists
    ul: ({ children }) => (
      <ul className="my-5 space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80 [&>li]:list-disc">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-5 space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80 [&>li]:list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-border pl-5 text-sm leading-relaxed text-muted-foreground italic">
        {children}
      </blockquote>
    ),

    code: ({ children, className }) => {
      if (className) return <code className={className}>{children}</code>
      return (
        <code className="">
          {children}
        </code>
      )
    },

    // Fenced code blocks
    pre: MDXPre,

    // Tables
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-border">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border">{children}</tbody>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="py-2 pr-4 text-left text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="py-2 pr-4 text-sm text-foreground/80">{children}</td>
    ),

    // Horizontal rule
    hr: () => <hr className="my-10 border-border" />,

    ...components,
  }
}
