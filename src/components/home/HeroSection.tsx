"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection(): React.JSX.Element {
    return (
        <section className="relative w-full h-[80vh] min-h-[480px] -mt-16 sm:-mt-36  pt-16 sm:pt-36 scroll-mt-16 sm:scroll-mt-36">
            <Image
                src="/images/hero/IMG_7508_DxO.webp"
                alt="Lush rice paddies in Bali"
                fill
                // className="object-cover brightness-[60%] object-[center_.9rem]" // Tailwind: move image down
                className="object-cover object-[center_.9rem]" // Tailwind: move image down
                priority
                sizes="100vw"
                data-ai-hint="bali kecak dance in uluwatu"
            />
            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#808080] blur-lg mix-blend-multiply brightness-110 z-10" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-hero-title p-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-lighter font-headline">
                    Discover Your Bali Bliss
                </h1>
                <p className="max-w-2xl mt-4 text-lg md:text-xl text-hero-title/90">
                    We craft personalized, unforgettable journeys to the Island
                    of the Gods. Let your story in Bali begin with us.
                </p>
                <div className="mt-8">
                    <Button
                        asChild
                        size="lg"
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                        <Link href="#packages">Explore Packages</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
