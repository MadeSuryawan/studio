"use client";

import { useState, useEffect, useCallback, JSX, memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { ScrollToTop, cn } from "@/lib/utils";
import {
    motion,
    useReducedMotion,
    AnimatePresence,
    useScroll,
    useMotionValue,
} from "framer-motion";

// Constants
const VISIBILITY_OFFSET = 1000;
const BUTTON_SIZE = "h-12 w-12 md:h-14 md:w-14";
const BUTTON_STYLE = cn(
    "rounded-full bg-[#212224] shadow-lg text-[#f0f0f0] hover:bg-[#3F4145] border-[1px]",
);
const buttonClassName = cn(BUTTON_SIZE, BUTTON_STYLE);

// Memoized MotionButton to avoid recreation
const MotionButton = motion.create(Button);

const ScrollToTopButton = memo(
    function ScrollToTopButton(): JSX.Element | null {
        const [isVisible, setIsVisible] = useState(false);
        const reduceMotion = useReducedMotion();

        // Framer Motion's useScroll for scroll position
        const { scrollY } = useScroll();
        // Motion value for animating button's y position
        const y = useMotionValue(40);

        // Efficient scroll handler using requestAnimationFrame
        useEffect(() => {
            let ticking = false;

            const updateVisibility = () => {
                setIsVisible(scrollY.get() > VISIBILITY_OFFSET);
                ticking = false;
            };

            const handleScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(updateVisibility);
                    ticking = true;
                }
            };

            // Initial check
            updateVisibility();

            // Listen to Framer Motion's scrollY changes
            const unsubscribe = scrollY.on("change", handleScroll);

            return () => {
                unsubscribe();
            };
        }, [scrollY]);

        // Animate y value when visibility changes
        useEffect(() => {
            if (reduceMotion) return;
            y.set(isVisible ? 0 : 40);
        }, [y, isVisible, reduceMotion]);

        // Memoized click handler
        const handleClick = useCallback(() => {
            ScrollToTop();
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
                        onClick={handleClick}
                        aria-label="Scroll to top"
                    >
                        <ChevronUp className="scale-[1.75]" />
                    </MotionButton>
                )}
            </AnimatePresence>
        );
    },
);

ScrollToTopButton.displayName = "ScrollToTopButton";
export { ScrollToTopButton };
