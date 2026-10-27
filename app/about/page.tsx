import type {Metadata} from "next"
import {IntroSection} from "@/app/about/_components/intro-section"
import {ExperienceSection} from "@/app/about/_components/experience-section"
import {TechnologiesSection} from "@/app/about/_components/technologies-section"

export const metadata: Metadata = {
    title: "About",
    description:
        "Navin Singh is a Lead Frontend Engineer focused on scalable frontend applications, design systems and web platforms.",
}

export default function AboutPage() {
    return (
        <>
            <IntroSection/>
            <ExperienceSection/>
            <TechnologiesSection/>
        </>
    )
}
