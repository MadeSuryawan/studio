// src/app/layout.tsx
import type { Metadata } from "next";
import { ptSans, balibanat, mangusastra } from "./font";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactModal } from "@/components/ContactModal";

export const metadata: Metadata = {
    title: "BaliBlissed",
    description: "Crafting unforgettable travel experiences in Bali.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.JSX.Element {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: "BaliBlissed",
        alternateName: "Bali Blissed Travel Agency Car Charter",
        image: "https://baliblissed.com/Favicons_(Beach)/favicon.ico",
        "@id": "https://baliblissed.com",
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
        <html
            lang="en"
            suppressHydrationWarning
            className={ptSans.variable}
            data-scroll-behavior="smooth"
        >
            <head>
                {/* <!-- Favicon -->
                <!-- - For old IEs --> */}
                <link
                    href="/Favicons_(Beach)/favicon.ico"
                    rel="shortcut icon"
                />
                {/* <!-- For new browsers - multisize ico  --> */}
                <link
                    href="/Favicons_(Beach)/favicon.ico"
                    rel="icon"
                    sizes="16x16 32x32"
                    type="image/x-icon"
                />
                {/* <!-- For iPad with high-resolution Retina display running iOS ≥ 7: --> */}
                <link
                    href="/Favicons_(Beach)/favicon-152-precomposed.png"
                    rel="apple-touch-icon"
                    sizes="152x152"
                />
                {/* <!-- For iPad with high-resolution Retina display running iOS ≤ 6: --> */}
                <link
                    href="/Favicons_(Beach)/favicon-144-precomposed.png"
                    rel="apple-touch-icon"
                    sizes="144x144"
                />
                {/* <!-- For iPhone with high-resolution Retina display running iOS ≥ 7: --> */}
                <link
                    href="/Favicons_(Beach)/favicon-120-precomposed.png"
                    rel="apple-touch-icon"
                    sizes="120x120"
                />
                {/* <!-- For iPhone with high-resolution Retina display running iOS ≤ 6: --> */}
                <link
                    href="/Favicons_(Beach)/favicon-114-precomposed.png"
                    rel="apple-touch-icon"
                    sizes="114x114"
                />
                {/* <!-- For iPhone 6+ --> */}
                <link
                    href="/Favicons_(Beach)/favicon-180-precomposed.png"
                    rel="apple-touch-icon"
                    sizes="180x180"
                />
                {/* <!-- For first- and second-generation iPad: --> */}
                <link
                    href="/Favicons_(Beach)/favicon-72-precomposed.png"
                    rel="apple-touch-icon"
                    sizes="72x72"
                />
                {/* <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: --> */}
                <link
                    href="/Favicons_(Beach)/favicon-57.png"
                    rel="apple-touch-icon"
                    sizes="57x57"
                />
                {/* <!-- For Old Chrome --> */}
                <link
                    href="/Favicons_(Beach)/favicon-32.png"
                    rel="icon"
                    sizes="32x32"
                />
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
            <body
                className={`font-body antialiased ${balibanat.variable} ${mangusastra.variable}`}
            >
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
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ContactModal />
                    <div className="relative grid min-h-dvh grid-cols-1 bg-background">
                        <Header />
                        <main className="col-start-1 col-end-1">
                            {children}
                        </main>
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
                        gtag('config', 'GTM-5MPWCMSR');
                    `}
                </Script>
            </body>
        </html>
    );
}
