// src/hooks/use-auto-scroll.ts
import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { CHAT_CONSTANTS } from "@/constants/chat";

/**
 * Custom hook for automatic scrolling functionality
 * Respects user's reduced motion preferences
 */
export function useAutoScroll(dependency: unknown[]) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const scrollToBottom = useCallback(() => {
        if (!scrollAreaRef.current) {
            return;
        }

        const scrollableView = scrollAreaRef.current.querySelector("div");
        if (!scrollableView) {
            return;
        }

        const scrollBehavior = prefersReducedMotion
            ? CHAT_CONSTANTS.SCROLL_BEHAVIOR_REDUCED
            : CHAT_CONSTANTS.SCROLL_BEHAVIOR;

        scrollableView.scrollTo({
            top: scrollableView.scrollHeight,
            behavior: scrollBehavior,
        });
    }, [prefersReducedMotion]);

    useEffect(() => {
        // Small delay to ensure DOM is updated
        const timeoutId = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollToBottom, ...dependency]);

    return { scrollAreaRef, scrollToBottom };
}
