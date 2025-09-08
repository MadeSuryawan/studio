"use client";

import { type JSX, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/gradient-button";
import { ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

const CarCharterSection = (): JSX.Element => {
    const [isMounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (isMounted) {
        const isDark = resolvedTheme === "dark";
        return (
            <section
                id="car-charter"
                className="relative w-full py-8 text-special-card-fg my-8 md:my-12"
            >
                <div
                    className={cn(
                        "py-8 mx-auto",
                        "max-w-sm md:max-w-screen-md",
                        "shadow-xl shadow-black/20",
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
                        )}
                    >
                        <div
                            className={cn(
                                "inline-block text-white/90 px-3 py-1 text-sm font-semibold",
                                "shadow-md shadow-black/50",
                                // "text-shadow-xs",
                                "bg-gradient-to-b from-[#2f5d71] to-[#103444]",
                                "rounded-[3%_15%_3%_15%_/_9%_50%_9%_50%]",
                                "border-[1px] border-accent",
                            )}
                            {...(!isDark && {
                                style: { filter: "brightness(1.6)" },
                            })}
                        >
                            Our Premier Service
                        </div>
                        <div
                            className={cn(
                                "text-[#bcdfff]",
                                "dark:text-white/80",
                                "text-shadow-sm",
                            )}
                            {...(!isDark && {
                                style: { filter: "brightness(1.3)" },
                            })}
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
                                    "mt-4 text-lg md:text-xl text-special-card-fg/80",
                                    "whitespace-pre-line",
                                )}
                            >
                                {`Discover the ultimate freedom with your own private car.
                                    Create your custom itinerary and explore Bali's hidden gems,
                                    famous landmarks, and everything in between at your own pace.`}
                            </p>
                        </div>
                        <div className="mt-6 flex flex-row flex-0">
                            <AnimatedButton
                                className={cn(
                                    // "text-[#ffffff] font-bold",
                                    // "shadow-md",
                                    // "shadow-black/50",
                                    "border-none w-48 h-[44px]",
                                    "left-1/2 -translate-x-1/2 -translate-y-[2px]",
                                    // "neumorphic-button",
                                )}
                                variant="outline"
                                size="default"
                                glow={false}
                                textEffect="normal"
                                uppercase={true}
                                rounded="custom"
                                asChild={false}
                                hideAnimations={false}
                                shimmerColor={
                                    isDark ? "var(--primary)" : "#ffffff"
                                }
                                shimmerSize="0.3em"
                                shimmerDuration="3s"
                                borderRadius="10px"
                                background={cn(
                                    "bg-[#67bde2] dark:bg-[#05636e]",
                                )}
                            ></AnimatedButton>
                            <GradientButton
                                variant={"primary"}
                                size="sm"
                                icon={
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4",
                                            isDark
                                                ? "icon-shadow-lg"
                                                : "icon-shadow-sm",
                                        )}
                                    />
                                }
                                iconPosition="right"
                                fullWidth={false}
                                hapticFeedback={true}
                                className={cn(
                                    "shadow-md absolute",
                                    "bg-gradient-to-b from-[#43809b] to-[#2f5a6c]",
                                    // "bg-[#43809b]",
                                    "shadow-black/50",
                                    "hover:shadow-black/50",
                                    "left-1/2 -translate-x-1/2 translate-y-[1px]",
                                    "neumorphic-button",
                                    !isDark && "brightness-[1.4]",
                                )}
                                aria-label="View charter options"
                                aria-describedby="charter-options"
                                aria-expanded={false}
                                aria-pressed={true}
                                textShadow={isDark ? "medium" : "light"}
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
    } else {
        return <></>;
    }
};

CarCharterSection.displayName = "CarCharterSection";
export default CarCharterSection;
