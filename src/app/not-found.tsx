// src/app/not-found.tsx
"use client";

import React, {
    useRef,
    useEffect,
    useCallback,
    MouseEvent,
    useState,
} from "react";
import Image from "next/image";
import { useTheme } from "next-themes"; // ✅ useTheme hook for theme detection
import { Particles } from "@/components/ui/particles";
import { ButtonFunc } from "@/components/home/SectionCard";

interface NotFoundProps {
    particleCount?: number;
    particleSize?: number;
    animate?: boolean;
    imageLight?: string;
    imageDark?: string;
    buttonText?: string;
    buttonHref?: string;
    className?: string;
    onButtonClick?: () => void;
}

export default function NotFound({
    particleCount = 2000,
    particleSize = 5,
    animate = true,
    imageLight = "/images/404-lightc.png",
    imageDark = "/images/404-darkc.png",
    buttonText = "Back to Home",
    buttonHref = "/",
    className = "custom-shadow",
    onButtonClick,
}: NotFoundProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    const { theme } = useTheme();
    const isDark = theme === "dark";

    // ✅ Detect reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    /**
     * Handle mouse movement for tilt effect
     * Skips effect if user prefers reduced motion
     */
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (prefersReducedMotion) return; // ✅ disable tilt if reduced motion
            if (rafRef.current) return;

            const { clientX, clientY } = e;

            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                const container = containerRef.current;
                const image = imageRef.current;
                if (!container || !image) return;

                const { left, top, width, height } =
                    container.getBoundingClientRect();
                const x = clientX - left;
                const y = clientY - top;

                const rotateX = ((y - height / 2) / height) * -10;
                const rotateY = ((x - width / 2) / width) * 10;

                image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        },
        [prefersReducedMotion],
    );

    /**
     * Reset tilt effect when mouse leaves the container
     */
    const handleMouseLeave = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        if (imageRef.current) {
            imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
        }
    }, []);

    // ✅ Cleanup animation frame on unmount
    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <main
            ref={containerRef}
            role="main"
            aria-label="Page not found"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black ${className || ""}`}
            style={{ perspective: "1000px" }}
        >
            {/* Particle background */}
            <Particles
                color={isDark ? "#ffffff" : "#a91313"}
                particleCount={Math.min(particleCount, 2000)}
                particleSize={particleSize}
                animate={animate && !prefersReducedMotion} // ✅ disable animation if reduced motion
                className="absolute inset-0 z-0"
                aria-hidden="true"
            />

            {/* 404 Image with tilt effect */}
            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out will-change-transform pointer-events-none z-10"
            >
                <Image
                    src={imageLight}
                    alt="404 not found illustration (light mode)"
                    fill
                    loading="eager"
                    className="object-contain dark:hidden"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Image
                    src={imageDark}
                    alt="404 not found illustration (dark mode)"
                    fill
                    loading="eager"
                    className="object-contain hidden dark:block"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Back to home button */}
            <div className="absolute z-30 mt-16 md:mt-0 bottom-24 sm:bottom-16 md:bottom-44">
                <ButtonFunc
                    className="md:scale-[1.5] md:hover:scale-[1.75]"
                    text={buttonText}
                    link={buttonHref}
                    arrow={false}
                    onClick={onButtonClick}
                    ariaLabel="Back to home"
                />
            </div>
        </main>
    );
}
