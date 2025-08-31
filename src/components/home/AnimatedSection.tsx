"use client";

import { useRef, ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
}

const AnimatedSection = ({
    children,
    className,
}: AnimatedSectionProps): JSX.Element => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // On mobile, animate once. On desktop, animate every time it enters the viewport.
    const isVisible = useIntersectionObserver(sectionRef, {
        triggerOnce: useIsMobile(),
        threshold: 0.2,
    });

    return (
        <div
            ref={sectionRef}
            className={cn(
                "transition-all duration-700 ease-out",
                "will-change-opacity-transform",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-10 translate-y-12",
                className,
            )}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;
