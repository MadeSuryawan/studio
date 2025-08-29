"use client";

import React, {
    useState,
    ReactNode,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, X } from "lucide-react";

interface ExpandableDockProps {
    children: ReactNode;
    className?: string;
    /** Optional callback when dock expands */
    onExpand?: () => void;
    /** Optional callback when dock collapses */
    onCollapse?: () => void;
    /** Optional initial state */
    defaultExpanded?: boolean;
    /** Optional aria-label for the toggle button */
    toggleAriaLabel?: string;
}

type AnimationStage =
    | "collapsed"
    | "widthExpanding"
    | "heightExpanding"
    | "fullyExpanded"
    | "contentFadingOut"
    | "heightCollapsing"
    | "widthCollapsing";

// Animation timing constants for better maintainability
const ANIMATION_TIMINGS = {
    WIDTH_EXPAND_DELAY: 400,
    FULL_EXPAND_DELAY: 850,
    CONTENT_FADE_DELAY: 250,
    HEIGHT_COLLAPSE_DELAY: 650,
    FULL_COLLAPSE_DELAY: 1050,
} as const;

// Animation configurations
const MOTION_VARIANTS = {
    container: {
        width: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
        height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
        backgroundColor: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    content: {
        duration: 0.5,
    },
    icon: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
    },
} as const;

