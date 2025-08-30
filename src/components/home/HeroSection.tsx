// src/components/home/HeroSection.tsx
"use client";

import { JSX, useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn, throttle } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * HeroSection Component
 *
 * A visually engaging hero section with parallax scrolling effects,
 * Balinese cultural elements, and responsive design.
 *
 * Features:
 * - Parallax background image effect
 * - Intersection Observer for entrance animations
 * - Respects user's motion preferences
 * - Optimized performance with throttled scroll handling
 * - Full accessibility support
 */
export default function HeroSection(): JSX.Element {
    // Track scroll position for parallax effect
    const [offsetY, setOffsetY] = useState<number>(0);

    // Ref for observing when hero content enters viewport
    const heroContentRef = useRef<HTMLDivElement>(null);
    // Track if user prefers reduced motion

    const prefersReducedMotion = useReducedMotion();

    // Memoized throttled scroll handler to prevent excessive re-renders
    // Only updates scroll position every 100ms for better performance
    const throttledHandleScroll = useMemo(
        () =>
            throttle(() => {
                // Only track scroll if motion is not reduced
                if (!prefersReducedMotion) {
                    setOffsetY(window.scrollY);
                }
            }, 100),
        [prefersReducedMotion],
    );

    // Set up scroll listener for parallax effect
    useEffect(() => {
        // Skip if SSR or user prefers reduced motion
        if (typeof window === "undefined" || prefersReducedMotion) return;

        // Add passive listener for better scroll performance
        window.addEventListener("scroll", throttledHandleScroll, {
            passive: true,
        });

        // Cleanup listener on unmount or when motion preference changes
        return () => {
            window.removeEventListener("scroll", throttledHandleScroll);
        };
    }, [throttledHandleScroll, prefersReducedMotion]);

    // Observe when hero content enters viewport for entrance animations
    const isVisible: boolean = useIntersectionObserver(heroContentRef, {
        threshold: 0.9,
        triggerOnce: false,
    });

    // Calculate parallax transform based on motion preference
    const getParallaxTransform = useCallback((): string => {
        if (prefersReducedMotion) {
            return "translateY(0)";
        }
        return `translateY(${offsetY * 0.5}px)`;
    }, [offsetY, prefersReducedMotion]);

    // Determine animation classes based on visibility and motion preference
    const getAnimationClasses = useCallback(
        (type: "fade" | "slideLeft" | "slideUp" | "slideDown"): string => {
            // If reduced motion is preferred, use only opacity transitions
            if (prefersReducedMotion) {
                return isVisible ? "opacity-100" : "opacity-0";
            }

            // Full animations when motion is allowed
            switch (type) {
                case "fade":
                    return isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-60";
                case "slideLeft":
                    return isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-60";
                case "slideUp":
                    return isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-60";
                case "slideDown":
                    return isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-60";
                default:
                    return "";
            }
        },
        [isVisible, prefersReducedMotion],
    );

    // Determine transition duration based on motion preference
    const transitionDuration = prefersReducedMotion
        ? "duration-300"
        : "duration-1000";

    return (
        <section
            aria-labelledby="hero-heading"
            className="relative w-full h-[70vh] md:h-[80vh] min-h-[480px] overflow-hidden -mt-16 sm:-mt-36"
            role="banner"
        >
            {/* Parallax Background Container */}
            <div
                className={cn(
                    "absolute size-full z-0",
                    // Only add will-change if animations are enabled
                    !prefersReducedMotion && "will-change-transform",
                )}
                style={{
                    transform: getParallaxTransform(),
                    // Smoother transition with reduced duration for reduced motion
                    transition: prefersReducedMotion
                        ? "transform 0.2s ease-out"
                        : "transform 0.5s ease-out",
                    // Gradient overlay for better text contrast
                    backgroundImage:
                        "radial-gradient(#cdcdcdff 0%, #bfbfbfff 25%, #aeaeaeff 50%, #b0b0b0ff 75%, #4b4b4bff 100%)",
                }}
                aria-hidden="true" // Decorative background
            >
                <Image
                    src="/images/hero/IMG_7508_DxO.webp"
                    alt="Traditional Balinese Kecak Dance performance at Uluwatu Temple during sunset"
                    fill
                    className="object-cover object-[center_.0rem] z-5 mix-blend-multiply"
                    priority
                    sizes="100vw"
                    quality={85} // Optimize image quality for better performance
                />
            </div>

            {/* Hero Content Container */}
            <div
                ref={heroContentRef}
                className="absolute z-10 grid grid-rows-1 gap-4 items-center h-auto text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:-translate-y-6 w-full md:w-full mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Balinese Greeting - Om Swastyastu */}
                <p
                    aria-label="Om Swastyastu - Traditional Balinese greeting meaning 'May all be well'"
                    lang="ban-Bali" // Proper language code for Balinese script
                    className={cn(
                        "relative font-balibanat text-5xl sm:text-6xl md:text-8xl tracking-normal leading-relaxed text-hero-title pb-4 md:pb-2",
                        // Only apply hover effects if motion is not reduced
                        !prefersReducedMotion &&
                            "hover:text-accent hover:scale-105",
                        `transition-all ${transitionDuration} ease-in-out`,
                        // Only add will-change if animations are enabled
                        !prefersReducedMotion &&
                            "will-change-[transform,opacity,color]",
                        getAnimationClasses("slideDown"),
                    )}
                >
                    ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ᭟
                </p>

                {/* Main Heading */}
                <h1
                    id="hero-heading"
                    className={cn(
                        "relative text-3xl sm:text-4xl md:text-6xl font-bold tracking-normal lg:leading-relaxed text-hero-title md:translate-y-8",
                        `transition-all ${transitionDuration} ease-in-out`,
                        // Only add will-change if animations are enabled
                        !prefersReducedMotion &&
                            "will-change-[transform,opacity]",
                        getAnimationClasses("slideLeft"),
                    )}
                >
                    Discover Your Bali Bliss
                </h1>

                {/* Subheading/Description */}
                <p
                    className={cn(
                        "relative text-center max-w-sm md:max-w-screen-md md:mt-4 px-3 mx-auto sm:text-lg md:text-2xl text-hero-title",
                        `transition-all ${transitionDuration} ease-in-out`,
                        // Only add will-change if animations are enabled
                        !prefersReducedMotion &&
                            "will-change-[transform,opacity]",
                        getAnimationClasses("slideUp"),
                    )}
                >
                    We craft personalized, unforgettable journeys to the Island
                    of the Gods. Let your story in Bali begin with us.
                </p>

                {/* Screen reader only - additional context */}
                <span className="sr-only">
                    Welcome to our Bali travel experience website. Scroll down
                    to explore our services and destinations.
                </span>
            </div>
        </section>
    );
}
