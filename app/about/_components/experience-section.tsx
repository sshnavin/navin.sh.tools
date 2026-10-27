import { Section } from "@/app/about/_components/section"
import { experience } from "@/content/about/experience"

function ExperienceSection() {
  return (
    <Section title="Experience">
      <ol className="space-y-10">
        {experience.map((item) => (
          <li key={`${item.company}-${item.startDate}`}>
            {/* Header row */}
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">
                  {item.role}
                </span>
                <span className="mx-2 text-muted-foreground/40" aria-hidden="true">
                  ·
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.company}
                </span>
              </div>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {item.startDate}&thinsp;—&thinsp;{item.endDate ?? "Present"}
              </span>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              {item.description}
            </p>

            {/* Highlights */}
            {item.highlights.length > 0 && (
              <ul className="mt-3 space-y-1">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {/* Technologies */}
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

export { ExperienceSection }
