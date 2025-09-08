// src/components/ui/navbar-flow.tsx
"use client";

import {
    useEffect,
    useState,
    useCallback,
    useId,
    useMemo,
    memo,
    type FC,
    isValidElement,
    Children,
} from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import {
    Menu as List,
    X as Close,
    ChevronDown as ArrowDown,
    ChevronUp as ArrowUp,
} from "lucide-react";
import { ACCESSIBILITY_LABELS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/hooks/use-contact-modal";
import { usePathname } from "next/navigation";

interface NavLink {
    text: string;
    url?: string;
    submenu?: React.ReactNode;
    isModal?: boolean;
}

interface NavbarFlowProps {
    emblem?: React.JSX.Element;
    links?: NavLink[];
    extraIcons?: React.ReactNode[];
    styleName?: string;
    rightComponent?: React.JSX.Element;
    // How many milliseconds earlier than the nav reveal should the links start animating
    linksHeadStartMs?: number;
}

interface ListItemProps {
    setSelected: (element: string | null) => void;
    selected: string | null;
    element: string;
    children: React.ReactNode;
}

interface HoverLinkProps {
    url: string;
    children: React.ReactNode;
    onPress?: () => void;
}

interface FeatureItemProps {
    heading: string;
    url: string;
    info: string;
    onPress?: () => void;
}

// Animation and transition constants
const NAVBAR_CONSTANTS = {
    // Breakpoints
    MOBILE_BREAKPOINT: 767,

    // Animation durations
    QUICK_DURATION: 0.5,
    NAV_DURATION: 0.8,
    SVG_DURATION: 0.5,
    NAV_DELAY: 0.5,
    MOBILE_MENU_DURATION: 0.3,
    SUBMENU_DURATION: 0.2,

    // Stagger delays
    LINK_STAGGER_DELAY: 0.08,

    // Z-index values
    Z_INDEX: {
        NAVBAR: 50,
        DROPDOWN: 50,
        MOBILE_MENU: 40,
        BACKDROP: 10,
        CONTENT: 10,
    },

    // Dimensions
    NAVBAR_HEIGHT: {
        MOBILE: "h-12",
        DESKTOP: "md:h-[58px]",
    },

    // Dropdown positioning
    DROPDOWN_OFFSET: "calc(100%_+_0.5rem)",
    DROPDOWN_MAX_WIDTH: "min(90vw, 400px)",

    // Mobile menu positioning
    MOBILE_MENU_TOP_OFFSET: 20,
} as const;

const springTransition = {
    type: "spring" as const,
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
} as const;

/**
 * Enhanced ListItem component with improved accessibility and performance
 * Handles dropdown menu items with keyboard navigation and screen reader support
 */
const ListItem: FC<ListItemProps> = memo(function ListItem({
    setSelected,
    selected,
    element,
    children,
}: ListItemProps) {
    const submenuId = useId();
    const isSelected = selected === element;

    // Memoized keyboard handler for better performance
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case "Enter":
                case " ":
                    e.preventDefault();
                    setSelected(isSelected ? null : element);
                    break;
                case "Escape":
                    setSelected(null);
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    // Focus first item in submenu if open
                    if (isSelected) {
                        const firstMenuItem =
                            e.currentTarget.parentElement?.querySelector(
                                '[role="menuitem"]',
                            ) as HTMLElement;
                        firstMenuItem?.focus();
                    }
                    break;
                default:
                    break;
            }
        },
        [setSelected, isSelected, element],
    );

    // Memoized mouse leave handler with improved dropdown detection
    const handleMouseLeave = useCallback(
        (e: React.MouseEvent) => {
            const dropdown = e.currentTarget.querySelector(".dropdown-content");
            if (dropdown) {
                const dropdownRect = dropdown.getBoundingClientRect();
                if (
                    e.clientY <
                    dropdownRect.top - NAVBAR_CONSTANTS.MOBILE_MENU_TOP_OFFSET
                ) {
                    setSelected(null);
                }
            }
        },
        [setSelected],
    );

    return (
        <div
            className="relative"
            onMouseEnter={() => setSelected(element)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.button
                type="button"
                transition={{ duration: NAVBAR_CONSTANTS.MOBILE_MENU_DURATION }}
                className="cursor-pointer text-gray-800 dark:text-gray-200 font-medium text-base lg:text-xl whitespace-nowrap hover:opacity-[0.9] hover:text-gray-900 dark:hover:text-white py-1 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                aria-haspopup="true"
                aria-expanded={isSelected}
                aria-controls={isSelected ? submenuId : undefined}
                aria-label={`${element} menu`}
                onFocus={() => setSelected(element)}
                onKeyDown={handleKeyDown}
            >
                {element}
            </motion.button>
            {isSelected && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 10 }}
                    transition={springTransition}
                >
                    <div
                        className={`absolute top-[${NAVBAR_CONSTANTS.DROPDOWN_OFFSET}] left-1/2 transform -translate-x-1/2 z-${NAVBAR_CONSTANTS.Z_INDEX.DROPDOWN}`}
                    >
                        <motion.div
                            transition={springTransition}
                            layoutId="selected"
                            className="dropdown-content bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl"
                            style={{
                                maxWidth: NAVBAR_CONSTANTS.DROPDOWN_MAX_WIDTH,
                            }}
                            id={submenuId}
                            role="menu"
                            aria-label={`${element} submenu`}
                            onMouseEnter={() => setSelected(element)}
                            onMouseLeave={() => setSelected(null)}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    setSelected(null);
                                    // Return focus to trigger button
                                    const triggerButton =
                                        e.currentTarget.parentElement?.parentElement?.querySelector(
                                            "button",
                                        ) as HTMLElement;
                                    triggerButton?.focus();
                                }
                            }}
                        >
                            <motion.div
                                layout
                                className="w-max h-full p-4 min-w-48"
                            >
                                {children}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
});

