import { Section } from "@/app/about/_components/section"
import { technologies } from "@/content/about/technologies"

function TechnologiesSection() {
  return (
    <Section title="Technologies">
      <dl className="space-y-4">
        {technologies.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-[7rem_1fr] items-baseline gap-4 sm:grid-cols-[9rem_1fr]"
          >
            <dt className="text-xs text-muted-foreground">{group.category}</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1">
              {group.items.map((item) => (
                <span key={item} className="font-mono text-xs text-foreground/80">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export { TechnologiesSection }
