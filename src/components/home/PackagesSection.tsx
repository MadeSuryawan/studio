"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Waves, Utensils, Users, BedDouble, Plane } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { SectionCard, CardData, ButtonFunc } from "./SectionCard";

const TempleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M11.99 2.25L2.69 9.33l-1.39 1.58v1.8l4.6-1.58v6.75h1.5v-4.5l1.88-.63v5.13h1.5v-4.5l1.88-.63v5.13h1.5v-4.5l1.88-.63v5.13h1.5V11.13l4.6 1.58v-1.8l-1.39-1.58L11.99 2.25zM9.25 11.25H14.75"></path>
    </svg>
);

const DanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 4a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 14.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0v6a.5.5 0 0 1-.5.5z" />
        <path d="M6.5 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5zM17.5 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5z" />
        <path d="M12 14.5a6 6 0 0 0-6-6H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H6" />
        <path d="M12 14.5a6 6 0 0 1 6-6h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H18" />
    </svg>
);

const packages: CardData[] = [
    {
        name: "Cultural Heartbeat of Ubud",
        features: [
            {
                icon: <TempleIcon className="w-5 h-5 text-accent" />,
                text: "Temple Tours",
            },
            {
                icon: <DanceIcon className="w-5 h-5 text-accent" />,
                text: "Traditional Dance Show",
            },
            {
                icon: (
                    <Utensils
                        aria-hidden="true"
                        focusable="false"
                        className="w-5 h-5 text-accent"
                    />
                ),
                text: "Cooking Class",
            },
        ],
        image: "https://placehold.co/600x400.png",
        aiHint: "bali temple",
        link: "#",
    },
    {
        name: "Coastal Vibe & Surf",
        features: [
            {
                icon: (
                    <Waves aria-hidden="true" className="w-5 h-5 text-accent" />
                ),
                text: "Surf Lessons",
            },
            {
                icon: (
                    <BedDouble
                        aria-hidden="true"
                        focusable="false"
                        className="w-5 h-5 text-accent"
                    />
                ),
                text: "Beachfront Villa",
            },
            {
                icon: (
                    <Users
                        aria-hidden="true"
                        focusable="false"
                        className="w-5 h-5 text-accent"
                    />
                ),
                text: "Yoga Sessions",
            },
        ],
        image: "https://placehold.co/600x400.png",
        aiHint: "bali beach",
        link: "#",
    },
    {
        name: "Luxury & Relaxation",
        features: [
            {
                icon: <BedDouble className="w-5 h-5 text-accent" />,
                text: "5-Star Resort",
            },
            {
                icon: <Users className="w-5 h-5 text-accent" />,
                text: "Private Spa Treatments",
            },
            {
                icon: <Utensils className="w-5 h-5 text-accent" />,
                text: "Fine Dining",
            },
        ],
        image: "https://placehold.co/600x400.png",
        aiHint: "bali spa",
        link: "#",
    },
    {
        name: "The Ultimate Bali Adventure",
        features: [
            {
                icon: <Plane className="w-5 h-5 text-accent" />,
                text: "All-inclusive",
            },
            {
                icon: <TempleIcon className="w-5 h-5 text-accent" />,
                text: "Volcano Sunrise Trek",
            },
            {
                icon: <Waves className="w-5 h-5 text-accent" />,
                text: "Scuba Diving",
            },
        ],
        image: "https://placehold.co/600x400.png",
        aiHint: "bali volcano",
        link: "#",
    },
];

const Titles: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-headline">
            Curated Travel Packages
        </h2>
        <p className="text-lg text-muted-foreground mt-2">
            Hand-picked experiences designed to give you the very best of Bali.
        </p>
    </div>
);

export default function PackagesSection(): React.JSX.Element {
    const cardRef = React.useRef<HTMLDivElement>(null);
    return (
        <section id="packages" className="relative w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                {/* Desktop view */}
                <div className="hidden md:block">
                    <div className="flex justify-between items-center mb-12">
                        <Titles />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-3 mb-12">
                        {packages.map((pkg) => (
                            <SectionCard
                                ref={cardRef}
                                key={pkg.name}
                                data={pkg}
                                buttonText="View Details"
                                buttonLink={pkg.link}
                                packageCard={true}
                                className="md:flex-row"
                            />
                        ))}
                    </div>
                    <ButtonFunc
                        text="View All Packages"
                        ariaLabel="View all packages"
                    />
                </div>

                {/* Mobile view */}
                <Carousel className="mx-auto max-w-xs sm:max-w-sm md:hidden z-10">
                    <div className="text-center py-4">
                        <Titles />
                    </div>
                    <CarouselContent paginationMt="mt-32">
                        {packages.map((pkg) => (
                            <CarouselItem key={pkg.name}>
                                <SectionCard
                                    key={pkg.name}
                                    ref={cardRef}
                                    data={pkg}
                                    buttonText="View Details"
                                    buttonLink={pkg.link}
                                    packageCard={true}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <ButtonFunc
                        text="View All Packages"
                        ariaLabel="View all packages"
                    />
                </Carousel>
            </div>
        </section>
    );
}
