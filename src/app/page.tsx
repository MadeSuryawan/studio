"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import PackagesSection from "@/components/home/PackagesSection";
import CarCharterSection from "@/components/home/CarCharterSection";
import ContactSection from "@/components/home/ContactSection";

type SectionWrapperProps = {
    children: React.ReactNode;
    className?: string;
};

const SectionWrapper = ({ children, className }: SectionWrapperProps) => {
    return <div className={className}>{children}</div>;
};

export default function Home(): React.JSX.Element {
    const pageSections = [
        SearchSection,
        CarCharterSection,
        DestinationsSection,
        PackagesSection,
        ContactSection,
    ];

    return (
        <>
            <HeroSection />
            <React.Suspense>
                {pageSections.map((SectionComponent, index) => (
                    <SectionWrapper
                        key={index}
                        className={cn(
                            index % 2 === 0 ? "bg-background" : "bg-secondary",
                        )}
                    >
                        <SectionComponent />
                    </SectionWrapper>
                ))}
            </React.Suspense>
        </>
    );
}
