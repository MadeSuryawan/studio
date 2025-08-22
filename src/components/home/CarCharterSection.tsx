"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Gradient from "./Gradient";

export default function CarCharterSection(): React.JSX.Element {
    return (
        <section
            id="car-charter"
            className="relative w-full py-8 bg-bg-alternate text-special-card-fg"
        >
            <Gradient gradientT="from-bg-alternate to-secondary" />

            {/* Left gradient */}
            <div
                className="pointer-events-none absolute size-full inset-0 max-w-screen-md mx-auto bg-gradient-to-l from-bg-alternate via-[#1D3844] to-transparent shadow-lg rounded-[20px] border-y border-[#2C5263]"
                aria-hidden="true"
            />

            <div className="relative flex flex-col items-center h-full text-center px-4 md:px-12 max-w-screen-md mx-auto z-10 space-y-6">
                <div className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Our Premier Service
                </div>
                <h2 className="text-3xl font-bold tracking-light sm:text-4xl md:text-5xl font-headline">
                    Explore Bali Your Way
                </h2>
                <p className="mt-4 text-lg md:text-xl text-special-card-fg/80">
                    Discover the ultimate freedom with your own private car and
                    English-speaking driver. Create your custom itinerary and
                    explore Bali&#39;s hidden gems, famous landmarks, and
                    everything in between at your own pace.
                </p>
                <div className="mt-6">
                    <Button
                        asChild
                        className="size-lg text-primary-foreground font-semibold"
                    >
                        <Link href="/private-car-charter">
                            View Charter Options
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
