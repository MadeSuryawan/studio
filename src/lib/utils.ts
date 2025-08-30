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

export const scrollToTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
    });
};
