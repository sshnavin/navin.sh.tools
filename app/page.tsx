import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Hero } from "@/components/home/hero"

export const metadata: Metadata = {
    title: {
        // Override the template for the homepage — use the full default title
        // directly so it reads "navin.sh — Tools, Writing & Software" rather
        // than "Home | navin.sh".
        absolute: siteConfig.defaultTitle,
    },
    description: siteConfig.description,
    alternates: {
        canonical: siteConfig.url,
    },
}

export default function HomePage() {
    return <Hero />
}
