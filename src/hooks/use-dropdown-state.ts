// hooks/use-dropdown-state.ts
import { useState, useCallback } from "react";

export function useDropdownState(initialOpen = false) {
    const [isOpen, setIsOpen] = useState(initialOpen);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const open = useCallback((v: boolean = true) => {
        setIsOpen(v);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        setIsOpen,
        toggle,
        open,
        close,
    };
}
