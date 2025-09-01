// src/components/home/HeroSection.tsx
"use client";

import { JSX, useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn, throttle } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";

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
            className="relative w-full h-[70vh] md:h-[80vh] min-h-[480px] overflow-hidden -mt-16 md:-mt-36"
            role="banner"
        >
            {/* Parallax Background Container */}
            <div
                className={cn(
                    "absolute size-full z-0",
                    // Only add will-change if animations are enabled
                    !prefersReducedMotion && "will-change-transform",
                    "bg-[radial-gradient(_#bababaff_0%,_#989898ff_50%,_#abababff_75%,_#747474ff_100%)]",
                )}
                aria-hidden="true" // Decorative background
                style={{
                    transform: getParallaxTransform(),
                    // Smoother transition with reduced duration for reduced motion
                    transition: prefersReducedMotion
                        ? "transform 0.2s ease-out"
                        : "transform 0.5s ease-out",
                }}
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
                className={cn(
                    "absolute z-10 grid grid-rows-1 gap-3",
                    "w-full md:w-auto h-auto",
                    "items-center text-center",
                    "top-1/2 -translate-y-1/2 md:-translate-y-12 mx-auto",
                    "left-1/2 -translate-x-1/2",
                )}
            >
                {/* Balinese Greeting - Om Swastyastu */}
                <p
                    aria-label="Om Swastyastu - Traditional Balinese greeting meaning 'May all be well'"
                    lang="ban-Bali" // Proper language code for Balinese script
                    className={cn(
                        "relative font-balibanat pb-3 md:pb-12 mx-auto",
                        "text-5xl sm:text-6xl md:text-8xl",
                        "text-shadow-light",
                        !prefersReducedMotion &&
                            "hover:text-accent hover:scale-105",
                        `transition-all ${transitionDuration} ease-in-out`,
                        !prefersReducedMotion &&
                            "will-change-[transform,opacity,color]",
                        getAnimationClasses("slideDown"),
                        // "bg-blue-300",
                    )}
                >
                    ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ᭟
                </p>

                {/* Main Heading */}
                <h1
                    id="hero-heading"
                    className={cn(
                        "relative text-center text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide text-hero-title mx-auto",
                        `transition-all ${transitionDuration} ease-in-out`,
                        !prefersReducedMotion &&
                            "will-change-[transform,opacity]",
                        getAnimationClasses("slideLeft"),
                        // "bg-green-300",
                        "text-shadow-light",
                    )}
                >
                    Discover Your Bali Bliss
                </h1>

                {/* Subheading/Description */}
                <p
                    className={cn(
                        "relative text-center max-w-sm md:max-w-screen-lg sm:text-lg md:text-2xl text-hero-title mx-auto",
                        `transition-all ${transitionDuration} ease-in-out`,
                        !prefersReducedMotion &&
                            "will-change-[transform,opacity]",
                        getAnimationClasses("slideUp"),
                        // "bg-red-300",
                        "text-shadow-light",
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
