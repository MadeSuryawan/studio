"use client";

import { JSX, useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn, throttle } from "@/lib/utils";

export default function HeroSection(): JSX.Element {
    const [offsetY, setOffsetY] = useState<number>(0);
    const heroContentRef = useRef<HTMLDivElement>(null);

    const throttledHandleScroll = useMemo(
        () => throttle(() => setOffsetY(window.scrollY), 100),
        [],
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.addEventListener("scroll", throttledHandleScroll, {
            passive: true,
        });
        return () =>
            window.removeEventListener("scroll", throttledHandleScroll);
    }, [throttledHandleScroll]);

    const isVisible: boolean = useIntersectionObserver(heroContentRef, {
        threshold: 0.9,
        triggerOnce: false,
    });
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative w-full h-[70vh] md:h-[80vh] min-h-[480px] overflow-hidden -mt-16 sm:-mt-36"
        >
            <div
                className={cn("absolute size-full z-0 will-change-transform")}
                style={{
                    transform: `translateY(${offsetY * 0.5}px)`,
                    transition: "transform 0.5s ease-out",
                    backgroundImage:
                        "radial-gradient( #cdcdcdff 0%, #bfbfbfff 25%, #aeaeaeff 50%, #b0b0b0ff 75%, #4b4b4bff 100%)",
                }}
            >
                <Image
                    src="/images/hero/IMG_7508_DxO.webp"
                    alt="Bali Kecak Dance in Ululuwatu"
                    fill
                    className="object-cover object-[center_.0rem] z-5 mix-blend-multiply" // Tailwind: move image down
                    priority
                    sizes="100vw"
                    data-ai-hint="bali kecak dance in uluwatu"
                />
            </div>

            <div
                ref={heroContentRef}
                className="absolute z-10 grid grid-rows-1 gap-4 items-center h-auto text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:-translate-y-6 w-full md:w-full mx-auto"
            >
                <p
                    aria-label="Om Swastyastu"
                    lang="ban-Bali"
                    className={cn(
                        "relative font-balibanat text-5xl sm:text-6xl md:text-8xl tracking-normal leading-relaxed text-hero-title pb-4 md:pb-2 hover:text-accent hover:scale-105 transition-all duration-1000 ease-in-out will-change-[transform,opacity,color]",
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-60",
                    )}
                >
                    ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ᭟​
                </p>
                <h1
                    id="hero-heading"
                    className={cn(
                        "relative text-3xl sm:text-4xl md:text-6xl font-bold tracking-normal lg:leading-relaxed text-hero-title md:translate-y-8 transition-all duration-1000 ease-in-out will-change-[transform,opacity]",
                        isVisible
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-60",
                    )}
                >
                    Discover Your Bali Bliss
                </h1>
                <p
                    className={cn(
                        "relative text-center max-w-sm md:max-w-screen-md md:mt-4 px-3 mx-auto sm:text-lg md:text-2xl text-hero-title transition-all duration-1000 ease-in-out will-change-[transform,opacity]",
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-60",
                    )}
                >
                    We craft personalized, unforgettable journeys to the Island
                    of the Gods. Let your story in Bali begin with us.
                </p>
            </div>
        </section>
    );
}
