import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { Section } from "@/app/about/_components/section"
import { work } from "@/content/about/work"

function WorkSection() {
  return (
    <Section title="Selected Work">
      <ol className="divide-y divide-border">
        {work.map((item) => (
          <li key={item.title} className="py-6 first:pt-0 last:pb-0">
            {/* Title */}
            <div className="flex items-start justify-between gap-4">
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-foreground/70"
                >
                  {item.title}
                  <ArrowUpRightIcon className="size-3 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                </Link>
              ) : (
                <span className="text-sm font-medium text-foreground">
                  {item.title}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
              {item.description}
            </p>

            {/* Tags */}
            {item.technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}

export { WorkSection }
