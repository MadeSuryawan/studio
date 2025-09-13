"use client";

import { type JSX, type FC, useState, memo } from "react";
import { ScrollToTopButton } from "./ScrollToTopButton";
import WhatsAppButton from "./WhatsAppButton";
import { ExpandBot } from "@/components/ExpandBot";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import useIsMobile from "@/hooks/use-mobile";

const smoothUp = {
    type: "spring",
    stiffness: 120,
    damping: 10,
    mass: 0.6,
    restDelta: 0.001,
    restSpeed: 0.001,
    delay: 0.5,
} as const;

const smoothleft = {
    type: "spring",
    stiffness: 110,
    damping: 10,
    mass: 0.4,
    restDelta: 0.001,
    restSpeed: 0.001,
    delay: 0.1,
} as const;

const FloatingButtons: FC = memo((): JSX.Element => {
    const [isHovered, setIsHovered] = useState(false);
    const reduceMotion = useReducedMotion();
    const isMobile = useIsMobile();
    const REVEAL_X = isMobile ? 32 : 15;
    const HIDE_X = isMobile ? 120 : 108;

    return (
        <>
            <motion.div
                className={cn(
                    "fixed right-2 md:right-4 z-50",
                    "flex flex-col items-center justify-between gap-4",
                )}
                role="presentation"
                initial={{ bottom: -100 }}
                animate={{ bottom: isMobile ? 12 : 16 }}
                transition={smoothUp}
            >
                <ScrollToTopButton />
                <motion.div
                    className={cn(
                        "relative flex flex-row items-center justify-center rounded-lg",
                    )}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onTap={() => setIsHovered(!isHovered)}
                    onTapStart={() => setIsHovered(true)}
                    onTapCancel={() => setIsHovered(false)}
                    onFocus={() => setIsHovered(true)}
                    onBlur={() => setIsHovered(false)}
                    role="presentation"
                >
                    <div
                        className={cn(
                            "absolute right-0",
                            "overflow-hidden",
                            "pointer-events-none", // Prevents interaction
                            "z-0", // Lower z-index than WhatsAppButton
                            "w-[170px]",
                            "rounded-lg",
                        )}
                    >
                        <motion.div
                            className="inline-flex items-center justify-center"
                            initial={{
                                x: reduceMotion ? HIDE_X : HIDE_X,
                            }}
                            animate={{
                                x: reduceMotion
                                    ? HIDE_X
                                    : isHovered
                                      ? REVEAL_X
                                      : HIDE_X,
                            }}
                            transition={
                                reduceMotion ? { duration: 0 } : smoothleft
                            }
                            inert
                            role="presentation"
                        >
                            <span
                                className={cn(
                                    "text-md md:text-lg font-semibold text-white text-center text-nowrap",
                                    "bg-[#128747]",
                                    "px-2 py-2 md:py-3 rounded-l-lg text-shadow-sm",
                                )}
                                aria-hidden
                                role="presentation"
                            >
                                Contact Us
                            </span>
                        </motion.div>
                    </div>
                    <WhatsAppButton className={cn("z-50 rounded-lg")} />
                </motion.div>
            </motion.div>
            <ExpandBot />
        </>
    );
});
FloatingButtons.displayName = "FloatingButtons";

export { FloatingButtons };
