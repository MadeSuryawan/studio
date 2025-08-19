"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection(): React.JSX.Element {
    return (
        <section className="relative w-full h-[80vh] min-h-[480px]">
            <Image
                src="https://placehold.co/1600x900.png"
                alt="Lush rice paddies in Bali"
                fill
                className="object-cover brightness-50"
                priority
                sizes="100vw"
                data-ai-hint="bali rice paddies"
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-lighter font-headline">
                    Discover Your Bali Bliss
                </h1>
                <p className="max-w-2xl mt-4 text-lg md:text-xl text-primary-foreground/90">
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
