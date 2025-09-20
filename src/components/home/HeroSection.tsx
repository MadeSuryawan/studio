// src/components/home/HeroSection.tsx
"use client";

import { type JSX, useState, useRef, memo, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    useMotionValue,
    useReducedMotion,
    type Target,
} from "framer-motion";
import useIsMobile from "@/hooks/use-mobile";
import { Iridescence } from "@/components/Iridescence";

type AnimationType = "slideLeft" | "slideRight" | "slideDown";

interface HeroContentProps {
    ariaLabel?: string;
    lang?: string;
    text: string;
    className?: string;
    initial: Target;
    animate: Target;
    animation?: AnimationType;
    tag: string;
}

const HERO_CONTENT: HeroContentProps[] = [
    {
        tag: "p",
        ariaLabel:
            "Om Swastyastu - Traditional Balinese greeting meaning 'May all be well'",
        lang: "ban-Bali",
        text: "ᬒᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ᭟",
        className: cn(
            "font-balibanat pb-3 md:pb-12 text-3xl sm:text-5xl md:text-7xl 2xl:text-9xl",
        ),
        animation: "slideDown",
        initial: { opacity: 0, y: -150 },
        animate: { opacity: 1, y: 0 },
    },
    {
        tag: "h1",
        ariaLabel: "Discover Your Bali Bliss",
        text: "Discover Your Bali Bliss",
        className: cn(
            "text-2xl sm:text-3xl md:text-5xl 2xl:text-7xl font-serif",
        ),
        animation: "slideLeft",
        initial: { opacity: 0, x: -150 },
        animate: { opacity: 1, x: 0 },
    },
    {
        tag: "p",
        ariaLabel:
            "We craft personalized, unforgettable journeys to the Island of the Gods. Let your story in Bali begin with us.",
        text: "We craft personalized, unforgettable journeys to the Island of the Gods. Let your story in Bali begin with us",
        className: cn(
            cn("text-md 2xl:text-lg whitespace-pre-line"),
            cn("tracking-tight md:tracking-normal"),
        ),
        animation: "slideRight",
        initial: { opacity: 0, x: 150 },
        animate: { opacity: 1, x: 0 },
    },
    {
        tag: "span",
        text: "Welcome to our Bali travel experience website. Scroll down to explore our services and destinations.",
        className: "sr-only",
        initial: { opacity: 1, x: 0, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
    },
] as const;

interface HeroImageProps {
    className?: string;
    reducedMotion?: boolean | null;
}

const HeroImage = memo(
    ({ className, reducedMotion }: HeroImageProps): JSX.Element => {
        const [imageError, setImageError] = useState(false);

        // Built-in scroll tracking
        const { scrollY } = useScroll();
        // We'll use a motion value to manually update the throttled value
        const throttledY = useMotionValue(0);

        // Parallax mapping
        const y = useTransform(scrollY, [0, 1000], [0, 500]);
        const smoothY = useSpring(throttledY, {
            stiffness: 100,
            damping: 10,
            mass: 0.5,
        });

        // Throttle updates to throttledY using requestAnimationFrame
        const frame = useRef<number | null>(null);

        useEffect(() => {
            const update = () => {
                throttledY.set(y.get());
                frame.current = null;
            };

            const unsubscribe = y.on("change", () => {
                if (frame.current === null) {
                    frame.current = requestAnimationFrame(update);
                }
            });

            return () => {
                unsubscribe();
                if (frame.current !== null) {
                    cancelAnimationFrame(frame.current);
                }
            };
        }, [y, throttledY]);

        return (
            <motion.div
                initial={
                    reducedMotion
                        ? { opacity: 1, scale: 1, x: 0, y: 0 }
                        : { opacity: 0, scale: 0, x: 200, y: -250 }
                }
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={
                    reducedMotion
                        ? { duration: 0 }
                        : {
                              type: "spring",
                              stiffness: 100,
                              damping: 10,
                              mass: 0.5,
                          }
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
                        "relative size-full bg-background rounded-lg",
                        "parallax-element",
                    )}
                    style={reducedMotion ? {} : { y: smoothY }}
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
    activeRef: React.RefObject<HTMLDivElement | null>;
    reducedMotion: boolean | null;
}

const HeroContentComponent = memo(
    ({ activeRef, reducedMotion }: HeroContentComponentProps) => {
        const isInView = useInView(activeRef, {
            once: false,
            amount: 0.9,
        });

        const newLineByDot = (text: string) =>
            text.split(". ").map((line, idx) => (
                <span key={idx}>
                    {line}.<br />
                </span>
            ));

        const notAnimate = { opacity: 1, x: 0, y: 0 } as const;

        return (
            <>
                {HERO_CONTENT.map((content, index) => {
                    const Tag = content.tag as keyof JSX.IntrinsicElements;
                    const MotionTag = motion.create(Tag);
                    return (
                        <motion.div
                            className={cn(
                                reducedMotion
                                    ? "transition-none"
                                    : "will-change-[transform,opacity]",
                            )}
                            initial={
                                reducedMotion ? notAnimate : content.initial
                            }
                            animate={
                                reducedMotion
                                    ? notAnimate
                                    : isInView
                                      ? content.animate
                                      : content.initial
                            }
                            transition={
                                reducedMotion
                                    ? {}
                                    : {
                                          type: "spring",
                                          stiffness: 90,
                                          damping: 10,
                                          mass: 0.45,
                                          restDelta: 0.001,
                                          restSpeed: 0.001,
                                          delay: index * 0.1,
                                      }
                            }
                            key={`hero-content-${content.tag}-${index}`}
                        >
                            <MotionTag
                                aria-label={content.ariaLabel}
                                lang={content.lang}
                                className={cn(content.className)}
                            >
                                {content.animation === "slideRight"
                                    ? newLineByDot(content.text)
                                    : content.text}
                            </MotionTag>
                        </motion.div>
                    );
                })}
            </>
        );
    },
);
HeroContentComponent.displayName = "HeroContentComponent";

const HeroSection = memo((): JSX.Element => {
    const isMobile = useIsMobile();
    const reducedMotion = useReducedMotion();
    // Separate refs for desktop and mobile views
    const desktopHeroContentRef = useRef<HTMLDivElement>(null);
    const mobileHeroContentRef = useRef<HTMLDivElement>(null);

    // Use the appropriate ref based on viewport
    const activeRef = isMobile ? mobileHeroContentRef : desktopHeroContentRef;

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
                )}
            >
                {/* Text Container */}
                <div
                    className={cn(
                        "relative",
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
                        className={cn(
                            "absolute inset-0",
                            "rounded-lg overflow-hidden opacity-30",
                            "saturate-[70%]",
                            "dark:brightness-[70%] dark:contrast-[1,3]",
                        )}
                    >
                        <Iridescence
                            color={[1, 1, 1]}
                            mouseReact={false}
                            amplitude={0.9}
                            speed={0.1}
                        />
                    </div>
                    <div
                        ref={desktopHeroContentRef}
                        className={cn(
                            "relative",
                            "flex flex-col items-center justify-center gap-6",
                            "size-full",
                            "text-center",
                            "text-hero-title",
                            "text-shadow-sm",
                            "px-4",
                            "-ml-1",
                            "neumorphic-cta-card",
                            "rounded-lg",
                            "overflow-hidden",
                        )}
                    >
                        <div
                            className={cn(
                                "absolute inset-0",
                                "rounded-lg overflow-hidden opacity-30",
                                "saturate-[70%]",
                                "neumorphic-cta-card",
                                "dark:brightness-[90%] dark:contrast-[1.3]",
                            )}
                        >
                            <Iridescence
                                color={[1, 1, 1]}
                                mouseReact={false}
                                amplitude={0.1}
                                speed={0.1}
                            />
                        </div>
                        <HeroContentComponent
                            activeRef={activeRef}
                            reducedMotion={reducedMotion}
                        />
                    </div>
                </div>

                {/* Image Container */}
                <div
                    className={cn(
                        "col-span-1",
                        "aspect-[8.5/11]",
                        "w-full",
                        "p-1",
                        "mr-8",
                        "neumorphic-hero-image",
                        "rounded-lg",
                        "flex place-content-center",
                    )}
                >
                    <HeroImage reducedMotion={reducedMotion} />
                </div>
            </div>

            {/* Mobile View */}
            <div
                className={cn(
                    "block md:hidden",
                    "relative w-full",
                    "px-3",
                    "mt-16",
                )}
            >
                {/* Text Container */}
                <div
                    className={cn(
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
                            "p-4",
                            "neumorphic-cta-card",
                            "dark:text-shadow-md",
                            "rounded-lg",
                            "overflow-hidden",
                        )}
                    >
                        <HeroContentComponent
                            activeRef={activeRef}
                            reducedMotion={reducedMotion}
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
                    <HeroImage reducedMotion={reducedMotion} />
                </div>
            </div>
        </section>
    );
});
HeroSection.displayName = "HeroSection";

export default HeroSection;
