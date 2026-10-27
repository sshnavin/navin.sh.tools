export interface TechGroup {
  category: string
  items: string[]
}

export const technologies: TechGroup[] = [
  {
    category: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Radix UI",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "GraphQL", "REST", "PostgreSQL"],
  },
  {
    category: "Platform & Infrastructure",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Storybook"],
  },
]
