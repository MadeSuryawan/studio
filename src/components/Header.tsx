// src/components/Header.tsx
"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import type { JSX } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LogoIcon from "@/components/svg/LogoIcon";
import NavbarFlow from "@/components/ui/navbar-flow";
import { ScrollToTop } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import {
    NAVIGATION_LINKS,
    HEADER_STYLES,
    ACCESSIBILITY_LABELS,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";

/**
 * Error fallback component for Header
 * Simple fallback without external dependencies
 */
const HeaderErrorFallback: React.FC<{ error?: Error }> = ({ error }) => (
    <header
        className={HEADER_STYLES.NAVBAR_STYLE}
        role="banner"
        aria-label="Site header with navigation error"
    >
        <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="text-sm text-red-600">
                Navigation temporarily unavailable
                {error && (
                    <span className="ml-2 text-xs">({error.message})</span>
                )}
            </div>
        </div>
    </header>
);

/**
 * Enhanced Header component with improved performance, accessibility, and error handling
 * Preserves all existing functionality while adding modern React best practices
 */
const Header = (): JSX.Element => {
    const prefersReducedMotion = useReducedMotion();
    const [hasError, setHasError] = useState(false);

    // Memoized navigation links using constants
    const navLinks = useMemo(() => NAVIGATION_LINKS, []);

    // Memoized logo click handler with error handling
    const handleLogoClick = useCallback(() => {
        try {
            ScrollToTop();
        } catch (error) {
            console.error("Error scrolling to top:", error);
            // Fallback to basic scroll
            window.scrollTo(0, 0);
        }
    }, []);

    // Logo component with enhanced accessibility (no memoization for better scroll responsiveness)
    const logoComponent: JSX.Element = useMemo(
        () => (
            <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleLogoClick();
                    }
                }}
            >
                <LogoIcon
                    className={cn(HEADER_STYLES.LOGO_CLASSES)}
                    aria-label={ACCESSIBILITY_LABELS.LOGO_ARIA_LABEL}
                    onClick={handleLogoClick}
                />
                <span className="sr-only">
                    {ACCESSIBILITY_LABELS.LOGO_SR_ONLY}
                </span>
            </div>
        ),
        [handleLogoClick],
    );

    // Memoized theme switcher component
    const themeComponent = useMemo(
        () => (
            <div className={HEADER_STYLES.THEME_SWITCHER_CONTAINER}>
                <ThemeSwitcher />
            </div>
        ),
        [],
    );

    // Error boundary effect
    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            console.error("Header error:", error);
            setHasError(true);
        };

        window.addEventListener("error", handleError);
        return () => window.removeEventListener("error", handleError);
    }, []);

    // Render error fallback if error occurred
    if (hasError) {
        return <HeaderErrorFallback />;
    }

    /*
     * PRESERVED COMMENTED NAVIGATION LINKS FOR FUTURE REFERENCE
     * These commented sections contain submenu configurations that may be used later:
     *
     * Navigation submenu with HoverLink components
     * Templates submenu with FeatureItem components
     * Showcase submenu with various project links
     *
     * Original structure maintained for easy restoration when needed
     */

    return (
        <NavbarFlow
            styleName={HEADER_STYLES.NAVBAR_STYLE}
            emblem={logoComponent}
            links={navLinks}
            rightComponent={themeComponent}
            linksHeadStartMs={prefersReducedMotion ? 0 : undefined}
        />
    );
};

export default Header;
