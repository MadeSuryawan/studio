// src/hooks/use-reduced-motion.ts
"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect user's motion preferences
 * Respects the prefers-reduced-motion media query
 * @returns boolean indicating if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] =
        useState<boolean>(false);

    useEffect(() => {
        // Check if we're in a browser environment
        if (typeof window === "undefined") return;

        // Create media query to detect reduced motion preference
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        // Set initial value
        setPrefersReducedMotion(mediaQuery.matches);

        // Listen for changes
        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        // Add event listener for changes
        mediaQuery.addEventListener("change", handleChange);

        // Cleanup event listener
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return prefersReducedMotion;
}
