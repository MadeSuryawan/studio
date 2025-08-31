import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names using clsx and resolve Tailwind CSS conflicts via tailwind-merge.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs));

/**
 * Create a leading-edge throttled function.
 * Invokes `func` immediately on the first call, then ignores subsequent calls
 * until `limit` milliseconds have elapsed. Preserves `this` and arguments.
 *
 * Note: The wrapper does not return the original function's return value.
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
    let inThrottle = false;
    let lastResult: ReturnType<T> | undefined;

    return (...args: Parameters<T>): ReturnType<T> | undefined => {
        if (!inThrottle) {
            lastResult = func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
        return lastResult;
    };
}

export const ScrollToTop = (): void => {
    const currentScrollY = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = currentScrollY / documentHeight;
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    // For scrolls from 75%+ down, use a more reliable approach
    if (scrollPercentage >= 0.75 && !prefersReducedMotion) {
        // Use requestAnimationFrame for better control over long-distance scrolls
        const smoothScrollToTop = () => {
            const startY = window.scrollY;
            const startTime = performance.now();
            const duration = 50; // Fast, responsive duration for immediate motion

            const animateScroll = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Linear animation for immediate, full-speed motion
                // No easing - constant velocity throughout for maximum responsiveness
                const currentY = startY * (1 - progress);

                window.scrollTo(0, currentY);

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    // Ensure we're exactly at the top
                    window.scrollTo(0, 0);
                }
            };

            requestAnimationFrame(animateScroll);
        };

        smoothScrollToTop();
    } else {
        // Use standard smooth scroll for shorter distances or when reduced motion is preferred
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    }
};
