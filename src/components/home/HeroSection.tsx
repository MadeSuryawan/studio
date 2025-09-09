// src/components/home/HeroSection.tsx
"use client";

import { type JSX, useState, useRef, memo, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
} from "framer-motion";
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
        className: cn(
            "text-md 2xl:text-lg whitespace-pre-line",
            "tracking-tight md:tracking-normal",
        ),
        animation: "slideRight",
    },
    {
        tag: "span",
        text: "Welcome to our Bali travel experience website. Scroll down to explore our services and destinations.",
        className: "sr-only",
    },
] as const;

interface HeroImageProps {
    className?: string;
    prefersReducedMotion?: boolean | null;
}

const HeroImage = memo(
    ({ className, prefersReducedMotion }: HeroImageProps): JSX.Element => {
        const [imageError, setImageError] = useState(false);
        // Built-in scroll tracking
        const { scrollY } = useScroll();
        const y = useTransform(scrollY, [0, 1000], [0, 500]);

        const variants = {
            stiffness: 100, // Higher stiffness = more bouncy
            damping: 10, // Lower damping = more overshoot
            mass: 0.5, // Mass affects the spring behavior
        };

        const smoothY = useSpring(y, variants);

        return (
            <motion.div
                initial={
                    prefersReducedMotion
                        ? { opacity: 1, scale: 1, x: 0, y: 0 }
                        : { opacity: 0, scale: 0, x: 200, y: -250 }
                }
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={
                    prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", ...variants }
                }
                className={cn(
                    "relative aspect-[8.5/11]",
                    "rounded-lg flex isolate overflow-hidden",
                    "will-change-[transform,opacity]",
                    className,
                )}
            >
                <motion.div
                    className={cn(
                        "relative w-full h-full bg-background rounded-lg",
                        "parallax-element",
                    )}
                    style={prefersReducedMotion ? {} : { y: smoothY }}
                    // style={{
                    //     y,
                    //     transition: prefersReducedMotion
                    //         ? "transform 0.2s ease-out"
                    //         : "transform 0.5s ease-out",
                    // }}
                >
                    {!imageError ? (
                        <Image
                            src="/images/hero/IMG_7508_DxO.webp"
                            alt="Traditional Balinese Kecak Dance performance at Uluwatu Temple during sunset"
                            fill
                            className={cn("rounded-lg isolate")}
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
                </motion.div>
            </motion.div>
        );
    },
);
HeroImage.displayName = "HeroImage";

interface HeroContentComponentProps {
    activeHeroContentRef: React.RefObject<HTMLDivElement>;
    prefersReducedMotion: boolean | null;
}

const HeroContentComponent = memo(
    ({
        activeHeroContentRef,
        prefersReducedMotion,
    }: HeroContentComponentProps) => {
        const isInView = useInView(activeHeroContentRef, {
            once: false,
            amount: 0.9,
        });

        const newLineByDot = (text: string) =>
            text.split(". ").map((line, idx) => (
                <span key={idx}>
                    {line}.<br />
                </span>
            ));

        const animationClasses = useCallback(
            (type: "fade" | "slideLeft" | "slideRight" | "slideDown"): any => {
                // If reduced motion is preferred, no animations
                if (prefersReducedMotion) {
                    return {};
                }

                // Full animations when motion is allowed
                switch (type) {
                    case "fade":
                        return isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: -250 };
                    case "slideLeft":
                        return isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -250 };
                    case "slideRight":
                        return isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: 250 };
                    case "slideDown":
                        return isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: -250 };
                    default:
                        return "";
                }
            },
            [isInView, prefersReducedMotion],
        );
        return (
            <>
                {HERO_CONTENT.map((content, index) => {
                    const Tag = content.tag as keyof JSX.IntrinsicElements;
                    return (
                        <motion.div
                            className={cn(
                                prefersReducedMotion
                                    ? "transition-none"
                                    : "will-change-[transform,opacity]",
                            )}
                            initial={
                                prefersReducedMotion
                                    ? { opacity: 1, x: 0, y: 0 }
                                    : { opacity: 0, x: 0, y: 0 }
                            }
                            animate={
                                !prefersReducedMotion &&
                                content.animation &&
                                [
                                    "fade",
                                    "slideLeft",
                                    "slideRight",
                                    "slideDown",
                                ].includes(content.animation) &&
                                animationClasses(
                                    content.animation as
                                        | "fade"
                                        | "slideLeft"
                                        | "slideRight"
                                        | "slideDown",
                                )
                            }
                            transition={
                                prefersReducedMotion
                                    ? {}
                                    : {
                                          type: "spring",
                                          stiffness: 90, // Higher stiffness = more bouncy
                                          damping: 10, // Lower damping = more overshoot
                                          mass: 0.45, // Mass affects the spring behavior
                                          restDelta: 0.001,
                                          restSpeed: 0.001,
                                          delay: index * 0.1,
                                      }
                            }
                            key={`hero-content-${content.tag}-${index}`}
                        >
                            <Tag
                                aria-label={content.ariaLabel}
                                lang={content.lang}
                                className={cn(content.className)}
                            >
                                {content.animation === "slideRight"
                                    ? newLineByDot(content.text)
                                    : content.text}
                            </Tag>
                        </motion.div>
                    );
                })}
            </>
        );
    },
);
HeroContentComponent.displayName = "HeroContentComponent";

const HeroSection = (): JSX.Element => {
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
                    "px-12",
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
                        "ml-4",
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
                            activeHeroContentRef={activeHeroContentRef}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    </div>
                </div>

                {/* Image Container */}
                <div
                    className={cn(
                        "col-span-1",
                        "aspect-[8.5/11]",
                        // "bg-green-600",
                        "w-full",
                        "p-1",
                        "mr-8",
                        "neumorphic-hero-image",
                        "rounded-lg",
                    )}
                >
                    <HeroImage
                        className="translate-y-1 -translate-x-1"
                        prefersReducedMotion={prefersReducedMotion}
                    />
                </div>
            </div>

            {/* Mobile View */}
            <div
                className={cn(
                    "block md:hidden",
                    "relative w-full",
                    "px-3",
                    "mt-16",
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
                            activeHeroContentRef={activeHeroContentRef}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    </div>
                </div>

                {/* Image Container */}
                <div
                    className={cn(
                        "relative",
                        "scale-[.95]",
                        "neumorphic-hero-image",
                        "rounded-lg",
                        "p-1",
                    )}
                >
                    <HeroImage />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
