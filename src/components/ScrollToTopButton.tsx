"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton(): React.JSX.Element | null {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (): void => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-[#212224] text-[#f0f0f0]  hover:bg-[#3F4145] border"
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-6 w-6" />
        </Button>
    );
}
