import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
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
    return (
        <html lang="en" suppressHydrationWarning className={ptSans.variable}>
            <body className="font-body antialiased">
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
            </body>
        </html>
    );
}