/**
 * Enhanced HoverLink component with improved accessibility and keyboard navigation
 */
export const HoverLink = memo(function HoverLink({
    url,
    children,
    onPress,
}: HoverLinkProps) {
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPress?.();
            }
        },
        [onPress],
    );

    const handleClick = useCallback(
        (_e: React.MouseEvent) => {
            onPress?.();
        },
        [onPress],
    );

    return (
        <a
            href={url}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            role="menuitem"
            tabIndex={0}
            aria-label={`Navigate to ${children}`}
        >
            {children}
        </a>
    );
});

/**
 * Enhanced FeatureItem component with improved accessibility and semantic structure
 */
export const FeatureItem = memo(function FeatureItem({
    heading,
    url,
    info,
    onPress,
}: FeatureItemProps) {
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPress?.();
            }
        },
        [onPress],
    );

    const handleClick = useCallback(
        (_e: React.MouseEvent) => {
            onPress?.();
        },
        [onPress],
    );

    return (
        <a
            href={url}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            role="menuitem"
            tabIndex={0}
            aria-label={`${heading}: ${info}`}
        >
            <h4 className="font-medium text-gray-900 dark:text-white">
                {heading}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {info}
            </p>
        </a>
    );
});

/**
 * Enhanced NavbarFlow component with improved performance, accessibility, and error handling
 * Provides responsive navigation with smooth animations and keyboard support
 */
