import type { Metadata } from "next"
import { Geist_Mono, Noto_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageContainer } from "@/components/layout/page-container"
import { cn } from "@/lib/utils"

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export const metadata: Metadata = {
    metadataBase: new URL("https://navin.sh"),
    title: {
        default: "Navin Singh",
        template: "%s · navin.sh",
    },
    description:
        "Personal website of Navin Singh — developer, writing, and tools.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://navin.sh",
        siteName: "navin.sh",
        title: "Navin Singh",
        description:
            "Personal website of Navin Singh — developer, writing, and tools.",
    },
    twitter: {
        card: "summary",
        title: "Navin Singh",
        description:
            "Personal website of Navin Singh — developer, writing, and tools.",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                notoSans.variable
            )}
        >
            <body>
                <ThemeProvider>
                    <div className="flex min-h-svh flex-col">
                        <SiteHeader />
                        <main className="flex-1">
                            <PageContainer>{children}</PageContainer>
                        </main>
                        <SiteFooter />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
