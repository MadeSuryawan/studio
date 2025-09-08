// src/hooks/use-hydration.ts
"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect when React hydration is complete
 * Helps prevent FOUC (Flash of Unstyled Content) by providing
 * a reliable way to know when client-side rendering is ready
 *
 * @returns {boolean} isHydrated - true when hydration is complete
 */
export function useHydration(): boolean {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Set hydrated to true after the first render cycle
        // This ensures all client-side hooks and state are initialized
        setIsHydrated(true);

        // Also add a data attribute to the document for CSS targeting
        document.documentElement.setAttribute("data-hydrated", "true");
    }, []);

    return isHydrated;
}

/**
 * Alternative hook that also checks for DOM readiness
 * Useful for components that depend on DOM measurements or window object
 *
 * @returns {boolean} isReady - true when both hydration and DOM are ready
 */
export function useClientReady(): boolean {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Ensure both hydration and DOM are ready
        const checkReady = () => {
            if (
                typeof window !== "undefined" &&
                document.readyState === "complete"
            ) {
                setIsReady(true);
            }
        };

        // Check immediately
        checkReady();

        // Also listen for load event as fallback
        window.addEventListener("load", checkReady);

        return () => {
            window.removeEventListener("load", checkReady);
        };
    }, []);

    return isReady;
}