const NavbarFlow: FC<NavbarFlowProps> = ({
    emblem,
    links = [],
    extraIcons = [],
    styleName,
    rightComponent,
    linksHeadStartMs = 0,
}) => {
    // State management with better organization
    const [sequenceDone, setSequenceDone] = useState(false);
    const [linksReady, setLinksReady] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
    const [openedSections, setOpenedSections] = useState<
        Record<string, boolean>
    >({});
    const [isMounted, setIsMounted] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Animation controls
    const navMotion = useAnimation();
    const emblemMotion = useAnimation();
    const switchMotion = useAnimation();
    const svgMotion = useAnimation();
    // Hooks
    const contactModal = useContactModal();
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const mobileMenuId = useId();

    // Memoized animation durations based on reduced motion preference
    const animationDurations = useMemo(
        () => ({
            quick: prefersReducedMotion ? 0 : NAVBAR_CONSTANTS.QUICK_DURATION,
            navDur: prefersReducedMotion ? 0 : NAVBAR_CONSTANTS.NAV_DURATION,
            svgDur: prefersReducedMotion ? 0 : NAVBAR_CONSTANTS.SVG_DURATION,
            navDelay: prefersReducedMotion ? 0 : NAVBAR_CONSTANTS.NAV_DELAY,
        }),
        [prefersReducedMotion],
    );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Enhanced mobile view detection with error handling
    useEffect(() => {
        try {
            const mql = window.matchMedia(
                `(max-width: ${NAVBAR_CONSTANTS.MOBILE_BREAKPOINT}px)`,
            );
            const update = (e?: MediaQueryListEvent) => {
                try {
                    setMobileView(e ? e.matches : mql.matches);
                } catch (error) {
                    console.error("Error updating mobile view:", error);
                    setHasError(true);
                }
            };

            update();

            if (typeof mql.addEventListener === "function") {
                mql.addEventListener("change", update);
                return () => mql.removeEventListener("change", update);
            } else if ("onchange" in mql) {
                // Fallback for older browsers without addEventListener
                mql.onchange = update as any;
                return () => {
                    mql.onchange = null;
                };
            } else {
                // Last-resort fallback: listen to window resize
                const onResize = () => update();
                window.addEventListener("resize", onResize);
                return () => window.removeEventListener("resize", onResize);
            }
        } catch (error) {
            console.error("Error setting up mobile view detection:", error);
            setHasError(true);
        }
    }, []);

    // Enhanced animation sequence with error handling and memoized durations
    useEffect(() => {
        if (!isMounted || sequenceDone) return;

        let linksTimer: number | undefined;

        const runSequence = async () => {
            try {
                const { quick, navDur, svgDur, navDelay } = animationDurations;
                // Schedule links head start relative to navDelay
                const headStartMs = Math.max(
                    0,
                    Math.min(linksHeadStartMs, navDelay * 1000),
                );
                const fireInMs = Math.max(0, navDelay * 1000 - headStartMs);
                linksTimer = window.setTimeout(
                    () => setLinksReady(true),
                    fireInMs,
                );

                if (mobileView) {
                    await Promise.all([
                        // emblemMotion.start({
                        //     opacity: 1,
                        //     x: 0,
                        //     transition: {
                        //         duration: quick,
                        //         ease: "easeOut",
                        //         delay: 0.5,
                        //     },
                        // }),
                        navMotion.start({
                            opacity: 1,
                            transition: { duration: quick, ease: "easeOut" },
                        }),
                        switchMotion.start({
                            opacity: 1,
                            x: 0,
                            transition: { duration: quick, ease: "easeOut" },
                        }),
                    ]);
                } else {
                    await navMotion.start({
                        clipPath: "inset(0 0% 0 0)",
                        opacity: 1,
                        transition: {
                            duration: navDur,
                            ease: "easeOut",
                            delay: navDelay,
                        },
                    });

                    await svgMotion.start({
                        opacity: 1,
                        transition: { duration: svgDur },
                    });

                    await Promise.all([
                        emblemMotion.start({
                            opacity: 1,
                            x: 0,
                            transition: { duration: quick, ease: "easeOut" },
                        }),
                        switchMotion.start({
                            opacity: 1,
                            x: 0,
                            transition: { duration: quick, ease: "easeOut" },
                        }),
                    ]);
                }

                setSequenceDone(true);
            } catch (error) {
                console.error("Error running animation sequence:", error);
                setHasError(true);
                setSequenceDone(true); // Prevent infinite retry
            }
        };

        runSequence();
        return () => {
            if (linksTimer) {
                clearTimeout(linksTimer);
            }
        };
    }, [
        navMotion,
        emblemMotion,
        switchMotion,
        svgMotion,
        mobileView,
        isMounted,
        sequenceDone,
        animationDurations,
        linksHeadStartMs,
    ]);

    // Enhanced callback functions with better error handling and accessibility
    const toggleMobileMenu = useCallback(() => {
        try {
            setMobileMenuVisible((v) => !v);
            // Clear any open submenus when toggling mobile menu
            if (mobileMenuVisible) {
                setSelectedSubmenu(null);
                setOpenedSections({});
            }
        } catch (error) {
            console.error("Error toggling mobile menu:", error);
            setHasError(true);
        }
    }, [mobileMenuVisible]);

    const toggleSection = useCallback((text: string) => {
        try {
            setOpenedSections((prev) => ({
                ...prev,
                [text]: !prev[text],
            }));
        } catch (error) {
            console.error("Error toggling section:", error);
            setHasError(true);
        }
    }, []);

    const hideMobileMenu = useCallback(() => {
        try {
            setMobileMenuVisible(false);
            setSelectedSubmenu(null);
            setOpenedSections({});
        } catch (error) {
            console.error("Error hiding mobile menu:", error);
            setHasError(true);
        }
    }, []);

    const clearSelectedSubmenu = useCallback(() => {
        try {
            setSelectedSubmenu(null);
        } catch (error) {
            console.error("Error clearing selected submenu:", error);
            setHasError(true);
        }
    }, []);

    // Enhanced submenu rendering with better error handling
    const renderSubmenuItems = useCallback(
        (submenu: React.ReactNode) => {
            try {
                if (!isValidElement(submenu)) return null;

                const submenuProps = submenu.props as {
                    children?: React.ReactNode;
                };
                if (!submenuProps.children) return null;

                return Children.map(
                    submenuProps.children,
                    (child, childIdx) => (
                        <div key={childIdx} onClick={hideMobileMenu}>
                            {child}
                        </div>
                    ),
                );
            } catch (error) {
                console.error("Error rendering submenu items:", error);
                setHasError(true);
                return null;
            }
        },
        [hideMobileMenu],
    );

    // Enhanced keyboard event handling with better accessibility
    useEffect(() => {
        if (!mobileMenuVisible) return;

        const onKeyDown = (e: KeyboardEvent) => {
            try {
                switch (e.key) {
                    case "Escape":
                        setMobileMenuVisible(false);
                        setSelectedSubmenu(null);
                        setOpenedSections({});
                        // Return focus to menu toggle button
                        const menuButton = document.querySelector(
                            '[aria-controls="' + mobileMenuId + '"]',
                        ) as HTMLElement;
                        menuButton?.focus();
                        break;
                    case "Tab":
                        // Allow natural tab navigation within mobile menu
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error("Error handling keyboard event:", error);
                setHasError(true);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [mobileMenuVisible, mobileMenuId]);

    // Error boundary effect
    useEffect(() => {
        if (hasError) {
            console.warn(
                "NavbarFlow encountered an error, some functionality may be limited",
            );
        }
    }, [hasError]);

    // Render error fallback if error occurred
    if (hasError) {
        return (
            <div
                className={`sticky top-0 z-${NAVBAR_CONSTANTS.Z_INDEX.NAVBAR} w-full ${styleName}`}
            >
                <div className="flex items-center justify-center h-12 md:h-16 bg-background">
                    <span className="text-sm text-red-600">
                        Navigation temporarily unavailable
                    </span>
                </div>
            </div>
        );
    }

    const borderColor = cn("border-[#f0992e78] dark:border-[#0c8a9678]");
    return (
        <div
            className={`fixed top-0 z-${NAVBAR_CONSTANTS.Z_INDEX.NAVBAR} w-full ${styleName}`}
        >
            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                        prefersReducedMotion
                            ? { duration: 0 }
                            : { ease: "easeOut", duration: 0.5, delay: 0.5 }
                    }
                    className={cn(
                        "relative bg-background",
                        "mx-auto flex items-center justify-between",
                        "rounded-b-lg w-[95vw]",
                        "mx-auto",
                        // "left-1/2 -translate-x-1/2",
                        // "-top-1/4",
                        "px-2 will-change-opacity",
                        NAVBAR_CONSTANTS.NAVBAR_HEIGHT.DESKTOP,
                        // borderColor,
                        // "border-x",
                        // sequenceDone && "border-b",
                        "shadow-lg",
                    )}
                >
                    {/* Logo/Emblem */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        className={cn(
                            `z-${NAVBAR_CONSTANTS.Z_INDEX.CONTENT}`,
                            "rounded-sm",
                            `border-b-[2px] border-x ${borderColor}`,
                            "icon-shadow-sm",
                        )}
                        animate={emblemMotion}
                        role="banner"
                        aria-label="Site logo"
                    >
                        {emblem}
                    </motion.div>

                    {/* Primary Navigation */}
                    <motion.nav
                        initial={{
                            clipPath: "inset(0 50% 0 50%)",
                            opacity: 0,
                        }}
                        animate={navMotion}
                        className={cn(
                            "relative py-[14px]",
                            // "translate-y-1/2",
                            " bg-background ",
                            // " bg-[radial-gradient(_var(--background),_0%,_var(--background)_50%,_var(--background)_60%,_#74747400_90%)] ",
                            "rounded-[8px] flex items-center justify-center",
                            "gap-9 flex-shrink-0 overflow-hidden",
                            "border border-b-0",
                            borderColor,
                            `z-${NAVBAR_CONSTANTS.Z_INDEX.CONTENT}`,
                            // "-mt-2",
                            "px-2",
                        )}
                        role="navigation"
                        aria-label="Primary navigation"
                        onMouseLeave={clearSelectedSubmenu}
                    >
                        {links.map((link) => (
                            <div
                                key={link.text}
                                className={`z-${NAVBAR_CONSTANTS.Z_INDEX.CONTENT}`}
                            >
                                {link.submenu ? (
                                    <ListItem
                                        setSelected={setSelectedSubmenu}
                                        selected={selectedSubmenu}
                                        element={link.text}
                                    >
                                        {link.submenu}
                                    </ListItem>
                                ) : (
                                    <motion.div
                                        initial={{ y: -1000 }}
                                        className="transition-all duration-500 ease-out"
                                        animate={{
                                            y: linksReady ? 0 : -1000,
                                        }}
                                        transition={{
                                            duration: prefersReducedMotion
                                                ? 0
                                                : NAVBAR_CONSTANTS.QUICK_DURATION,
                                            ease: "easeOut",
                                            delay: linksReady
                                                ? links.indexOf(link) *
                                                  NAVBAR_CONSTANTS.LINK_STAGGER_DELAY
                                                : 0,
                                        }}
                                    >
                                        <a
                                            href={
                                                link.isModal && pathname !== "/"
                                                    ? "#"
                                                    : link.url || "#"
                                            }
                                            onClick={(e) => {
                                                if (
                                                    link.isModal &&
                                                    pathname !== "/"
                                                ) {
                                                    e.preventDefault();
                                                    contactModal.onOpen();
                                                }
                                            }}
                                            className={cn(
                                                "text-special-card-fg font-medium text-base text-xl",
                                                "dark:hover:text-primary hover:underline underline-offset-4",
                                                "hover:text-accent",
                                                "focus:ring-1 focus:ring-offset-0",
                                                "focus:ring-amber-500 dark:focus:ring-primary",
                                                "rounded-md px-1",
                                                "cursor-pointer",
                                            )}
                                            aria-label={`Navigate to ${link.text}`}
                                        >
                                            {link.text}
                                        </a>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </motion.nav>

                    {/* Right Component Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={switchMotion}
                        className={cn(
                            "rounded-[8px] flex-shrink-0 flex items-center",
                            ` z-${NAVBAR_CONSTANTS.Z_INDEX.CONTENT}`,
                        )}
                        role="complementary"
                        aria-label="Additional navigation tools"
                    >
                        {extraIcons.map((icon, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-center"
                                role="presentation"
                            >
                                {icon}
                            </div>
                        ))}

                        {rightComponent && (
                            <div className={cn("right-0 rounded-md", "")}>
                                {rightComponent}
                            </div>
                        )}
                    </motion.div>

                    <motion.svg
                        initial={{ opacity: 0 }}
                        animate={svgMotion}
                        className={cn(
                            "absolute inset-0 w-[98vw] h-full z-0",
                            "pointer-events-none -mt-7 translate-y-1/2 left-1/2 -translate-x-1/2",
                            // "bg-white",
                        )}
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 1400 96"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <filter id="connectionBlur">
                                <feGaussianBlur
                                    in="SourceGraphic"
                                    stdDeviation="3"
                                />
                            </filter>
                            <linearGradient
                                id="blueGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                                // transform="translate(-100,0)"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#3b82f6"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#3b82f6"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#3b82f6"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="cyanGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                                // transform="translate(-1500,0)"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#06b6d4"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#06b6d4"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#06b6d4"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="purpleGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                                // transform="translate(-100,0)"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#8b5cf6"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#8b5cf6"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#8b5cf6"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="orangeGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#f59e0b"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#f59e0b"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#f59e0b"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="redGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                                // transform="translate(100,0)"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#ef4444"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#ef4444"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#ef4444"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="greenGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#10b981"
                                    stopOpacity="0"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#10b981"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#10b981"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                        </defs>

                        <motion.path
                            d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                            stroke="url(#blueGradient)"
                            strokeWidth="3"
                            fill="none"
                            transform="translate(-100,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                delay: 1.5,
                            }}
                        />
                        <motion.path
                            d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                            stroke="url(#blueGradient)"
                            strokeWidth="3"
                            fill="none"
                            transform="scale(-1,1) translate(-1500,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                delay: 1.5,
                            }}
                        />
                        <motion.path
                            d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                            stroke="url(#cyanGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="translate(-100,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 1.7,
                            }}
                        />
                        <motion.path
                            d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                            stroke="url(#cyanGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="scale(-1,1) translate(-1500,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 1.7,
                            }}
                        />
                        <motion.path
                            d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                            stroke="url(#purpleGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="translate(-100,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                                delay: 1.9,
                            }}
                        />
                        <motion.path
                            d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                            stroke="url(#purpleGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="scale(-1,1) translate(-1500,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                                delay: 1.9,
                            }}
                        />
                        <motion.path
                            d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                            stroke="url(#orangeGradient)"
                            strokeWidth="3"
                            fill="none"
                            transform="translate(-100,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                delay: 2.1,
                            }}
                        />
                        <motion.path
                            d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                            stroke="url(#orangeGradient)"
                            strokeWidth="3"
                            fill="none"
                            transform="scale(-1,1) translate(-1500,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                delay: 2.1,
                            }}
                        />
                        <motion.path
                            d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                            stroke="url(#redGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="translate(-100,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 2.3,
                            }}
                        />
                        <motion.path
                            d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                            stroke="url(#redGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="scale(-1,1) translate(-1500,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 2.3,
                            }}
                        />
                        <motion.path
                            d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                            stroke="url(#greenGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="translate(-100,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                                delay: 2.5,
                            }}
                        />
                        <motion.path
                            d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                            stroke="url(#greenGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            transform="scale(-1,1) translate(-1500,0)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                                delay: 2.5,
                            }}
                        />

                        <g filter="url(#connectionBlur)" opacity="0.3">
                            <path
                                d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                fill="none"
                                transform="translate(-70)"
                            />
                            <path
                                d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                                stroke="#06b6d4"
                                strokeWidth="4"
                                fill="none"
                                transform="translate(-70)"
                            />
                            <path
                                d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                                stroke="#8b5cf6"
                                strokeWidth="4"
                                fill="none"
                                transform="translate(-70)"
                            />
                            <path
                                d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                                stroke="#f59e0b"
                                strokeWidth="4"
                                fill="none"
                                transform="translate(70)"
                            />
                            <path
                                d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                                stroke="#ef4444"
                                strokeWidth="4"
                                fill="none"
                                transform="translate(80)"
                            />
                            <path
                                d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                                stroke="#10b981"
                                strokeWidth="4"
                                fill="none"
                                transform="translate(70)"
                            />
                        </g>
                    </motion.svg>
                </motion.div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "flex inline-flex justify-between items-center",
                    "w-full md:hidden rounded-b-sm",
                    "h-12",
                    "px-3",
                    // "bg-red-400",
                    `z-${NAVBAR_CONSTANTS.Z_INDEX.NAVBAR}`,
                )}
            >
                {/* Mobile Logo/Emblem */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                        sequenceDone
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                    }
                    className={cn(
                        `border-b-[2px] border-x ${borderColor} rounded-sm`,
                        "will-change-[transform,opacity]",
                        "transition-auto",
                        "icon-shadow-sm",
                        "w-fit",
                        "mt-6",
                        // "dark:bg-blue-400",
                        " brightness-[1.03] saturate-[1.1]",
                        prefersReducedMotion
                            ? "duration-200 ease-out"
                            : "duration-500 ease-out",
                    )}
                    role="banner"
                    aria-label="Site logo"
                >
                    {emblem}
                </motion.div>

                {/* Mobile Right Section */}
                <div
                    className={cn(
                        "w-fit h-fit",
                        "mt-2",
                        "flex flex-row items-center justify-evenly",
                        "pr-2 space-x-2",
                        "bg-white/50 dark:bg-gray-400/20",
                        // "dark:bg-green-400",
                        "rounded-md backdrop-blur-lg",
                        `border ${borderColor}`,
                        sequenceDone ? "opacity-100" : "opacity-0",
                        "will-change-[transform,opacity]",
                        "transition-auto",
                        prefersReducedMotion
                            ? "duration-200 ease-out"
                            : "duration-500 ease-out",
                    )}
                >
                    {/* Mobile Right Icons */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={
                            sequenceDone
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: 20 }
                        }
                        className={cn(
                            "will-change-[transform,opacity]",
                            "transition-auto",
                            prefersReducedMotion
                                ? "duration-200 ease-out"
                                : "duration-500 ease-out",
                        )}
                        role="complementary"
                        aria-label="Additional navigation tools"
                    >
                        {extraIcons.map((icon, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-center"
                                role="presentation"
                            >
                                {icon}
                            </div>
                        ))}

                        {rightComponent}
                    </motion.div>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        className={cn(
                            " text-gray-700 dark:text-gray-200",
                            " hover:text-gray-900 dark:hover:text-white",
                            "transition-colors",
                            "focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-0 rounded-md",
                            "scale-[1.1]",
                        )}
                        aria-expanded={mobileMenuVisible}
                        aria-controls={mobileMenuId}
                        aria-label={
                            mobileMenuVisible
                                ? ACCESSIBILITY_LABELS.CLOSE_MENU
                                : ACCESSIBILITY_LABELS.MOBILE_MENU_TOGGLE
                        }
                    >
                        {mobileMenuVisible ? (
                            <Close
                                className="h-7 w-7 icon-shadow-md"
                                aria-hidden="true"
                            />
                        ) : (
                            <List
                                className="h-7 w-7 icon-shadow-md"
                                aria-hidden="true"
                            />
                        )}
                        <span className="sr-only">
                            {mobileMenuVisible
                                ? ACCESSIBILITY_LABELS.CLOSE_MENU
                                : ACCESSIBILITY_LABELS.MOBILE_MENU_TOGGLE}
                        </span>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <motion.div
                    initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                    animate={{
                        opacity: mobileMenuVisible ? 1 : 0,
                        clipPath: mobileMenuVisible
                            ? "inset(0 0 0% 0)"
                            : "inset(0 0 100% 0)",
                    }}
                    transition={{
                        duration: prefersReducedMotion
                            ? 0
                            : NAVBAR_CONSTANTS.MOBILE_MENU_DURATION,
                        ease: "easeOut",
                    }}
                    id={mobileMenuId}
                    aria-hidden={!mobileMenuVisible}
                    role="region"
                    aria-label="Mobile navigation menu"
                    className={cn(
                        "absolute left-1/2 right-0 top-full mr-3",
                        `z-${NAVBAR_CONSTANTS.Z_INDEX.MOBILE_MENU}`,
                        "overflow-y-auto",
                        "bg-slate-50 dark:bg-slate-800/70",
                        "backdrop-blur-xl",
                        "rounded-lg",
                        "text-center",
                        `border-[1px] ${borderColor} border-t-0 border-b-[2px]`,
                    )}
                    style={{ willChange: "clip-path, opacity" }}
                >
                    <div className="container py-4 px-4">
                        <nav
                            className="flex flex-col space-y-3"
                            aria-label="Primary mobile navigation"
                        >
                            {links.map((element, idx) => (
                                <div key={element.text} className="space-y-2">
                                    {element.submenu ? (
                                        <>
                                            <button
                                                type="button"
                                                className={cn(
                                                    "flex items-center justify-between w-full",
                                                    "text-gray-800 dark:text-gray-200 font-medium",
                                                    "text-base py-2 px-4 rounded-lg",
                                                    "hover:bg-gray-200/50 dark:hover:bg-gray-800/50",
                                                    "transition-colors duration-300 ease-out border-b",
                                                    "border-gray-200 dark:border-gray-800",
                                                    "focus:outline-none focus:ring-1 focus:ring-primary",
                                                    "focus:ring-offset-0",
                                                )}
                                                onClick={() =>
                                                    toggleSection(element.text)
                                                }
                                                aria-expanded={
                                                    !!openedSections[
                                                        element.text
                                                    ]
                                                }
                                                aria-controls={`${mobileMenuId}-section-${idx}`}
                                                aria-label={`Toggle ${element.text} submenu`}
                                            >
                                                <span>{element.text}</span>
                                                <span aria-hidden="true">
                                                    {openedSections[
                                                        element.text
                                                    ] ? (
                                                        <ArrowUp className="h-4 w-4" />
                                                    ) : (
                                                        <ArrowDown className="h-4 w-4" />
                                                    )}
                                                </span>
                                            </button>

                                            {openedSections[element.text] && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        clipPath:
                                                            "inset(0 0 100% 0)",
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        clipPath:
                                                            "inset(0 0 0% 0)",
                                                    }}
                                                    transition={{
                                                        duration:
                                                            prefersReducedMotion
                                                                ? 0
                                                                : NAVBAR_CONSTANTS.SUBMENU_DURATION,
                                                        ease: "easeOut",
                                                    }}
                                                    id={`${mobileMenuId}-section-${idx}`}
                                                    role="region"
                                                    aria-label={`${element.text} submenu`}
                                                    className="pl-4 space-y-1 overflow-hidden text-shadow-lg"
                                                    style={{
                                                        willChange:
                                                            "clip-path, opacity",
                                                    }}
                                                >
                                                    {renderSubmenuItems(
                                                        element.submenu,
                                                    )}
                                                </motion.div>
                                            )}
                                        </>
                                    ) : (
                                        <a
                                            href={
                                                element.isModal &&
                                                pathname !== "/"
                                                    ? "#"
                                                    : element.url || "#"
                                            }
                                            onClick={(e) => {
                                                if (
                                                    element.isModal &&
                                                    pathname !== "/"
                                                ) {
                                                    e.preventDefault();
                                                    contactModal.onOpen();
                                                }
                                            }}
                                            className={cn(
                                                "text-gray-800 dark:text-gray-200 font-medium",
                                                "text-base py-2 px-4 rounded-lg",
                                                "hover:bg-gray-200/50 dark:hover:bg-gray-800/50",
                                                "transition-colors duration-300 ease-out",
                                                "border-b border-gray-200 dark:border-gray-500 block",
                                                "focus:outline-none focus:ring-1 focus:ring-primary",
                                                "focus:ring-offset-0",
                                                "text-shadow-md",
                                            )}
                                            aria-label={`Navigate to ${element.text}`}
                                        >
                                            {element.text}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NavbarFlow;
