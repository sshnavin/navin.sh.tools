export interface WorkItem {
  title: string
  description: string
  technologies: string[]
  url?: string
}

export const work: WorkItem[] = [
  {
    title: "Design System",
    description:
      "A component library and design token system built to unify UI across a large-scale web platform. Covers primitives, patterns and documentation.",
    technologies: ["React", "TypeScript", "Storybook", "CSS"],
  },
  {
    title: "E-commerce Platform",
    description:
      "Frontend architecture for product discovery and listing experiences at scale. Focused on performance, accessibility and team autonomy.",
    technologies: ["Next.js", "GraphQL", "TypeScript"],
  },
  {
    title: "navin.sh",
    description:
      "This site — a personal space for writing, tools and experiments. Built with Next.js, Tailwind CSS and shadcn/ui.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://github.com/navinsh",
  },
]
