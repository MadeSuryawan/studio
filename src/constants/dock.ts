// src/constants/dock.ts
import { cn } from "@/lib/utils";

/**
 * Constants for the ExpandableDock component
 * Centralizes all hardcoded values for better maintainability
 */

// Animation timing constants
export const DOCK_ANIMATION_TIMINGS = {
    WIDTH_EXPAND_DELAY: 400,
    FULL_EXPAND_DELAY: 850,
    CONTENT_FADE_DELAY: 250,
    HEIGHT_COLLAPSE_DELAY: 650,
    FULL_COLLAPSE_DELAY: 1050,
} as const;

// Animation easing curves
export const DOCK_ANIMATION_EASING = {
    CONTAINER_WIDTH: [0.4, 0, 0.2, 1],
    CONTAINER_HEIGHT: [0.25, 1, 0.5, 1],
    CONTAINER_BACKGROUND: [0.4, 0, 0.2, 1],
    ICON: [0.4, 0, 0.2, 1],
} as const;

// Animation durations
export const DOCK_ANIMATION_DURATIONS = {
    CONTAINER_WIDTH: 0.45,
    CONTAINER_HEIGHT: 0.45,
    CONTAINER_BACKGROUND: 0.3,
    CONTENT: 0.5,
    ICON: 0.3,
} as const;

// Dimension constants
export const DOCK_DIMENSIONS = {
    // Mobile dimensions
    MOBILE: {
        COLLAPSED_WIDTH: "0px",
        COLLAPSED_HEIGHT: "0px",
        EXPANDED_WIDTH: "min(96vw, 300px)",
        EXPANDED_HEIGHT: "min(75vh, 554px)",
    },
    // Desktop dimensions
    DESKTOP: {
        COLLAPSED_WIDTH: "0px",
        COLLAPSED_HEIGHT: "0px",
        EXPANDED_WIDTH: "min(90vw, 500px)",
        EXPANDED_HEIGHT: "min(80vh, 664px)",
    },
} as const;

// Color constants
export const DOCK_COLORS = {
    COLLAPSED_BACKGROUND: "hsla(190, 83%, 14%, 0.00)",
    EXPANDED_BACKGROUND: "hsla(60, 2%, 10%, .5)",
    COLLAPSED_BACKDROP_FILTER: "blur(0px)",
    EXPANDED_BACKDROP_FILTER: "blur(10px)",
} as const;

// CSS classes
export const DOCK_CLASSES = {
    CONTAINER: cn(
        cn("fixed bottom-3 md:bottom-4 left-2 md:left-4"),
        "z-50 w-[52px] md:w-[64px]",
        "aspect-square rounded-xl",
    ),
    BUTTON: cn(
        cn(
            "relative",
            "z-50",
            "aspect-square",
            "w-auto h-[52px] md:h-[64px]",
            "will-change-auto",
        ),
        "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
        "transition-all duration-300 ease-out",
        "rounded-[10%_22%_10%_22%_/_10%_22%_10%_22%]",
        cn("dark:bg-[#dd7526] bg-[#ff8629] hover:bg-[#ff9645]"),
    ),
    CONTENT: cn(
        cn("flex-1 overflow-hidden"),
        cn("bg-bg-alternate"),
        // cn("bg-[#45454594] dark:bg-[#232526ad]"),
        "border nav-border",
        "rounded-xl",
    ),
    SCROLL_AREA: cn(
        "relative overflow-y-auto overflow-x-hidden scrollbar-none h-full",
        "overscroll-contain touch-pan-y",
    ),
} as const;

// ARIA labels and accessibility
export const DOCK_ARIA_LABELS = {
    CONTAINER: "Expandable dock widget",
    TOGGLE_BUTTON: "Toggle Expandable Dock",
    CONTENT_REGION: "Dock content",
    CLOSE_BUTTON: "Close dock",
} as const;

// Keyboard shortcuts
export const DOCK_KEYBOARD = {
    TOGGLE_KEYS: ["Enter", " "] as const,
    CLOSE_KEY: "Escape" as const,
} as const;
