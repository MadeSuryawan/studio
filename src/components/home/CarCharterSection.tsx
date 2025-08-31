"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";

export default function CarCharterSection(): React.JSX.Element {
    return (
        <section
            id="car-charter"
            className="relative w-full py-8 text-special-card-fg my-8 md:my-16"
        >
            {/* Left gradient */}
            <div
                className={cn(
                    "pointer-events-none absolute size-full inset-0 max-w-sm md:max-w-screen-md mx-auto shadow-xl shadow-gray-700/50 rounded-[20px] border-y border-[#2C5263]",
                    // "bg-gradient-to-l from-transparent via-[#1D3844] to-transparent ",
                    "bg-[linear-gradient(to_right,transparent_0%,#1D3844_25%,#1D3844_50%,#1D3844_75%,transparent_100%)]",
                )}
                aria-hidden="true"
            />

            <div className="relative flex flex-col items-center h-full text-center px-8 md:px-12 max-w-screen-md mx-auto z-10 space-y-6">
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
                    <Link href="/private-car-charter">
                        <AnimatedButton
                            className="bg-green-500 text-white"
                            variant="outline"
                            size="default"
                            glow={true}
                            textEffect="normal"
                            uppercase={true}
                            rounded="custom"
                            asChild={false}
                            hideAnimations={false}
                            shimmerColor="#278ba2"
                            shimmerSize="0.1em"
                            shimmerDuration="3s"
                            borderRadius="12px"
                            background="rgba(102, 75, 75, 1)"
                        >
                            View Charter Options{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </AnimatedButton>
                    </Link>
                </div>
            </div>
        </section>
    );
}
