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
import {
    motion,
    useAnimation,
    useReducedMotion,
    AnimatePresence,
} from "framer-motion";
import { ChevronDown, ChevronUp as ArrowUp } from "lucide-react";
import { ACCESSIBILITY_LABELS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/hooks/use-contact-modal";
import { usePathname } from "next/navigation";
import useIsMobile from "@/hooks/use-mobile";
import { Button } from "./button";
import NavBarSvg from "@/components/svg/NavBarSvg";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { AnimatedIcon } from "@/components/ui/animated-presence-icon";

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
interface FeatureItemProps {
    heading: string;
    url: string;
    info: string;
    onPress?: () => void;
}

// Animation and transition constants
const NAVBAR_CONSTANTS = {
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
const ListItem = memo(
    ({ setSelected, selected, element, children }: ListItemProps) => {
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
                    case "ChevronDown":
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
                const dropdown =
                    e.currentTarget.querySelector(".dropdown-content");
                if (dropdown) {
                    const dropdownRect = dropdown.getBoundingClientRect();
                    if (
                        e.clientY <
                        dropdownRect.top -
                            NAVBAR_CONSTANTS.MOBILE_MENU_TOP_OFFSET
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
                    transition={{
                        duration: NAVBAR_CONSTANTS.MOBILE_MENU_DURATION,
                    }}
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
                                    maxWidth:
                                        NAVBAR_CONSTANTS.DROPDOWN_MAX_WIDTH,
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
    },
);
ListItem.displayName = "ListItem";

/**
 * Enhanced FeatureItem component with improved accessibility and semantic structure
 */
export const FeatureItem = memo(
    ({ heading, url, info, onPress }: FeatureItemProps) => {
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
    },
);
FeatureItem.displayName = "FeatureItem";

/**
 * Hook to determine if the navbar should have a background based on scroll position.
 * Returns a boolean: true if scrolled past trigger, false otherwise.
 */
const useScrollNavbarBg = (trigger: number = 24): boolean => {
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
};

interface HoverLinkProps {
    link: NavLink;
    className?: string;
}

const HoverLink = memo(({ link, className }: HoverLinkProps) => {
    const contactModal = useContactModal();
    const pathname = usePathname();

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            if (link.isModal && pathname !== "/") {
                e.preventDefault();
                contactModal.onOpen();
            }
        },
        [link, pathname, contactModal],
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (link.isModal && pathname !== "/") {
                    contactModal.onOpen();
                }
            }
        },
        [link, pathname, contactModal],
    );
    return (
        <a
            href={link.isModal && pathname !== "/" ? "#" : link.url || "#"}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={cn(
                "text-special-card-fg font-serif",
                "hover:underline underline-offset-4",
                "hover:text-accent dark:hover:text-primary",
                "focus:ring-1 focus:ring-offset-0",
                "focus:ring-amber-500 dark:focus:ring-primary",
                "cursor-pointer rounded-md",
                "transition-colors duration-300 ease-out",
                className,
            )}
            aria-label={`Navigate to ${link.text}`}
        >
            {link.text}
        </a>
    );
});
HoverLink.displayName = "HoverLink";

/**
 * Enhanced NavbarFlow component with improved performance, accessibility, and error handling
 * Provides responsive navigation with smooth animations and keyboard support
 */
