"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/gradient-button";
import { ChevronRight } from "lucide-react";

export default function CarCharterSection(): React.JSX.Element {
    return (
        <section
            id="car-charter"
            className="relative w-full py-8 text-special-card-fg my-8 md:my-16"
        >
            {/* Left gradient */}
            <div
                className={cn(
                    "pointer-events-none absolute size-full inset-0 max-w-sm md:max-w-screen-md mx-auto shadow-xl shadow-black/50 rounded-[20px] border-y border-[#2C5263]",
                    "bg-gradient-to-l from-background via-[#1D3844] to-background ",
                    // "bg-[linear-gradient(to_right,transparent_0%,#1D3844_25%,#1D3844_50%,#1D3844_75%,transparent_100%)]",
                )}
                aria-hidden="true"
            />

            <div className="relative flex flex-col items-center h-full text-center px-8 md:px-12 max-w-screen-md mx-auto z-10 space-y-6">
                <div
                    className={cn(
                        "inline-block text-grey/60 px-3 py-1 text-sm font-semibold",
                        "shadow-md shadow-black/50",
                        "text-shadow-gradient-small",
                        "bg-gradient-to-b from-[#2f5d71] to-[#103444]",
                        "rounded-[3%_15%_3%_15%_/_9%_50%_9%_50%]",
                        "border-[1px] border-[#117a80]",
                    )}
                >
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
                <div className="mt-6 flex flex-row flex-0">
                    <AnimatedButton
                        className={cn(
                            "text-[#ffffff] shadow-lg shadow-black/50 border-none w-48 h-[44px] left-1/2 -translate-x-1/2 -translate-y-[2px]",
                        )}
                        variant="outline"
                        size="default"
                        glow={false}
                        textEffect="normal"
                        uppercase={true}
                        rounded="custom"
                        asChild={false}
                        hideAnimations={false}
                        shimmerColor="#278ba2"
                        shimmerSize="0.1em"
                        shimmerDuration="3s"
                        borderRadius="10px"
                        background={cn("bg-white dark:bg-[#05636e]")}
                    ></AnimatedButton>
                    <GradientButton
                        variant={"primary"}
                        size="sm"
                        icon={<ChevronRight className="h-4 w-4" />}
                        iconPosition="right"
                        fullWidth={false}
                        hapticFeedback={true}
                        className={cn(
                            "shadow-md absolute shadow-black/50 hover:shadow-black/50 hover:scale-[1.04] scale-[1.01] left-1/2 -translate-x-1/2 translate-y-[1px]",
                        )}
                        aria-label="View charter options"
                        aria-describedby="charter-options"
                        aria-expanded={false}
                        aria-pressed={true}
                        textShadow="medium"
                    >
                        <Link href="/private-car-charter">
                            View Charter Options
                        </Link>
                    </GradientButton>
                </div>
            </div>
        </section>
    );
}
