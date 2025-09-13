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
import useIsMobile from "@/hooks/use-mobile";
import { Button } from "./button";
import NavBarSvg from "@/components/svg/NavBarSvg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDropdownState } from "@/hooks/use-dropdown-state";

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
    bouncyText?: boolean;
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
    NAV_DURATION: 0.1,
    SVG_DURATION: 0.1,
    NAV_DELAY: 0.1,
    MOBILE_MENU_DURATION: 0.3,
    SUBMENU_DURATION: 0.2,

    // Stagger delays
    LINK_STAGGER_DELAY: 0.07,

    // Z-index values
    Z_INDEX: {
        NAVBAR: 50,
        DROPDOWN: 50,
        MOBILE_MENU: 50,
        BACKDROP: 10,
        CONTENT: 50,
    },

    // Dimensions
    NAVBAR_HEIGHT: {
        MOBILE: "h-12",
        DESKTOP: "h-[60px]",
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
 * Hook to determine if the navbar should have a background based on scroll position.
 * Returns a boolean: true if scrolled past trigger, false otherwise.
 */
export function useScrollNavbarBg(trigger: number = 24) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > trigger);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Set initial state
        setScrolled(window.scrollY > trigger);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [trigger]);

    return scrolled;
}

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
    bouncyText = true,
}) => {
    // State management with better organization
    const [sequenceDone, setSequenceDone] = useState(false);
    const [linksReady, setLinksReady] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
    const [openedSections, setOpenedSections] = useState<
        Record<string, boolean>
    >({});
    const [isMounted, setIsMounted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const isMobile = useIsMobile();
    const scrolled = useScrollNavbarBg();

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

    const { isOpen, setIsOpen, toggle, open, close } = useDropdownState();

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

    // Enhanced animation sequence with error handling and memoized durations
    useEffect(() => {
        if (!isMounted || sequenceDone || prefersReducedMotion) return;

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

                if (isMobile) {
                    await navMotion.start({
                        opacity: 1,
                        y: 0,
                        transition: { duration: quick, ease: "easeOut" },
                    });
                    await svgMotion.start({
                        opacity: 1,
                        transition: { duration: svgDur },
                    });
                    await Promise.all([
                        emblemMotion.start({
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 10,
                                mass: 0.7,
                                // delay: navDelay,
                            },
                        }),
                        switchMotion.start({
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 10,
                                mass: 0.5,
                                // delay: navDelay,
                            },
                        }),
                    ]);
                } else {
                    await navMotion.start({
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.5,
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
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 10,
                                mass: 0.7,
                            },
                        }),
                        switchMotion.start({
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 10,
                                mass: 0.5,
                            },
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
        isMobile,
        isMounted,
        sequenceDone,
        animationDurations,
        linksHeadStartMs,
        prefersReducedMotion,
    ]);

    // Enhanced callback functions with better error handling and accessibility
    const toggleMobileMenu = useCallback(() => {
        try {
            setIsOpen((v) => !v);
            // Clear any open submenus when toggling mobile menu
            if (isOpen) {
                setSelectedSubmenu(null);
                setOpenedSections({});
            }
        } catch (error) {
            console.error("Error toggling mobile menu:", error);
            setHasError(true);
        }
    }, [isOpen, setIsOpen]);

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
            setIsOpen(false);
            setSelectedSubmenu(null);
            setOpenedSections({});
        } catch (error) {
            console.error("Error hiding mobile menu:", error);
            setHasError(true);
        }
    }, [setIsOpen]);

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

    const borderColor = cn("border-[#ffb964e3] dark:border-[#0c8a962a]");

    return (
        <div
            className={cn(
                "fixed top-0",
                `z-${NAVBAR_CONSTANTS.Z_INDEX.NAVBAR}`,
                "w-full",
                styleName,
            )}
        >
            {/* Desktop Navigation */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={navMotion}
                className={cn(
                    "hidden",
                    "bg-background",
                    "md:flex md:items-center md:justify-between",
                    "relative",
                    "rounded-b-lg w-[95vw]",
                    "mx-auto",
                    "px-2 will-change-opacity",
                    NAVBAR_CONSTANTS.NAVBAR_HEIGHT.DESKTOP,
                    "z-50",
                    "shadow-lg dark:shadow-xl",
                    "py-8",
                    "backdrop-blur-md",
                    // scrolled && "bg-bg-scrolled",
                )}
            >
                {/* Logo/Emblem */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    className={cn(
                        `z-${NAVBAR_CONSTANTS.Z_INDEX.CONTENT}`,
                        "rounded-sm",
                        "border border-sm",
                        borderColor,
                        "neumorphic-logo",
                    )}
                    animate={emblemMotion}
                    role="banner"
                    aria-label="Site logo"
                >
                    {emblem}
                </motion.div>

                {/* Primary Navigation */}
                <nav
                    className={cn(
                        "relative",
                        "px-7 pt-5 pb-3",
                        "flex items-center justify-center",
                        "gap-9 flex-shrink-0",
                        `z-${NAVBAR_CONSTANTS.Z_INDEX.CONTENT}`,
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
                                    animate={{
                                        y: linksReady ? 0 : -200,
                                    }}
                                    className={cn(
                                        "transition-all",
                                        "rounded-sm",
                                        "p-1",
                                        "border",
                                        borderColor,
                                        "neumorphic-button",
                                        "z-50",
                                        "hover:border-transparent",
                                        prefersReducedMotion
                                            ? cn("transition-none duration-0")
                                            : cn(
                                                  "will-change-transform ease-out",
                                                  !bouncyText && "duration-500",
                                              ),
                                    )}
                                    transition={{
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
                                            "text-special-card-fg font-semibold font-serif text-lg",
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
                </nav>

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
                        <div className={cn("rounded-md")}>{rightComponent}</div>
                    )}
                </motion.div>

                <NavBarSvg
                    position="absolute inset-0"
                    className={cn("w-[82vw] h-full", "translate-x-[110px]")}
                    defsId={"desktop"}
                    svgMotion={svgMotion}
                    linksReady={linksReady}
                    isScrolled={scrolled}
                />
            </motion.div>

            {/* Mobile Navigation */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={navMotion}
                className={cn(
                    "md:hidden",
                    "relative",
                    "bg-background",
                    "flex flex-row justify-between items-center",
                    "w-[95vw] h-16",
                    "mx-auto",
                    "rounded-b-sm",
                    "px-1",
                    "backdrop-blur-md",
                    "shadow-lg dark:shadow-xl",
                    `z-${NAVBAR_CONSTANTS.Z_INDEX.CONTENT}`,
                    "will-change-[opacity,transform]",
                    scrolled && "bg-bg-scrolled",
                )}
            >
                {/* Mobile Logo/Emblem */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={emblemMotion}
                    className={cn(
                        "border-b-[2px] border-x",
                        borderColor,
                        "rounded-sm",
                        // "icon-shadow-sm",
                        "w-fit",
                        "p-[1px]",
                        // "neumorphic-logo",
                    )}
                    role="banner"
                    aria-label="Site logo"
                >
                    {emblem}
                </motion.div>

                {/* Mobile SVG */}
                <NavBarSvg
                    position="relative"
                    className="size-full px-1"
                    defsId={"mobile"}
                    svgMotion={svgMotion}
                    linksReady={linksReady}
                    isScrolled={scrolled}
                />

                {/* Mobile Right Section */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={switchMotion}
                    className={cn(
                        "relative",
                        "w-fit h-[84%]",
                        "flex flex-row items-center justify-evenly",
                        "py-2 p-2 space-x-3",
                        // "bg-white/50 dark:bg-gray-400/20",
                        "bg-background",
                        "rounded-md",
                        "backdrop-blur-lg",
                        "border",
                        sequenceDone && borderColor,
                        // "neumorphic-cta-card",
                        "my-auto",
                        "will-change-auto",
                    )}
                    role="complementary"
                    aria-label="Theme switcher and mobile menu toggle"
                >
                    {/* Mobile Right Icons */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={linksReady && { opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            mass: 0.5,
                            delay: 0.1,
                        }}
                        role="complementary"
                        aria-label="Theme switcher and additional navigation tools"
                        className={cn(
                            "relative",
                            "flex items-center justify-center",
                            "aspect-square",
                            // "bg-red-700",
                        )}
                    >
                        {extraIcons &&
                            extraIcons.map((icon, idx) => (
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

                    {/* Dropdown Menu */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={linksReady && { opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            mass: 0.5,
                            delay: 0.2,
                        }}
                        className={cn(
                            "relative",
                            "flex items-center justify-center",
                        )}
                    >
                        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className={cn(
                                        "aspect-square rounded-sm",
                                        " text-gray-700 dark:text-gray-200",
                                        " hover:text-gray-900 dark:hover:text-white",
                                        "transition-colors",
                                        "focus:outline-none focus:ring-1",
                                        "focus:ring-primary focus:ring-offset-0",
                                        "neumorphic-button",
                                    )}
                                    role="button"
                                    onClick={toggleMobileMenu}
                                    tabIndex={0}
                                    aria-haspopup="true"
                                    aria-expanded={mobileMenuVisible}
                                    aria-controls={mobileMenuId}
                                    aria-label={
                                        mobileMenuVisible
                                            ? ACCESSIBILITY_LABELS.CLOSE_MENU
                                            : ACCESSIBILITY_LABELS.MOBILE_MENU_TOGGLE
                                    }
                                >
                                    {isOpen ? (
                                        <Close
                                            className="scale-[1.7]"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <List
                                            className="scale-[1.7]"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className="sr-only">
                                        {mobileMenuVisible
                                            ? ACCESSIBILITY_LABELS.CLOSE_MENU
                                            : ACCESSIBILITY_LABELS.MOBILE_MENU_TOGGLE}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="center"
                                datatype="mobile-menus"
                                style={{
                                    // Force GPU acceleration
                                    willChange: "transform, opacity",
                                    transform: "translateZ(0)",
                                    // Reduce repaints
                                    contain: "layout style paint",
                                    // Optimize rendering
                                    backfaceVisibility: "hidden",
                                }}
                                avoidCollisions={true}
                                collisionPadding={8}
                                className={cn(
                                    "mr-3 mt-1",
                                    "px-3 space-y-1 pb-4",
                                    "grid grid-flow-row",
                                    "items-center justify-center",
                                    "min-w-fit",
                                    "font-serif tracking-widest text-center",
                                    "bg-slate-300/60 dark:bg-slate-800/60",
                                    "backdrop-blur-lg",
                                )}
                                role="navigation"
                                aria-label="Primary mobile navigation"
                            >
                                {links.map((element, idx) => (
                                    <DropdownMenuItem
                                        key={element.text}
                                        className={cn(
                                            "flex flex-col items-center justify-center",
                                        )}
                                    >
                                        {element.submenu ? (
                                            <>
                                                <Button
                                                    className={cn(
                                                        "flex items-center justify-between w-full",
                                                        "text-gray-800 dark:text-gray-200 font-medium",
                                                        "text-base py-2 px-4 rounded-lg",
                                                        "hover:bg-gray-200/50 dark:hover:bg-gray-800/50",
                                                        "transition-colors duration-300 ease-out border-b",
                                                        "border-gray-200 dark:border-gray-800",
                                                        "focus:outline-none focus:ring-0 focus:ring-primary",
                                                        "focus:ring-offset-0",
                                                    )}
                                                    onClick={() =>
                                                        toggleSection(
                                                            element.text,
                                                        )
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
                                                </Button>

                                                {openedSections[
                                                    element.text
                                                ] && (
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
                                                        className={cn(
                                                            "pl-4 space-y-1 overflow-hidden",
                                                            "will-change-[clip-path,opacity]",
                                                        )}
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
                                                    "text-lg text-black/70 dark:text-gray-200",
                                                    "rounded-lg px-3 py-2",
                                                    "hover:bg-gray-200/50 dark:hover:bg-gray-800/50",
                                                    "transition-colors duration-300 ease-out",
                                                    "border-b border-gray-100 dark:border-gray-500 block",
                                                    "focus:outline-none focus:ring-1 focus:ring-primary",
                                                    "focus:ring-offset-0",
                                                )}
                                                aria-label={`Navigate to ${element.text}`}
                                            >
                                                {element.text}
                                            </a>
                                        )}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NavbarFlow;
