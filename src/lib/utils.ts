import { clsx, type ClassValue } from "clsx";
import { twMerge, extendTailwindMerge } from "tailwind-merge";

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
export function throttle<TArgs extends readonly unknown[], TReturn>(
    func: (...args: TArgs) => TReturn,
    limit: number,
): ((...args: TArgs) => TReturn | undefined) & { cancel: () => void } {
    let inThrottle = false;
    let lastResult: TReturn | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const throttled = (...args: TArgs): TReturn | undefined => {
        if (!inThrottle) {
            lastResult = func(...args);
            inThrottle = true;
            timeoutId = setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
        return lastResult;
    };

    // Attach a cancel method for cleanup
    return Object.assign(throttled, {
        cancel: () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
                inThrottle = false;
            }
        },
    });
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

/**
 * This function is a wrapper around the twMerge function.
 * It is used to merge the classes inside style objects.
 */
export const cx = extendTailwindMerge({
    extend: {
        theme: {
            text: [
                "display-xs",
                "display-sm",
                "display-md",
                "display-lg",
                "display-xl",
                "display-2xl",
            ],
        },
    },
});

/**
 * This function does nothing besides helping us to be able to
 * sort the classes inside style objects which is not supported
 * by the Tailwind IntelliSense by default.
 */
export function sortCx<
    T extends Record<
        string,
        | string
        | number
        | Record<string, string | number | Record<string, string | number>>
    >,
>(classes: T): T {
    return classes;
}