const ExpandableDock = ({
    children,
    className,
    onExpand,
    onCollapse,
    defaultExpanded = false,
    toggleAriaLabel = "Toggle Expandable Dock",
}: ExpandableDockProps) => {
    const [animationStage, setAnimationStage] = useState<AnimationStage>(
        defaultExpanded ? "fullyExpanded" : "collapsed",
    );

    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    // Keep track of animation timers to avoid overlaps/leaks on rapid toggles
    const timersRef = useRef<number[]>([]);
    const clearTimers = () => {
        timersRef.current.forEach((id) => clearTimeout(id));
        timersRef.current = [];
    };

    // Clear any pending timers on unmount
    useEffect(() => {
        return () => {
            clearTimers();
        };
    }, []);

    // Prevent hydration mismatch by waiting for client-side mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleExpand = useCallback(() => {
        clearTimers();
        setAnimationStage("widthExpanding");
        onExpand?.();

        timersRef.current.push(
            window.setTimeout(
                () => setAnimationStage("heightExpanding"),
                ANIMATION_TIMINGS.WIDTH_EXPAND_DELAY,
            ),
        );
        timersRef.current.push(
            window.setTimeout(
                () => setAnimationStage("fullyExpanded"),
                ANIMATION_TIMINGS.FULL_EXPAND_DELAY,
            ),
        );
    }, [onExpand]);

    const handleCollapse = useCallback(() => {
        clearTimers();
        setAnimationStage("contentFadingOut");
        onCollapse?.();

        timersRef.current.push(
            window.setTimeout(
                () => setAnimationStage("heightCollapsing"),
                ANIMATION_TIMINGS.CONTENT_FADE_DELAY,
            ),
        );
        timersRef.current.push(
            window.setTimeout(
                () => setAnimationStage("widthCollapsing"),
                ANIMATION_TIMINGS.HEIGHT_COLLAPSE_DELAY,
            ),
        );
        timersRef.current.push(
            window.setTimeout(
                () => setAnimationStage("collapsed"),
                ANIMATION_TIMINGS.FULL_COLLAPSE_DELAY,
            ),
        );
    }, [onCollapse]);

    const isCollapsed = animationStage === "collapsed";
    const isExpanded = animationStage === "fullyExpanded";

    // Keep a live ref of expanded state to avoid re-binding the document listener on each change
    const isExpandedRef = useRef(isExpanded);
    useEffect(() => {
        isExpandedRef.current = isExpanded;
    }, [isExpanded]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node) &&
                isExpandedRef.current
            ) {
                handleCollapse();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleCollapse]);

    const isMobile = useIsMobile();

    // Memoize dimensions for performance
    const dimensions = useMemo(() => {
        const collapsedW = isMobile ? "min(94vw, 54px)" : "min(90vw, 64px)";
        const collapsedH = isMobile ? "54px" : "64px";
        const expandedW = isMobile ? "min(96vw, 300px)" : "min(90vw, 500px)";
        const expandedH = isMobile ? "min(75vh, 554px)" : "min(80vh, 664px)";
        const marginLeft = "ml-[9px]";
        const marginBottom = "mb-[9px]";
        return {
            collapsedW,
            collapsedH,
            expandedW,
            expandedH,
            marginLeft,
            marginBottom,
        };
    }, [isMobile]);

    // Memoize animation properties for performance
    const animationProps = useMemo(
        () => ({
            width:
                animationStage === "collapsed" ||
                animationStage === "widthCollapsing"
                    ? dimensions.collapsedW
                    : dimensions.expandedW,
            height:
                animationStage === "collapsed" ||
                animationStage === "widthExpanding" ||
                animationStage === "widthCollapsing"
                    ? dimensions.collapsedH
                    : dimensions.expandedH,
            backgroundColor: isCollapsed
                ? "hsla(190, 83%, 14%, 0.00)"
                : animationStage === "fullyExpanded" ||
                    animationStage === "contentFadingOut" ||
                    animationStage === "heightCollapsing" ||
                    animationStage === "widthCollapsing"
                  ? "hsla(60, 2%, 10%, .5)"
                  : "hsla(60, 2%, 10%, .5)",
            backdropFilter: isCollapsed ? "blur(0px)" : "blur(5px)",
            // translateY: isCollapsed ? "64px" : "0px",
            opacity: isCollapsed
                ? 0
                : animationStage === "heightCollapsing" ||
                    animationStage === "widthCollapsing" ||
                    animationStage === "widthExpanding"
                  ? 0
                  : 1,
        }),
        [animationStage, dimensions, isCollapsed],
    );

    // Memoize toggle handler for performance
    const handleToggle = useCallback(() => {
        if (isCollapsed) {
            handleExpand();
        } else {
            handleCollapse();
        }
    }, [isCollapsed, handleExpand, handleCollapse]);

    // Prevent flash of incorrect content during hydration
    if (!isMounted) {
        return null;
    }

    return (
        <div
            className="fixed bottom-6 md:bottom-4 left-4 z-50 w-[52px] md:w-[64px] translate-y-[64px]"
            role="complementary"
            aria-label="Expandable dock widget"
        >
            <Button
                id="expandable-dock-header"
                onClick={handleToggle}
                onKeyDown={(e) => {
                    // Improve keyboard accessibility
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggle();
                    }
                    // ESC key to close when expanded
                    if (e.key === "Escape" && isExpanded) {
                        e.preventDefault();
                        handleCollapse();
                    }
                }}
                aria-expanded={isExpanded}
                aria-label={toggleAriaLabel}
                aria-controls="expandable-dock-content"
                variant="ghost"
                className="relative w-full h-[52px] md:h-[64px] rounded-xl focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                style={{
                    backgroundColor: isExpanded ? "#063842" : "#ee812eff",
                    // marginBottom: isCollapsed ? "0px" : "1px",
                    willChange: "transform, opacity",
                    transition: "all .5s ease-out",
                }}
            >
                <div className="pointer-events-none">
                    <AnimatePresence mode="wait" initial={false}>
                        {isExpanded ? (
                            <motion.span
                                key="close-icon"
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: -90,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: 90,
                                }}
                                transition={MOTION_VARIANTS.icon}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <X className="scale-[1.5] text-foreground/80" />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="bot-icon"
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: 90,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: -90,
                                }}
                                transition={MOTION_VARIANTS.icon}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <BotMessageSquare className="scale-[2.2] sm:scale-[2.8] text-foreground/80" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </Button>
            <motion.div
                ref={containerRef}
                initial={{
                    width: "auto",
                    height: "auto",
                    backgroundColor: "hsla(190, 83%, 14%, 0.00)",
                    backdropFilter: "blur(0px)",
                }}
                animate={animationProps}
                transition={MOTION_VARIANTS.container}
                className={cn(
                    "shadow-2xl overflow-hidden flex flex-col-reverse rounded-xl transition-all duration-500 ease-out pointer-events-visiblePainted mt-[1px]",
                    className,
                )}
            >
                <motion.div
                    animate={{
                        opacity: isExpanded ? 1 : 0,
                        height: isExpanded ? "auto" : 0,
                    }}
                    transition={MOTION_VARIANTS.content}
                    id="expandable-dock-content"
                    className="flex-1 flex flex-col overflow-hidden bg-bg-alternate h-full"
                    role="region"
                    aria-label="Dock content"
                    aria-hidden={!isExpanded}
                    tabIndex={isExpanded ? 0 : -1}
                >
                    <div
                        className="overflow-y-auto overflow-x-hidden scrollbar-none h-full"
                        role="main"
                        aria-live="polite"
                    >
                        {isExpanded && children}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default React.memo(ExpandableDock);
