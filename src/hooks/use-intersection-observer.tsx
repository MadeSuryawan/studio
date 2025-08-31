"use client";

import { useState, useEffect, RefObject } from "react";

interface IntersectionObserverOptions {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export const useIntersectionObserver = (
    ref: RefObject<Element>,
    options: IntersectionObserverOptions = {},
): boolean => {
    const [isIntersecting, setIntersecting] = useState<boolean>(false);
    const {
        threshold = 0.1,
        root = null,
        rootMargin = "0px",
        triggerOnce, // Changed default to true for safety
    } = options;

    useEffect(() => {
        if (
            typeof window === "undefined" ||
            !("IntersectionObserver" in window)
        ) {
            setIntersecting(true);
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                // If it should only trigger once and it's intersecting,
                // set state to true and then stop observing the element.
                if (triggerOnce && entry.isIntersecting) {
                    setIntersecting(true);
                    observer.unobserve(element);
                } else {
                    // Otherwise, always update the state based on intersection status.
                    // This allows re-triggering when triggerOnce is false (on desktop).
                    setIntersecting(entry.isIntersecting);
                }
            },
            { threshold, root, rootMargin },
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [ref, threshold, root, rootMargin, triggerOnce]);

    return isIntersecting;
};
