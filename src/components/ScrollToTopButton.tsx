"use client";

import { JSX, useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { throttle, scrollToTop } from "@/lib/utils";

const THROTTLE_MS = 200;
const VISIBILITY_OFFSET = 500;

export default function ScrollToTopButton(): JSX.Element | null {
    const [isVisible, setIsVisible] = useState(false);

    const throttledHandleScroll = useMemo(
        () =>
            throttle(() => {
                setIsVisible(window.scrollY > VISIBILITY_OFFSET);
            }, THROTTLE_MS),
        [],
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.addEventListener("scroll", throttledHandleScroll, {
            passive: true,
        });
        return () =>
            window.removeEventListener("scroll", throttledHandleScroll);
    }, [throttledHandleScroll]);

    if (!isVisible) {
        return null;
    }

    return (
        <Button
            size="icon"
            type="button"
            className="h-12 w-12 md:h-14 md:w-14 rounded-[50%] shadow-lg bg-[#212224] text-[#f0f0f0] hover:bg-[#3F4145] border-[1px]"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            role="button"
        >
            <ChevronUp className="scale-[1.75]" />
        </Button>
    );
}
