// src/hooks/use-navigation.ts
"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { NAVIGATION_LINKS, type NavigationLink } from "@/constants/navigation";

/**
 * Navigation state interface
 */
interface NavigationState {
    selectedSubmenu: string | null;
    mobileMenuVisible: boolean;
    openedSections: Record<string, boolean>;
    isMounted: boolean;
}

/**
 * Navigation actions interface
 */
interface NavigationActions {
    setSelectedSubmenu: (submenu: string | null) => void;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
    toggleSection: (section: string) => void;
    closeAllMenus: () => void;
    handleKeyboardNavigation: (event: KeyboardEvent) => void;
}

/**
 * Navigation hook return type
 */
interface UseNavigationReturn extends NavigationState, NavigationActions {
    navigationLinks: readonly NavigationLink[];
    prefersReducedMotion: boolean;
}

/**
 * Custom hook for managing navigation state and interactions
 * Provides centralized navigation logic with accessibility support
 *
 * @returns Navigation state and actions
 */
export function useNavigation(): UseNavigationReturn {
    // State management
    const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [openedSections, setOpenedSections] = useState<
        Record<string, boolean>
    >({});
    const [isMounted, setIsMounted] = useState(false);

    // Get reduced motion preference - default to false if null
    const prefersReducedMotion = useReducedMotion() ?? false;

    // Set mounted state after hydration
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Memoized navigation links
    const navigationLinks = useMemo(() => NAVIGATION_LINKS, []);

    // Toggle mobile menu visibility
    const toggleMobileMenu = useCallback(() => {
        setMobileMenuVisible((prev) => !prev);
        // Close any open submenus when toggling mobile menu
        if (!mobileMenuVisible) {
            setSelectedSubmenu(null);
            setOpenedSections({});
        }
    }, [mobileMenuVisible]);

    // Close mobile menu
    const closeMobileMenu = useCallback(() => {
        setMobileMenuVisible(false);
        setSelectedSubmenu(null);
        setOpenedSections({});
    }, []);

    // Toggle section in mobile menu
    const toggleSection = useCallback((section: string) => {
        setOpenedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    }, []);

    // Close all menus and submenus
    const closeAllMenus = useCallback(() => {
        setSelectedSubmenu(null);
        setMobileMenuVisible(false);
        setOpenedSections({});
    }, []);

    // Handle keyboard navigation
    const handleKeyboardNavigation = useCallback(
        (event: KeyboardEvent) => {
            switch (event.key) {
                case "Escape":
                    closeAllMenus();
                    break;
                case "Tab":
                    // Allow natural tab navigation, close menus if tabbing away
                    if (!event.shiftKey) {
                        // Implement logic to detect if tabbing outside navigation
                        // This would require ref to navigation container
                    }
                    break;
                default:
                    break;
            }
        },
        [closeAllMenus],
    );

    // Handle clicks outside navigation (would need ref implementation)
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            // This would be implemented with a ref to the navigation container
            // For now, we'll provide the callback for future implementation
            closeAllMenus();
        },
        [closeAllMenus],
    );

    // Effect for keyboard event listeners
    useEffect(() => {
        if (!isMounted) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            handleKeyboardNavigation(event);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyboardNavigation, isMounted]);

    // Effect to close mobile menu on window resize
    useEffect(() => {
        if (!isMounted) return;

        const handleResize = () => {
            // Close mobile menu on desktop breakpoint
            if (window.innerWidth >= 768 && mobileMenuVisible) {
                closeMobileMenu();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobileMenuVisible, closeMobileMenu, isMounted]);

    return {
        // State
        selectedSubmenu,
        mobileMenuVisible,
        openedSections,
        isMounted,
        navigationLinks,
        prefersReducedMotion,

        // Actions
        setSelectedSubmenu,
        toggleMobileMenu,
        closeMobileMenu,
        toggleSection,
        closeAllMenus,
        handleKeyboardNavigation,
    };
}
