"use client";

import { JSX, useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { throttle, ScrollToTop, cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

const THROTTLE_MS = 200;
const VISIBILITY_OFFSET = 500;

const ScrollToTopButton = memo(
    ({ className }: { className?: string }): JSX.Element | null => {
        const [isVisible, setIsVisible] = useState(false);
        const shouldReduceMotion = useReducedMotion();

        useEffect(() => {
            if (typeof window === "undefined") return;

            // Define the throttled handler inside useEffect to avoid stale closure and lint issues
            const handleScroll = throttle(() => {
                setIsVisible(window.scrollY > VISIBILITY_OFFSET);
            }, THROTTLE_MS);

            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        if (!isVisible) {
            return null;
        }
        const MotionButton = motion.create(Button);
        return (
            <MotionButton
                initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                type="button"
                className={cn(
                    "h-12 w-12 md:h-14 md:w-14",
                    "rounded-full",
                    "shadow-lg bg-[#212224]",
                    "text-[#f0f0f0] hover:bg-[#3F4145] border-[1px]",
                    className,
                )}
                onClick={ScrollToTop}
                aria-label="Scroll to top"
                role="button"
                tabIndex={0}
            >
                <ChevronUp className="scale-[1.75]" />
            </MotionButton>
        );
    },
);
ScrollToTopButton.displayName = "ScrollToTopButton";
export { ScrollToTopButton };
