import * as React from "react"
import { cn } from "cn"

interface SectionProps extends React.ComponentProps<"section"> {
  title: string
  children: React.ReactNode
}

function Section({ title, children, className, ...props }: SectionProps) {
  return (
    <section className={cn("py-10", className)} {...props}>
      <div className="mb-6 flex items-center gap-4">
        <h2 className="shrink-0 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {title}
        </h2>
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      {children}
    </section>
  )
}

export { Section }
