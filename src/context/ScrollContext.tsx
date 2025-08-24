"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ScrollContextType {
    isScrolled: boolean;
}

const ScrollContext = createContext<ScrollContextType>({ isScrolled: false });

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <ScrollContext.Provider value={{ isScrolled }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => useContext(ScrollContext);
