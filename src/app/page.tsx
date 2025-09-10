"use client";

import { type JSX } from "react";
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

// const bgColors = [
//     cn("bg-[#368d1b]"),
//     cn("bg-[#bc5555]"),
//     cn("bg-[#4b8d50]"),
//     cn("bg-[#b9b225]"),
//     cn("bg-[#065f35]"),
//     cn("bg-[#6f0b6f]"),
//     cn("bg-[#4d031c]"),
//     cn("bg-[#123fb1]"),
// ] as const;

const pageSections = [
    { name: "SearchSection", component: SearchSection },
    { name: "CarCharterSection", component: CarCharterSection },
    { name: "DestinationsSection", component: DestinationsSection },
    { name: "InteractiveMapSection", component: InteractiveMapSection },
    { name: "PackagesSection", component: PackagesSection },
    { name: "BlogSection", component: BlogSection },
    { name: "WhyChooseUsSection", component: WhyChooseUsSection },
    { name: "ContactSection", component: ContactSection },
];

const Home = (): JSX.Element => {
    return (
        <>
            <HeroSection />
            {pageSections.map((Section) => (
                <AnimatedSection
                    key={Section.name}
                    className={cn(
                        "relative",
                        "overflow-hidden",
                        "py-6 md:py-10",
                        "w-full",
                        // bgColors[
                        //     pageSections.indexOf(Section) % bgColors.length
                        // ],
                    )}
                >
                    <Section.component />
                </AnimatedSection>
            ))}
        </>
    );
};

export default Home;
