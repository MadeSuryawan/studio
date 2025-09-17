"use client";

import { useRef, ReactNode, type JSX } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useInView } from "framer-motion";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
}

const AnimatedSection = ({
    children,
    className,
}: AnimatedSectionProps): JSX.Element => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.3,
    });

    return (
        <div
            ref={sectionRef}
            className={cn(
                reducedMotion
                    ? "transition-none"
                    : "transition-all duration-700 ease-out will-change-[transform,opacity]",
                isInView
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
