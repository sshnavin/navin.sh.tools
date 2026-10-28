import type { Metadata } from "next"
import { Geist_Mono, Noto_Sans } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

import "./globals.css"
import { siteConfig } from "@/config/site"
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
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: {
        default: siteConfig.defaultTitle,
        template: siteConfig.titleTemplate,
    },
    description: siteConfig.description,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.defaultTitle,
        description: siteConfig.description,
    },
    twitter: {
        card: "summary",
        title: siteConfig.defaultTitle,
        description: siteConfig.description,
    },
    robots: {
        index: true,
        follow: true,
    },
}

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

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
            {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
        </html>
    )
}
