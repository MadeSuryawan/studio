"use client";
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mql = window.matchMedia(
            `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
        );

        const onChange = () => {
            setIsMobile(mql.matches); // Use media query result directly
        };

        mql.addEventListener("change", onChange);
        setIsMobile(mql.matches); // Use media query for initial value too

        return () => mql.removeEventListener("change", onChange);
    }, []);

    return !!isMobile;
};

export default useIsMobile;
