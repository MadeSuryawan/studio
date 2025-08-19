import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata: Metadata = {
    title: "BaliBlissed",
    description: "Crafting unforgettable travel experiences in Bali.",
};

const ptSans = PT_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
    variable: "--font-pt-sans",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.JSX.Element {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: "BaliBlissed Journeys",
        url: "https://www.baliblissed.com", // Replace with your actual domain
        logo: "https://www.baliblissed.com/logo.png", // Replace with your actual logo URL
        description:
            "Crafting personalized and unforgettable travel experiences on the Island of the Gods.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "123 Jalan Pantai",
            addressLocality: "Canggu",
            addressRegion: "Bali",
            postalCode: "80361",
            addressCountry: "ID",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+62-858-4700-6743", // Use your actual phone number
            contactType: "customer service",
        },
    };

    const jsonLdWebSite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "BaliBlissed",
        url: "https://baliblissed.com", // Replace with your actual domain
        potentialAction: {
            "@type": "SearchAction",
            target: "https://baliblissed.com/search?q={search_term_string}", // Replace with your actual search URL
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <html lang="en" suppressHydrationWarning className={ptSans.variable}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLdWebSite),
                    }}
                />
            </head>
            <body className="font-body antialiased">
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-5MPWCMSR"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="relative flex min-h-dvh flex-col bg-background">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <FloatingButtons />
                    <Toaster />
                </ThemeProvider>
                {/* Google Analytics Scripts - Replace G-XXXXXXXXXX with your Measurement ID */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXXXXX');
                    `}
                </Script>
            </body>
        </html>
    );
}
