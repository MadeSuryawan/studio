"use client";

import { JSX, useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { throttle, ScrollToTop, cn } from "@/lib/utils";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const THROTTLE_MS = 200;
const VISIBILITY_OFFSET = 1000; // Start with a reasonable value for testing

// Create MotionButton outside component to avoid recreation
const MotionButton = motion.create(Button);

const buttonClassName = cn(
    "h-12 w-12 md:h-14 md:w-14 rounded-full",
    "bg-[#212224] shadow-lg",
    "text-[#f0f0f0] hover:bg-[#3F4145] border-[1px]",
);

const ScrollToTopButton = memo((): JSX.Element | null => {
    const [isVisible, setIsVisible] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = throttle(() => {
            const scrollY = window.scrollY;
            const shouldShow = scrollY > VISIBILITY_OFFSET;
            setIsVisible(shouldShow);
        }, THROTTLE_MS);

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <MotionButton
                    key="scroll-to-top" // Add key for AnimatePresence
                    initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                    animate={
                        reduceMotion
                            ? {}
                            : { opacity: [0, 1, 1], y: [40, -10, 0] }
                    }
                    exit={
                        reduceMotion
                            ? {}
                            : { opacity: [1, 1, 0], y: [0, -10, 40] }
                    }
                    transition={
                        reduceMotion
                            ? { duration: 0 }
                            : {
                                  duration: 0.5,
                                  ease: "easeInOut",
                                  delay: 0.2,
                                  times: [0, 0.3, 1],
                              }
                    }
                    size="icon"
                    type="button"
                    className={buttonClassName}
                    onClick={ScrollToTop}
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="scale-[1.75]" />
                </MotionButton>
            )}
        </AnimatePresence>
    );
});

ScrollToTopButton.displayName = "ScrollToTopButton";
export { ScrollToTopButton };
