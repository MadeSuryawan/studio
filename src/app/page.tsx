"use client";

import { type JSX, type FC, Suspense, ReactNode } from "react";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import PackagesSection from "@/components/home/PackagesSection";
import CarCharterSection from "@/components/home/CarCharterSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import ContactSection from "@/components/home/ContactSection";
import BlogSection from "@/components/home/BlogSection";
import InteractiveMapSection from "@/components/home/InteractiveMapSection";
import AnimatedSection from "@/components/home/AnimatedSection";

type SectionWrapperProps = {
    children: ReactNode;
    className?: string;
};

const SectionWrapper: FC<SectionWrapperProps> = ({
    children,
    className,
}: SectionWrapperProps) => {
    return <div className={className}>{children}</div>;
};

export default function Home(): JSX.Element {
    const pageSections = [
        SearchSection,
        CarCharterSection,
        DestinationsSection,
        InteractiveMapSection,
        PackagesSection,
        BlogSection,
        WhyChooseUsSection,
        ContactSection,
    ];

    return (
        <>
            <HeroSection />
            <Suspense>
                {pageSections.map((SectionComponent, index) => (
                    <SectionWrapper key={index} className={cn("bg-background")}>
                        <AnimatedSection>
                            <SectionComponent />
                        </AnimatedSection>
                    </SectionWrapper>
                ))}
            </Suspense>
        </>
    );
}
