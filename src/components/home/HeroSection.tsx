// src/components/home/HeroSection.tsx
"use client";

import { JSX, useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn, throttle } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useHydration } from "@/hooks/use-hydration";

type AnimationType = "fade" | "slideLeft" | "slideRight" | "slideDown";

interface HeroContentProps {
    ariaLabel?: string;
    lang?: string;
    text: string;
    className?: string;
    animation?: AnimationType;
    tag: string;
}

const HERO_CONTENT: HeroContentProps[] = [
    {
        tag: "p",
        ariaLabel:
            "Om Swastyastu - Traditional Balinese greeting meaning 'May all be well'",
        lang: "ban-Bali", // Proper language code for Balinese script
        text: "ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ᭟",
        className:
            "font-balibanat pb-3 md:pb-12 text-3xl sm:text-5xl md:text-7xl 2xl:text-9xl",
        animation: "slideDown",
    },
    {
        tag: "h1",
        ariaLabel: "Discover Your Bali Bliss",
        text: "Discover Your Bali Bliss",
        className: "text-2xl sm:text-3xl md:text-5xl 2xl:text-7xl font-bold",
        animation: "slideLeft",
    },
    {
        tag: "p",
        ariaLabel:
            "We craft personalized, unforgettable journeys to the Island of the Gods. Let your story in Bali begin with us.",
        text: "We craft personalized, unforgettable journeys to the Island of the Gods. Let your story in Bali begin with us",
        className:
            "text-md 2xl:text-lg whitespace-pre-line tracking-tight md:tracking-normal",
        animation: "slideRight",
    },
    {
        tag: "span",
        text: "Welcome to our Bali travel experience website. Scroll down to explore our services and destinations.",
        className: "sr-only",
    },
] as const;

const HeroImage = memo(
    ({
        className,
        prefersReducedMotion,
        getParallaxTransform,
    }: {
        className?: string;
        prefersReducedMotion?: boolean;
        getParallaxTransform?: () => string;
    }): JSX.Element => {
        const [imageError, setImageError] = useState(false);
        return (
            <div
                className={cn(
                    // "bg-blue-500",
                    "relative",
                    "aspect-[8.5/11]",
                    "neumorphic-hero-image",
                    "rounded-lg",
                    "flex",
                    "isolate",
                    "p-1",
                    "overflow-hidden",
                    className,
                )}
            >
                <div
                    className={cn(
                        "relative w-full h-full bg-background rounded-lg",
                    )}
                    style={{
                        transform:
                            getParallaxTransform && getParallaxTransform(),
                        transition: prefersReducedMotion
                            ? "transform 0.2s ease-out"
                            : "transform 0.5s ease-out",
                    }}
                >
                    {!imageError ? (
                        <Image
                            src="/images/hero/IMG_7508_DxO.webp"
                            alt="Traditional Balinese Kecak Dance performance at Uluwatu Temple during sunset"
                            fill
                            className={cn(
                                "rounded-lg isolate bg-background",
                                // "p-1",
                            )}
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={85}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div
                            className={cn(
                                "flex items-center justify-center h-full",
                                "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800",
                                "rounded-lg",
                            )}
                        >
                            <p className="text-gray-600 dark:text-gray-400 text-center p-4">
                                Beautiful Bali scenery loading...
                            </p>
                        </div>
                    )}
                    {/* Radial Gradient overlay */}
                    <div
                        className={cn(
                            "w-full h-full",
                            "relative",
                            "rounded-lg",
                            "bg-[radial-gradient(circle_at_50%_50%,_#DADADA_0%,_#C0C0C0_50%,_#BABABA_75%,_#ADADAD_100%)]",
                            "mix-blend-multiply",
                            "brightness-[120%]",
                            "dark:brightness-[105%]",
                        )}
                    />
                </div>
            </div>
        );
    },
);
HeroImage.displayName = "HeroImage";

interface HeroContentComponentProps {
    getAnimationClasses: (
        type: "fade" | "slideLeft" | "slideRight" | "slideDown",
    ) => string;
    transitionDuration: string;
    prefersReducedMotion: boolean;
}

