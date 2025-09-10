"use client";

import {
    useState,
    ReactNode,
    useRef,
    useEffect,
    useCallback,
    useMemo,
    memo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/use-mobile";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, X } from "lucide-react";
import {
    DOCK_ANIMATION_TIMINGS,
    DOCK_ANIMATION_EASING,
    DOCK_ANIMATION_DURATIONS,
    DOCK_DIMENSIONS,
    DOCK_COLORS,
    DOCK_CLASSES,
    DOCK_ARIA_LABELS,
    DOCK_KEYBOARD,
    DOCK_DEFAULTS,
} from "@/constants/dock";

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

// Animation configurations - dynamic based on reduced motion preferences
const getMotionVariants = (prefersReducedMotion: boolean | null) => ({
    container: {
        width: {
            duration: prefersReducedMotion
                ? 0
                : DOCK_ANIMATION_DURATIONS.CONTAINER_WIDTH,
            ease: DOCK_ANIMATION_EASING.CONTAINER_WIDTH,
        },
        height: {
            duration: prefersReducedMotion
                ? 0
                : DOCK_ANIMATION_DURATIONS.CONTAINER_HEIGHT,
            ease: DOCK_ANIMATION_EASING.CONTAINER_HEIGHT,
        },
        backgroundColor: {
            duration: prefersReducedMotion
                ? 0
                : DOCK_ANIMATION_DURATIONS.CONTAINER_BACKGROUND,
            ease: DOCK_ANIMATION_EASING.CONTAINER_BACKGROUND,
        },
    },
    content: {
        duration: prefersReducedMotion ? 0 : DOCK_ANIMATION_DURATIONS.CONTENT,
    },
    icon: {
        duration: prefersReducedMotion ? 0 : DOCK_ANIMATION_DURATIONS.ICON,
        ease: DOCK_ANIMATION_EASING.ICON,
    },
});

const ExpandableDock = ({
    children,
    className,
    onExpand,
    onCollapse,
    defaultExpanded = DOCK_DEFAULTS.DEFAULT_EXPANDED,
    toggleAriaLabel = DOCK_DEFAULTS.TOGGLE_ARIA_LABEL,
}: ExpandableDockProps) => {
    const [animationStage, setAnimationStage] = useState<AnimationStage>(
        defaultExpanded ? "fullyExpanded" : "collapsed",
    );

    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const prefersReducedMotion = useReducedMotion();

    // Get motion variants based on user preferences
    const motionVariants = useMemo(
        () => getMotionVariants(prefersReducedMotion),
        [prefersReducedMotion],
    );

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
        onExpand?.();

        if (prefersReducedMotion) {
            // Skip animations for users who prefer reduced motion
            setAnimationStage("fullyExpanded");
        } else {
            setAnimationStage("widthExpanding");
            timersRef.current.push(
                window.setTimeout(
                    () => setAnimationStage("heightExpanding"),
                    DOCK_ANIMATION_TIMINGS.WIDTH_EXPAND_DELAY,
                ),
            );
            timersRef.current.push(
                window.setTimeout(
                    () => setAnimationStage("fullyExpanded"),
                    DOCK_ANIMATION_TIMINGS.FULL_EXPAND_DELAY,
                ),
            );
        }
    }, [onExpand, prefersReducedMotion]);

    const handleCollapse = useCallback(() => {
        clearTimers();
        onCollapse?.();

        if (prefersReducedMotion) {
            // Skip animations for users who prefer reduced motion
            setAnimationStage("collapsed");
        } else {
            setAnimationStage("contentFadingOut");
            timersRef.current.push(
                window.setTimeout(
                    () => setAnimationStage("heightCollapsing"),
                    DOCK_ANIMATION_TIMINGS.CONTENT_FADE_DELAY,
                ),
            );
            timersRef.current.push(
                window.setTimeout(
                    () => setAnimationStage("widthCollapsing"),
                    DOCK_ANIMATION_TIMINGS.HEIGHT_COLLAPSE_DELAY,
                ),
            );
            timersRef.current.push(
                window.setTimeout(
                    () => setAnimationStage("collapsed"),
                    DOCK_ANIMATION_TIMINGS.FULL_COLLAPSE_DELAY,
                ),
            );
        }
    }, [onCollapse, prefersReducedMotion]);

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

    // Memoize dimensions for performance using constants
    const dimensions = useMemo(() => {
        const deviceDimensions = isMobile
            ? DOCK_DIMENSIONS.MOBILE
            : DOCK_DIMENSIONS.DESKTOP;
        return {
            collapsedW: deviceDimensions.COLLAPSED_WIDTH,
            collapsedH: deviceDimensions.COLLAPSED_HEIGHT,
            expandedW: deviceDimensions.EXPANDED_WIDTH,
            expandedH: deviceDimensions.EXPANDED_HEIGHT,
            marginLeft: DOCK_DIMENSIONS.MARGIN_LEFT,
            marginBottom: DOCK_DIMENSIONS.MARGIN_BOTTOM,
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
                ? DOCK_COLORS.COLLAPSED_BACKGROUND
                : animationStage === "fullyExpanded" ||
                    animationStage === "contentFadingOut" ||
                    animationStage === "heightCollapsing" ||
                    animationStage === "widthCollapsing"
                  ? DOCK_COLORS.EXPANDED_BACKGROUND
                  : DOCK_COLORS.EXPANDED_BACKGROUND,
            backdropFilter: isCollapsed
                ? DOCK_COLORS.COLLAPSED_BACKDROP_FILTER
                : DOCK_COLORS.EXPANDED_BACKDROP_FILTER,
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
            className={DOCK_CLASSES.CONTAINER}
            role="complementary"
            aria-label={DOCK_ARIA_LABELS.CONTAINER}
        >
            <Button
                id="expandable-dock-header"
                onClick={handleToggle}
                onKeyDown={(e) => {
                    // Improve keyboard accessibility using constants
                    if (
                        (
                            DOCK_KEYBOARD.TOGGLE_KEYS as readonly string[]
                        ).includes(e.key)
                    ) {
                        e.preventDefault();
                        handleToggle();
                    }
                    // ESC key to close when expanded
                    if (e.key === DOCK_KEYBOARD.CLOSE_KEY && isExpanded) {
                        e.preventDefault();
                        handleCollapse();
                    }
                }}
                aria-expanded={isExpanded}
                aria-label={toggleAriaLabel}
                aria-controls="expandable-dock-content"
                variant="ghost"
                className={cn(
                    "relative w-full h-[52px] md:h-[64px] will-change-auto",
                    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
                    // `${isExpanded ? "bg-[#063842]" : "bg-gradient-to-b from-[#ff9747] to-[#c06622]"}`,
                    `${isExpanded ? "bg-[#063842]" : "dark:bg-[#dd7526] bg-[#ff8629]"}`,
                    "transition-all duration-300 ease-out",
                    "rounded-[9%_21%_9%_21%_/_9%_21%_9%_21%]",
                    // "hover:scale-[1.05]",
                    "shadow-lg",
                    "hover:bg-[#ff9645]",
                    // "neumorphic-accent-button",
                )}
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
                                transition={motionVariants.icon}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <X
                                    className={cn(
                                        "scale-[1.5] text-white/70",
                                        "icon-shadow-md",
                                    )}
                                />
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
                                transition={motionVariants.icon}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <BotMessageSquare
                                    className={cn(
                                        "scale-[2.7] md:scale-[3.3] text-white/80",
                                        " dark:text-white/90",
                                    )}
                                />
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
                transition={motionVariants.container}
                className={cn(
                    "shadow-2xl overflow-hidden flex flex-col-reverse rounded-xl",
                    "transition-all duration-500 ease-out pointer-events-visiblePainted mt-[1px]",
                    className,
                )}
            >
                <motion.div
                    animate={{
                        opacity: isExpanded ? 1 : 0,
                        height: isExpanded ? "auto" : 0,
                    }}
                    transition={motionVariants.content}
                    id="expandable-dock-content"
                    className={DOCK_CLASSES.CONTENT}
                    role="region"
                    aria-label={DOCK_ARIA_LABELS.CONTENT_REGION}
                    aria-hidden={!isExpanded}
                    tabIndex={isExpanded ? 0 : -1}
                >
                    <div
                        className={DOCK_CLASSES.SCROLL_AREA}
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

export default memo(ExpandableDock);
