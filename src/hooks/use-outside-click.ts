// hooks/use-outside-click.ts
import { useEffect, useRef, useCallback, type RefObject } from "react";

export const useOutsideClick: <T extends HTMLElement>(
    callback: () => void,
    enabled?: boolean,
) => RefObject<T | null> = <T extends HTMLElement>(
    callback: () => void,
    enabled = true,
) => {
    const ref = useRef<T>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        },
        [callback],
    );
    const handleTouchStartOutside = useCallback(
        (event: TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        },
        [callback],
    );

    useEffect(() => {
        if (!enabled) return;

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleTouchStartOutside); // For mobile

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleTouchStartOutside);
        };
    }, [handleClickOutside, handleTouchStartOutside, enabled]);

    return ref;
};
