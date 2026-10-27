export interface Experience {
  company: string
  role: string
  startDate: string
  endDate: string | null // null = present
  description: string
  highlights: string[]
  technologies: string[]
}

export const experience: Experience[] = [
  {
    company: "ThoughtWorks India Ltd.",
    role: "Lead Frontend Engineer",
    startDate: "2024",
    endDate: null,
    description:
      "Working on e-commerce experiences across backend of retail space.",
    highlights: [
      "Leading frontend architecture across multiple product squads",
      "Driving adoption of shared component and design system patterns",
      "Collaborating with design, product and platform teams on delivery",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "GraphQL",
      "Design Systems",
    ],
  },
  {
    company: "OLX GmbH",
    role: "Frontend Engineer",
    startDate: "2021",
    endDate: '2024',
    description:
      "Worked on large-scale classified and e-commerce experiences.",
    highlights: [
      "Leading frontend architecture across multiple product squads",
      "Driving adoption of shared component and design system patterns",
      "Collaborating with design, product and platform teams on delivery",
    ],
    technologies: [
      "Flutter",
      "TypeScript",
      "React",
      "Next.js",
      "GraphQL",
      "Design Systems",
    ],
  },
]
