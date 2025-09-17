"use client";

import { type JSX } from "react";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/gradient-button";
import { ChevronRight } from "lucide-react";

const CarCharterSection = (): JSX.Element => {
    return (
        <section id="car-charter" className="mx-5 md:mx-0">
            <div
                className={cn(
                    "py-8 mx-auto",
                    "max-w-fit md:max-w-screen-md",
                    "shadow-lg md:shadow-xl shadow-black/20",
                    "rounded-[20px]",
                    "border-y",
                    "border-[#ffffff]",
                    "dark:border-[#2C5263]",
                    "bg-gradient-to-l",
                    "from-[#3f6883] via-[#5daacc] to-[#3f6883]",
                    "dark:from-background dark:via-[#1D3844] dark:to-background",
                    // "bg-[linear-gradient(to_right,transparent_0%,#1D3844_25%,#1D3844_50%,#1D3844_75%,transparent_100%)]",
                    // "shadow-[10px_-10px_10px_rgba(163,177,198,0.4),_10px_-10px_10px_rgba(244,244,244,0.8)]",
                )}
            >
                <div
                    className={cn(
                        "relative flex flex-col items-center h-full text-center",
                        "px-8 md:px-12 max-w-screen-md mx-auto z-10 space-y-6",
                        "text-special-card-fg",
                    )}
                >
                    <div
                        className={cn(
                            "inline-block text-white/90 px-3 py-1 text-sm font-semibold",
                            "shadow-md shadow-black/50",
                            "text-shadow-xs",
                            "bg-gradient-to-b from-[#2f5d71] to-[#103444]",
                            "rounded-[3%_15%_3%_15%_/_9%_50%_9%_50%]",
                            "border-[1px] border-accent",
                            "brightness-[160%] dark:brightness-100",
                        )}
                    >
                        Our Premier Service
                    </div>
                    <div
                        className={cn(
                            "text-[#e8f4ff]",
                            "dark:text-white/80",
                            "text-shadow-sm",
                            "brightness-[120%] dark:brightness-100",
                        )}
                    >
                        <h2
                            className={cn(
                                "text-3xl font-bold tracking-wide",
                                "sm:text-4xl md:text-5xl font-headline",
                            )}
                        >
                            Explore Bali Your Way
                        </h2>
                        <p
                            className={cn(
                                "mt-4 text-lg md:text-xl",
                                "whitespace-pre-line",
                            )}
                        >
                            {`Discover the ultimate freedom with your own private car.
                                    Create your custom itinerary and explore Bali's hidden gems,
                                    famous landmarks, and everything in between at your own pace.`}
                        </p>
                    </div>
                    <div className="inline-flex">
                        <AnimatedButton
                            className={cn(
                                "border-[1px]",
                                "dark:border-cyan-400/40",
                                "w-54 h-[44px] pointer-events-none",
                                "neumorphic-accent-button",
                            )}
                            variant="outline"
                            size="default"
                            glow={false}
                            rounded="custom"
                            asChild={false}
                            hideAnimations={false}
                            shimmerColor="var(--primary)"
                            shimmerSize="0.3em"
                            shimmerDuration="3s"
                            borderRadius="10px"
                            background={cn("bg-[#67bde2] dark:bg-[#05636e]")}
                        ></AnimatedButton>
                        <GradientButton
                            variant="accent"
                            size="sm"
                            icon={
                                <ChevronRight
                                    className={cn("h-4 w-4", "icon-shadow-sm")}
                                />
                            }
                            iconPosition="right"
                            fullWidth={false}
                            hapticFeedback={true}
                            className={cn(
                                "absolute",
                                "left-1/2 -translate-x-1/2 bottom-0 mb-[3px]",
                                "brightness-[1.2] dark:brightness-100",
                                "text-nowrap",
                                "hover:shadow-[inset_2px_2px_7px_rgba(0,_0,_0,_0.5),_inset_-2px_-2px_7px_rgba(246,_240,_123,_0.749)]",
                                "hover:transition-none",
                            )}
                            aria-label="View charter options"
                            aria-describedby="charter-options"
                            textShadow="light"
                        >
                            <Link href="/private-car-charter">
                                View Charter Options
                            </Link>
                        </GradientButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

CarCharterSection.displayName = "CarCharterSection";
export default CarCharterSection;