const NavbarFlow: FC<NavbarFlowProps> = memo(
    ({
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
        const [isOpen, setIsOpen] = useState(false);
        const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(
            null,
        );
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
        const reducedMotion = useReducedMotion();
        const mobileMenuId = useId();

        // Close dropdown when clicking outside
        const dropdownRef = useOutsideClick<HTMLDivElement>(() => {
            setIsOpen(false);
        }, isOpen); // Only listen when dropdown is open

        // Memoized animation durations based on reduced motion preference
        const animationDurations = useMemo(
            () => ({
                quick: reducedMotion ? 0 : NAVBAR_CONSTANTS.QUICK_DURATION,
                navDur: reducedMotion ? 0 : NAVBAR_CONSTANTS.NAV_DURATION,
                svgDur: reducedMotion ? 0 : NAVBAR_CONSTANTS.SVG_DURATION,
                navDelay: reducedMotion ? 0 : NAVBAR_CONSTANTS.NAV_DELAY,
            }),
            [reducedMotion],
        );

        useEffect(() => {
            setIsMounted(true);
        }, []);

        // Enhanced animation sequence with error handling and memoized durations
        useEffect(() => {
            if (!isMounted || sequenceDone || reducedMotion) return;

            const springTransition = {
                type: "spring" as const,
                damping: 10,
                stiffness: 100,
                restDelta: 0.001,
                restSpeed: 0.001,
            } as const;

            let linksTimer: number | undefined;

            const runSequence = async () => {
                try {
                    const { quick, svgDur, navDelay } = animationDurations;
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
                                    ...springTransition,
                                    mass: 0.7,
                                },
                            }),
                            switchMotion.start({
                                opacity: 1,
                                x: 0,
                                transition: {
                                    ...springTransition,
                                    mass: 0.5,
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
            reducedMotion,
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
        }, [isOpen]);

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
            if (!isOpen) return;

            const onKeyDown = (e: KeyboardEvent) => {
                try {
                    switch (e.key) {
                        case "Escape":
                            setIsOpen(false);
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
        }, [isOpen, mobileMenuId]);

        // Error boundary effect
        useEffect(() => {
            if (hasError) {
                console.warn(
                    "NavbarFlow encountered an error, some functionality may be limited",
                );
            }
        }, [hasError]);

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
                        "h-[60px]",
                        "z-50",
                        "shadow-lg dark:shadow-xl",
                        "py-8",
                    )}
                >
                    {/* Logo/Emblem */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        className={cn(
                            `z-${NAVBAR_CONSTANTS.Z_INDEX.CONTENT}`,
                            "rounded-sm",
                            "border border-sm",
                            "nav-border",
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
                                            "rounded-md",
                                            "p-1",
                                            "border nav-border",
                                            "neumorphic-button",
                                            "z-50",
                                            "hover:border-transparent",
                                            reducedMotion
                                                ? cn(
                                                      "transition-none duration-0",
                                                  )
                                                : cn(
                                                      "will-change-transform ease-out",
                                                      !bouncyText &&
                                                          "duration-500",
                                                  ),
                                        )}
                                        transition={{
                                            delay: linksReady
                                                ? links.indexOf(link) *
                                                  NAVBAR_CONSTANTS.LINK_STAGGER_DELAY
                                                : 0,
                                        }}
                                    >
                                        <HoverLink
                                            link={link}
                                            className="text-lg px-2 font-semibold"
                                        />
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
                            <div className={cn("rounded-md")}>
                                {rightComponent}
                            </div>
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
                <motion.nav
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
                        "shadow-lg dark:shadow-xl",
                        "z-20",
                        "will-change-[transform]",
                        // "backdrop-blur-md",
                        // scrolled && "bg-bg-scrolled",
                    )}
                >
                    {/* Mobile Logo/Emblem */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={emblemMotion}
                        className={cn(
                            "border-b-[2px] border-x",
                            "nav-border",
                            "rounded-sm",
                            "w-fit",
                            "p-[1px]",
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
                            "bg-background",
                            "rounded-md",
                            "border",
                            sequenceDone && "nav-border",
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

                        {/* Mobile Menu Toggle */}
                        <motion.div
                            ref={dropdownRef}
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
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={toggleMobileMenu}
                                className={cn(
                                    "relative",
                                    "aspect-square",
                                    " text-gray-700 dark:text-gray-200",
                                    " hover:text-gray-900 dark:hover:text-white",
                                    "transition-colors",
                                    "focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-0 rounded-sm",
                                    "flex flex-col items-center justify-center",
                                    "neumorphic-button",
                                    "rounded-sm",
                                )}
                                aria-expanded={isOpen}
                                aria-controls={mobileMenuId}
                                aria-label={
                                    isOpen
                                        ? ACCESSIBILITY_LABELS.CLOSE_MENU
                                        : ACCESSIBILITY_LABELS.MOBILE_MENU_TOGGLE
                                }
                            >
                                <AnimatedIcon isOpen={isOpen} />
                                <span className="sr-only">
                                    {isOpen
                                        ? ACCESSIBILITY_LABELS.CLOSE_MENU
                                        : ACCESSIBILITY_LABELS.MOBILE_MENU_TOGGLE}
                                </span>
                            </Button>

                            {/* Mobile Menu Dropdown */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.nav
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
                                            duration: reducedMotion
                                                ? 0
                                                : NAVBAR_CONSTANTS.MOBILE_MENU_DURATION,
                                            ease: "easeOut",
                                            times: [0, 0.3, 1],
                                        }}
                                        id={mobileMenuId}
                                        aria-hidden={!isOpen}
                                        role="navigation"
                                        aria-label="Primary mobile navigation menu"
                                        className={cn(
                                            "absolute top-full",
                                            "mt-3 mr-28",
                                            "z-50",
                                            "transform-gpu",
                                            "overflow-y-auto",
                                            "rounded-lg",
                                            "text-center",
                                            "border-[1px] nav-border",
                                            "will-change-[clip-path,opacity]",
                                            "font-serif tracking-wide",
                                            "backdrop-blur-md",
                                            "bg-slate-300/60 dark:bg-slate-800/60",
                                            "pt-2 pb-6 px-6",
                                            "grid grid-flow-row space-y-3",
                                        )}
                                    >
                                        {links.map((element, idx) => (
                                            <div
                                                key={element.text}
                                                className="space-y-2"
                                            >
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
                                                            <span>
                                                                {element.text}
                                                            </span>
                                                            <span aria-hidden="true">
                                                                {openedSections[
                                                                    element.text
                                                                ] ? (
                                                                    <ArrowUp className="h-4 w-4" />
                                                                ) : (
                                                                    <ChevronDown className="h-4 w-4" />
                                                                )}
                                                            </span>
                                                        </button>

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
                                                                        reducedMotion
                                                                            ? 0
                                                                            : NAVBAR_CONSTANTS.SUBMENU_DURATION,
                                                                    ease: "easeOut",
                                                                }}
                                                                id={`${mobileMenuId}-section-${idx}`}
                                                                role="region"
                                                                aria-label={`${element.text} submenu`}
                                                                className="pl-4 space-y-1 overflow-hidden"
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
                                                    <HoverLink
                                                        link={element}
                                                        className={cn(
                                                            "text-xl p-2",
                                                            "border-b border-gray-100 dark:border-gray-500 block",
                                                        )}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </motion.nav>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </motion.nav>
            </div>
        );
    },
);

NavbarFlow.displayName = "NavbarFlow";
export default NavbarFlow;
