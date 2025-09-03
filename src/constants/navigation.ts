// src/constants/navigation.ts

/**
 * Navigation constants for the BaliBlissed application
 * Centralizes all navigation-related configuration for better maintainability
 */

// Navigation link structure
export interface NavigationLink {
    text: string;
    url?: string;
    submenu?: React.ReactNode;
    ariaLabel?: string;
    isModal?: boolean; // Flag to indicate if the link opens a modal
}

// Main navigation links
export const NAVIGATION_LINKS: NavigationLink[] = [
    {
        text: "Home",
        url: "/",
        ariaLabel: "Navigate to home page",
    },
    {
        text: "Car Charter",
        url: "/private-car-charter",
        ariaLabel: "Navigate to private car charter services",
    },
    {
        text: "Destinations",
        url: "/#destinations",
        ariaLabel: "Navigate to destinations section",
    },
    {
        text: "Packages",
        url: "/#packages",
        ariaLabel: "Navigate to travel packages section",
    },
    {
        text: "Contact",
        url: "/#contact",
        ariaLabel: "Open contact form modal",
        isModal: true, // This link will now open the modal
    },
] as const;

// Header styling constants
export const HEADER_STYLES = {
    NAVBAR_STYLE: "text-foreground h-12 md:h-16",
    LOGO_CLASSES: "h-full w-[96px] md:w-[110px]",
    THEME_SWITCHER_CONTAINER: "flex items-center justify-center",
} as const;

// Animation constants
export const ANIMATION_CONSTANTS = {
    LINKS_HEAD_START_MS: 0,
    STAGGER_DELAY: 0.08,
    ANIMATION_DURATION: 0.5,
    EASE: "easeOut",
} as const;

// Accessibility constants
export const ACCESSIBILITY_LABELS = {
    LOGO_ARIA_LABEL: "BaliBlissed Home Page",
    LOGO_SR_ONLY: "BaliBlissed Home Page",
    MOBILE_MENU_TOGGLE: "Toggle mobile navigation menu",
    SUBMENU_TOGGLE: "Toggle submenu",
    CLOSE_MENU: "Close navigation menu",
} as const;

// Mobile breakpoints and responsive constants
export const RESPONSIVE_CONSTANTS = {
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
} as const;

// Future navigation links (commented out for reference)
export const FUTURE_NAVIGATION_LINKS = {
    NAVIGATION_SUBMENU: {
        text: "Navigation",
        submenu: "navigation-submenu", // Will be replaced with actual component
    },
    TEMPLATES_SUBMENU: {
        text: "Templates",
        submenu: "templates-submenu", // Will be replaced with actual component
    },
    SHOWCASE_SUBMENU: {
        text: "Showcase",
        submenu: "showcase-submenu", // Will be replaced with actual component
    },
} as const;
