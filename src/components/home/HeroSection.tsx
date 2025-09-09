// src/components/home/HeroSection.tsx
"use client";

import {
    type JSX,
    useState,
    useEffect,
    useRef,
    memo,
    useCallback,
} from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn, throttle } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/use-mobile";

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
        className: cn(
            "text-2xl sm:text-3xl md:text-5xl 2xl:text-7xl font-serif",
        ),
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

const HeroSection = (): JSX.Element => {
    // Track scroll position for parallax effect
    const [offsetY, setOffsetY] = useState<number>(0);
    const isMobile = useIsMobile();

    // Separate refs for desktop and mobile views
    const desktopHeroContentRef = useRef<HTMLDivElement>(null);
    const mobileHeroContentRef = useRef<HTMLDivElement>(null);

    // Use the appropriate ref based on viewport
    const activeHeroContentRef = isMobile
        ? mobileHeroContentRef
        : desktopHeroContentRef;

    // Track if user prefers reduced motion
    const prefersReducedMotion = useReducedMotion();

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

    // Observe when hero content enters viewport for entrance animations
    const isVisible: boolean = useIntersectionObserver(activeHeroContentRef, {
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
        (type: "fade" | "slideLeft" | "slideRight" | "slideDown"): string => {
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
        [isVisible, prefersReducedMotion],
    );

    // Determine transition duration based on motion preference
    const transitionDuration = prefersReducedMotion
        ? "duration-300"
        : "duration-1000";

    return (
        <section
            aria-labelledby="hero-heading"
            className={cn("relative w-full")}
            role="banner"
        >
            {/* Desktop View */}
            <div
                className={cn(
                    "hidden md:grid grid-cols-3",
                    "relative w-full",
                    "pl-4",
                    "mt-24 mb-16",
                    // "bg-orange-700",
                )}
            >
                {/* Text Container */}
                <div
                    className={cn(
                        // "bg-purple-600",
                        "col-span-2",
                        "my-8",
                        "ml-12",
                        "px-20",
                        "py-6",
                        "rounded-lg rounded-r-none",
                        "neumorphic-hero-image",
                    )}
                >
                    <div
                        ref={desktopHeroContentRef}
                        className={cn(
                            "flex flex-col items-center justify-center gap-6",
                            "size-full",
                            "text-center",
                            "text-hero-title",
                            "text-shadow-sm",
                            // "bg-slate-800",
                            "px-4",
                            "-ml-1",
                            "neumorphic-cta-card",
                            "dark:text-shadow-md",
                            "rounded-lg",
                        )}
                    >
                        <HeroContentComponent
                            getAnimationClasses={getAnimationClasses}
                            transitionDuration={transitionDuration}
                            prefersReducedMotion={prefersReducedMotion || true}
                        />
                    </div>
                </div>

                {/* Image Container */}
                <div
                    className={cn(
                        "col-span-1",
                        "aspect-[8.5/11]",
                        // "bg-green-600",
                        "p-3",
                        "mr-8",
                    )}
                >
                    <HeroImage
                        className="scale-[1.1] translate-y-1 -translate-x-1"
                        prefersReducedMotion={prefersReducedMotion || undefined}
                        getParallaxTransform={getParallaxTransform}
                    />
                </div>
            </div>

            {/* Mobile View */}
            <div
                className={cn(
                    "block md:hidden",
                    "relative w-full",
                    "mt-16 mb-16",
                    "px-3",
                    // "pt-[10px]",
                    // "bg-orange-700",
                )}
            >
                {/* Text Container */}
                <div
                    className={cn(
                        // "bg-purple-600",
                        "inline-block",
                        "py-5 px-5",
                        "rounded-lg",
                        "mt-6",
                        "neumorphic-hero-image",
                    )}
                >
                    <div
                        ref={mobileHeroContentRef}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1",
                            "size-full",
                            "text-center",
                            "text-hero-title",
                            "text-shadow-sm",
                            // "bg-slate-800",
                            "p-4",
                            "neumorphic-cta-card",
                            "dark:text-shadow-md",
                            "rounded-lg",
                        )}
                    >
                        <HeroContentComponent
                            getAnimationClasses={getAnimationClasses}
                            transitionDuration={transitionDuration}
                            prefersReducedMotion={prefersReducedMotion || true}
                        />
                    </div>
                </div>

                {/* Image Container */}
                <div className={cn("relative")}>
                    <HeroImage className="scale-[.95]" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