const HeroContentComponent = memo(
    ({
        getAnimationClasses,
        transitionDuration,
        prefersReducedMotion,
    }: HeroContentComponentProps) => (
        <>
            {HERO_CONTENT.map((content, index) => {
                const Tag = content.tag as keyof JSX.IntrinsicElements;
                return (
                    <Tag
                        key={`hero-content-${content.tag}-${index}`}
                        aria-label={content.ariaLabel}
                        lang={content.lang}
                        className={cn(
                            content.className,
                            content.animation &&
                                [
                                    "fade",
                                    "slideLeft",
                                    "slideRight",
                                    "slideDown",
                                ].includes(content.animation) &&
                                getAnimationClasses(
                                    content.animation as
                                        | "fade"
                                        | "slideLeft"
                                        | "slideRight"
                                        | "slideDown",
                                ),
                            `transition-all ${transitionDuration} ease-in-out`,
                            !prefersReducedMotion &&
                                "will-change-[transform,opacity]",
                        )}
                    >
                        {content.animation === "slideRight"
                            ? newLineByDot(content.text)
                            : content.text}
                    </Tag>
                );
            })}
        </>
    ),
);
HeroContentComponent.displayName = "HeroContentComponent";

const newLineByDot = (text: string) =>
    text.split(". ").map((line, idx) => (
        <span key={idx}>
            {line}.<br />
        </span>
    ));

export default function HeroSection(): JSX.Element {
    // Track scroll position for parallax effect
    const [offsetY, setOffsetY] = useState<number>(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // Separate refs for desktop and mobile views
    const desktopHeroContentRef = useRef<HTMLDivElement>(null);
    const mobileHeroContentRef = useRef<HTMLDivElement>(null);

    // Use the appropriate ref based on viewport
    const activeHeroContentRef = isDesktop
        ? desktopHeroContentRef
        : mobileHeroContentRef;

    // Ref for observing when hero content enters viewport
    const heroContentRef = useRef<HTMLDivElement>(null);

    // Observe when hero content enters viewport for entrance animations
    const isVisible: boolean = useIntersectionObserver(heroContentRef, {
        threshold: 0.9,
        triggerOnce: false,
    });

    // Track if user prefers reduced motion
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setIsMounted(true);

        // Check if desktop view on mount
        const checkIsDesktop = throttle(() => {
            setIsDesktop(window.innerWidth >= 768); // md breakpoint
        }, 100);

        checkIsDesktop();
        window.addEventListener("resize", checkIsDesktop);

        return () => window.removeEventListener("resize", checkIsDesktop);
    }, []);

    // Set up scroll listener for parallax effect
    useEffect(() => {
        const throttledHandleScroll = () => {
            // Only updates scroll position every 100ms for better performance
            throttle(() => {
                if (!prefersReducedMotion) {
                    setOffsetY(window.scrollY);
                }
            }, 100)();
        };

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
    }, [prefersReducedMotion]);

    // Calculate parallax transform based on motion preference
    const getParallaxTransform = useCallback((): string => {
        if (prefersReducedMotion) {
            return "translateY(0)";
        }
        return `translateY(${offsetY * 0.5}px)`;
    }, [offsetY, prefersReducedMotion]);

    // Determine animation classes based on visibility and motion preference
    const getAnimationClasses = useCallback(
        (type: "fade" | "slideLeft" | "slideRight" | "slideDown"): string => {
            if (!isMounted) {
                return "opacity-0";
            }

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
                case "slideRight":
                    return isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-60";
                case "slideDown":
                    return isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-60";
                default:
                    return "";
            }
        },
        [isMounted, isVisible, prefersReducedMotion],
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
                    "top-1/2 -translate-y-1/2 md:-translate-y-6 mx-auto",
                    "left-1/2 -translate-x-1/2",
                )}
            >
                <HeroContentComponent
                    getAnimationClasses={getAnimationClasses}
                    transitionDuration={transitionDuration}
                    prefersReducedMotion={prefersReducedMotion || true}
                />
            </div>
        </section>
    );
}
