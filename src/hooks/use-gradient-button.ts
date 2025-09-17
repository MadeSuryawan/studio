// src/hooks/useGradientButton.ts
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export interface UseGradientButtonOptions {
    loading?: boolean;
    disabled?: boolean;
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => void | Promise<void>;
    loadingTimeout?: number;
    hapticFeedback?: boolean;
}

export interface UseGradientButtonReturn {
    isLoading: boolean;
    isPressed: boolean;
    isHovered: boolean;
    isFocused: boolean;
    shouldReduceMotion: boolean;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleMouseDown: () => void;
    handleMouseUp: () => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleFocus: () => void;
    handleBlur: () => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

/**
 * Custom hook for managing gradient button state and interactions
 * Provides enhanced UX with loading states, haptic feedback, and accessibility
 */
export function useGradientButton({
    loading = false,
    disabled = false,
    onClick,
    loadingTimeout = 5000,
    hapticFeedback = false,
}: UseGradientButtonOptions = {}): UseGradientButtonReturn {
    const [isLoading, setIsLoading] = useState(loading);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const shouldReduceMotion = useReducedMotion() ?? false;
    const loadingTimeoutRef = useRef<NodeJS.Timeout>(null);
    const isClickingRef = useRef(false);

    // Sync external loading state
    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, []);

    // Haptic feedback function
    const triggerHapticFeedback = useCallback(() => {
        if (hapticFeedback && "vibrate" in navigator) {
            navigator.vibrate(50); // Short vibration
        }
    }, [hapticFeedback]);

    // Enhanced click handler with async support
    const handleClick = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled || isLoading) {
                event.preventDefault();
                return;
            }

            triggerHapticFeedback();

            if (onClick) {
                try {
                    setIsLoading(true);

                    // Set a timeout to prevent infinite loading
                    loadingTimeoutRef.current = setTimeout(() => {
                        setIsLoading(false);
                    }, loadingTimeout);

                    const result = onClick(event);

                    // Handle async onClick
                    if (result instanceof Promise) {
                        await result;
                    }
                } catch (error) {
                    console.error("Button click error:", error);
                } finally {
                    if (loadingTimeoutRef.current) {
                        clearTimeout(loadingTimeoutRef.current);
                    }
                    setIsLoading(false);
                }
            }
        },
        [disabled, isLoading, onClick, triggerHapticFeedback, loadingTimeout],
    );

    // Mouse interaction handlers
    const handleMouseDown = useCallback(() => {
        if (!disabled && !isLoading) {
            setIsPressed(true);
            isClickingRef.current = true;
        }
    }, [disabled, isLoading]);

    const handleMouseUp = useCallback(() => {
        setIsPressed(false);
        isClickingRef.current = false;
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (!disabled) {
            setIsHovered(true);
        }
    }, [disabled]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setIsPressed(false);
        isClickingRef.current = false;
    }, []);

    // Focus interaction handlers
    const handleFocus = useCallback(() => {
        if (!disabled) {
            setIsFocused(true);
        }
    }, [disabled]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        setIsPressed(false);
        isClickingRef.current = false;
    }, []);

    // Keyboard interaction handler
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (disabled || isLoading) {
                return;
            }

            // Handle Enter and Space key activation
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsPressed(true);

                // Simulate click
                const syntheticEvent = {
                    ...event,
                    type: "click",
                    currentTarget: event.currentTarget,
                    target: event.target,
                } as unknown as React.MouseEvent<HTMLButtonElement>;

                handleClick(syntheticEvent);

                // Reset pressed state after a short delay
                setTimeout(() => setIsPressed(false), 150);
            }
        },
        [disabled, isLoading, handleClick],
    );

    return {
        isLoading,
        isPressed,
        isHovered,
        isFocused,
        shouldReduceMotion,
        handleClick,
        handleMouseDown,
        handleMouseUp,
        handleMouseEnter,
        handleMouseLeave,
        handleFocus,
        handleBlur,
        handleKeyDown,
    };
}

export default useGradientButton;
