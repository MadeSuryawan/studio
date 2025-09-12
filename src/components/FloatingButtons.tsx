"use client";

import { type JSX, useState, memo } from "react";
import { ScrollToTopButton } from "./ScrollToTopButton";
import WhatsAppButton from "./WhatsAppButton";
import ExpandBot from "@/components/ExpandBot";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const FloatingButtons = memo((): JSX.Element => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <div
                className={cn(
                    "fixed bottom-3 md:bottom-4 right-2 md:right-4 z-50",
                    "flex flex-col items-center justify-between gap-4",
                    // "bg-red-500",
                )}
            >
                <ScrollToTopButton />
                <motion.div
                    className={cn(
                        "relative flex flex-row items-center justify-center",
                    )}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <WhatsAppButton className="z-50" />
                    <motion.div
                        className={cn(
                            "absolute right-0 z-0",
                            "rounded-l-sm",
                            "bg-[#128747]",
                            "w-full",
                            "px-2",
                            "pointer-events-none",
                        )}
                        initial={{
                            width: "auto",
                            x: "-10px",
                            opacity: "0",
                        }}
                        animate={{
                            width: isHovered ? "auto" : "auto",
                            opacity: isHovered ? "1" : "0",
                            x: isHovered ? "-64px" : "-7px",
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                    >
                        <span
                            className={cn(
                                "text-lg font-semibold text-white text-center text-nowrap",
                            )}
                        >
                            Contact Us
                        </span>
                    </motion.div>
                </motion.div>
            </div>
            <ExpandBot />
        </>
    );
});
FloatingButtons.displayName = "FloatingButtons";

export { FloatingButtons };
