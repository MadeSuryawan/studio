"use client";

import { useRef, useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(
        () =>
            typeof document !== "undefined" &&
            document.documentElement.classList.contains("dark"),
    );

    useEffect(() => {
        const observer = () => {
            const html = document.documentElement;
            setIsDark(html.classList.contains("dark"));
        };

        observer();

        const mutationObserver = new MutationObserver(observer);
        mutationObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => mutationObserver.disconnect();
    }, []);

    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, []);

    const handleMouseMove = (e: MouseEvent) => {
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
    };

    const handleMouseLeave = () => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        if (imageRef.current) {
            imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative h-[24rem] md:h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black ${className || ""}`}
            style={{ perspective: "1000px" }}
        >
            <Particles
                color={isDark ? "#ffffff" : "#000000"}
                particleCount={Math.min(particleCount, 2000)}
                particleSize={particleSize}
                animate={animate}
                className="absolute inset-0 z-0"
            />

            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out will-change-transform pointer-events-none z-10"
            >
                <Image
                    src={imageLight}
                    alt="404 Light"
                    fill
                    className="object-contain dark:hidden"
                    priority={!isDark}
                    sizes="100vw"
                />
                <Image
                    src={imageDark}
                    alt="404 Dark"
                    fill
                    className="object-contain hidden dark:block"
                    priority={isDark}
                    sizes="100vw"
                />
            </div>

            <Particles
                color={isDark ? "#ffffff" : "#000000"}
                particleCount={Math.min(particleCount, 2000)}
                particleSize={particleSize}
                animate={animate}
                className="absolute inset-0 z-20 pointer-events-none"
            />

            <div className="relative z-30 mt-16 md:mt-0">
                <Button asChild variant="default">
                    <Link href={buttonHref} onClick={onButtonClick}>
                        {buttonText}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
