"use client";

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

const textClassName = cn(
    cn("hover:bg-white/40 dark:hover:bg-slate-500/50"),
    "text-md rounded-md",
    "px-3 py-1",
    "cursor-pointer", // Add cursor pointer for better UX
    cn("border-b border-gray-100 dark:border-gray-500 block"),
) as string;

const ThemeSwitcher = () => {
    const { setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [hasError, setHasError] = useState(false);
    const reduceMotion = useReducedMotion();

    // Create a container ref that includes both button and dropdown
    const containerRef = useOutsideClick<HTMLDivElement>(() => {
        setIsOpen(false);
    }, isOpen);

    const toggleThemeMenu = useCallback(() => {
        try {
            setIsOpen((prev) => !prev);
        } catch (error) {
            console.error("Error toggling theme menu:", error);
            setHasError(true);
        }
    }, []);

    const handleThemeSelect = useCallback(
        (theme: "light" | "dark") => {
            try {
                setTheme(theme);
                setIsOpen(false); // Close dropdown after selection
            } catch (error) {
                console.error("Error setting theme:", error);
                setHasError(true);
            }
        },
        [setTheme],
    );

    // Curried function - returns a function that handles the event
    const handleKeyDown = useCallback(
        (theme: "light" | "dark") => (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleThemeSelect(theme);
            }
        },
        [handleThemeSelect],
    );

    // Error boundary effect
    useEffect(() => {
        if (hasError) {
            console.warn(
                "ThemeSwitcher encountered an error, some functionality may be limited",
            );
        }
    }, [hasError]);

    if (hasError) {
        return (
            <div>
                <span className="text-sm text-red-600">
                    Theme switcher temporarily unavailable
                </span>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative">
            <Button
                variant="outline"
                size="icon"
                className={cn(
                    "aspect-square flex items-center justify-center",
                    "h-full w-10 md:w-11",
                    "neumorphic-button",
                    "focus:ring-0 focus:ring-offset-0",
                    "rounded-md border md:nav-border",
                    "text-center",
                )}
                onClick={toggleThemeMenu}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label="Toggle theme menu"
            >
                {/* <Sun
                    className={cn(
                        "h-[1.2rem] w-[1.2rem] rotate-0 scale-[1.3]",
                        "md:scale-[1.5] transition-all dark:-rotate-90 dark:scale-0",
                    )}
                />
                <Moon
                    className={cn(
                        "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
                        "dark:rotate-[-90deg] dark:scale-[1.3] md:dark:scale-[1.4]",
                    )}
                /> */}

                <div
                    className={cn(
                        "h-[1.2rem] w-[1.2rem] rotate-0 scale-[2]",
                        "md:scale-[2.3] transition-all dark:-rotate-90 dark:scale-0",
                    )}
                >
                    ☀️
                </div>
                <div
                    className={cn(
                        "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
                        "dark:rotate-[-20deg] dark:scale-[1.3] md:dark:scale-[1.4]",
                    )}
                >
                    🌙
                </div>
                <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={cn(
                            "absolute top-full right-0",
                            "mt-3 md:mt-2",
                            "-mr-6 md:-mr-1",
                            "pt-2 pb-4 px-3",
                            "rounded-lg",
                            "grid grid-flow-row space-y-3",
                            "items-center justify-center",
                            "min-w-fit",
                            "font-medium tracking-widest",
                            "shadow-lg",
                            "border nav-border",
                            "backdrop-blur-md",
                            "bg-slate-300/60 dark:bg-slate-800/60",
                        )}
                        initial={{
                            opacity: 0,
                            clipPath: "inset(0 0 100% 0)",
                        }}
                        animate={{
                            opacity: [0, 1, 1],
                            clipPath: [
                                "inset(0 0 100% 0)",
                                "inset(0 0 50% 0)",
                                "inset(0 0 0% 0)",
                            ],
                        }}
                        exit={{
                            opacity: [1, 1, 0],
                            clipPath: [
                                "inset(0 0 0% 0)",
                                "inset(0 0 50% 0)",
                                "inset(0 0 100% 0)",
                            ],
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.3,
                            ease: "easeOut",
                            times: [0, 0.3, 1],
                        }}
                    >
                        <div
                            onClick={() => handleThemeSelect("light")}
                            className={textClassName}
                            role="menuitem"
                            tabIndex={0}
                            onKeyDown={handleKeyDown("light")}
                        >
                            Light
                        </div>
                        <div
                            onClick={() => handleThemeSelect("dark")}
                            className={textClassName}
                            role="menuitem"
                            tabIndex={0}
                            onKeyDown={handleKeyDown("dark")}
                        >
                            Dark
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeSwitcher;
